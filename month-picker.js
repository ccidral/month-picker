var MonthPicker = (function(){
  'use strict';

  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function currentMonth() {
    return new Date().getMonth() + 1;
  }
  
  function currentYear() {
    return new Date().getYear() + 1900;
  }
  
  var Events = function() {
    var handlers = {};
    
    this.on = function(name, handler) {
      if(typeof handlers[name] === 'undefined') {
        handlers[name] = [];
      }
      handlers[name].push(handler);
    };
    
    this.fire = function(name) {
      var genericName = name.substring(0, name.indexOf(':'));
      
      callHandlers(handlers[genericName]);
      callHandlers(handlers[name]);
      
      function callHandlers(handlers) {
        if(typeof handlers !== 'undefined') {
          for(var index = 0; index < handlers.length; index++) {
            handlers[index]();
          }
        }
      }
    };
  };

  var Model = function() {
    var attributes = {};
    var events = new Events();
    
    this.get = function(name) {
      return attributes[name];
    };
    
    this.set = function(name, value) {
      var changed = value !== attributes[name];
      
      attributes[name] = value;
      
      if(changed) {
        events.fire('change:' + name);
      }
    };
    
    this.on = function(eventName, handler) {
      events.on(eventName, handler);
    };
  };
  
  function transition(element, options, callback) {
    var finalValue = parseInt(options.final);
    
    if(!options.animated) {
      propertyValue(finalValue);
      callback();
      return;
    }
    
    var initialValue = parseInt(options.initial);
    var ascending = finalValue > initialValue;
    var finished = ascending ?
        function(a, b) { return a >= b; } :
        function(a, b) { return a <= b; };

    propertyValue(initialValue);
    animate();
    
    function propertyValue(value) {
      if(arguments.length)
        element.style[options.property] = value + options.unit;
      else
        return parseInt(element.style[options.property]);
    }
    
    function animate() {
      var currentValue = propertyValue();
      var nextValue = currentValue + (ascending ? 1 : -1);
      
      propertyValue(nextValue);
      
      if(finished(nextValue, finalValue))
        callback();
      else
        setTimeout(animate, 8);
    }
  }
  
  function preventConcurrentRun(asyncFunction) {
    var running;
    return function() {
      if(!running) {
        running = true;
        asyncFunction(function() {
          running = false;
        });
      }
    };
  }
  
  return function(options) {
    var model = new Model();
    
    model.set('year', currentYear());
    model.set('month', currentMonth());
    
    var root = document.createElement('div');
    var top = document.createElement('div');
    var main = document.createElement('div');
    var bottom = document.createElement('div');
    var years = document.createElement('div');
    var spinner = document.createElement('div');
    var months = document.createElement('div');
    var yearUpButton = createSpinButton('&#9650;', 'up', preventConcurrentRun(yearUp));
    var yearDownButton = createSpinButton('&#9660;', 'down', preventConcurrentRun(yearDown));
    
    root.className = 'month-picker';
    years.className = 'years';
    months.className = 'months';
    spinner.className = 'spinner';
    
    root.appendChild(top);
    root.appendChild(main);
    root.appendChild(bottom);
    
    top.appendChild(yearUpButton);
    main.appendChild(years);
    main.appendChild(months);
    bottom.appendChild(yearDownButton);
    years.appendChild(spinner);
    
    createYearButtons();
    createMonthButtons();
    
    function createYearButtons() {
      for(var index = 0; index < 4; index++) {
        var button = createYearButton(model.get('year') - index);
        spinner.appendChild(button);
      }
    }
    
    function createMonthButtons() {
      var group = null;
      for(var month = 1; month <= 12; month++) {
        if(group === null || (month - 1) % 4 == 0) {
          group = createMonthGroup();
          months.appendChild(group);
        }
        group.appendChild(createMonthButton(month));
      }
    }
    
    function createMonthGroup() {
      var group = document.createElement('div');
      group.className = 'group';
      return group;
    }
    
    function createSpinButton(text, className, clickHandler) {
      var container = document.createElement('div');
      container.className = 'spin-button ' + className;
      container.appendChild(createButton(text, clickHandler));
      return container;
    }
    
    function createButton(text, clickHandler) {
      var button = document.createElement('a');
      button.href = 'javascript:void(0)';
      button.innerHTML = text;
      button.onclick = clickHandler;
      return button;
    }
    
    function selectButton(buttonSelector, container) {
      var selectedButton = container.querySelector('.selected');
      if(selectedButton) selectedButton.className = '';
      container.querySelector(buttonSelector).className = 'selected';
    }
  
    function createYearButton(year) {
      var button = createButton(year.toString(), function() {
        model.set('year', year);
      });
      
      button.setAttribute('data-year', year);
      
      if(year == model.get('year')) {
        button.className = 'selected';
      }
      
      return button;
    }
  
    function createMonthButton(month) {
      var monthName = monthNames[month-1];
      var button = createButton(monthName, function() {
        model.set('month', month);
      });
      
      button.setAttribute('data-month', month);
      
      if(month == model.get('month')) {
        button.className = 'selected';
      }
      
      return button;
    }
    
    function yearButtons() {
      return spinner.querySelectorAll('a');
    }
    
    function yearUp(callback) {
      var firstYearButton = yearButtons()[0];
      var lastYearButton = yearButtons()[yearButtons().length-1];
      var firstYear = parseInt(firstYearButton.innerHTML);
      var newYearButton = createYearButton(firstYear + 1);
      
      spinner.insertBefore(newYearButton, firstYearButton);
      
      transition(spinner, {
        property: 'top', unit: 'px',
        animated: options && (options.animated === true),
        initial: -parseInt(window.getComputedStyle(firstYearButton).height),
        final: 0
      }, function() {
        spinner.removeChild(lastYearButton);
        callback();
      });
    }
    
    function yearDown(callback) {
      var firstYearButton = yearButtons()[0];
      var lastYearButton = yearButtons()[yearButtons().length-1];
      var lastYear = parseInt(lastYearButton.innerHTML);
      var newYearButton = createYearButton(lastYear - 1);
      
      spinner.appendChild(newYearButton);
      
      transition(spinner, {
        property: 'top', unit: 'px',
        animated: options && (options.animated === true),
        initial: 0,
        final: -parseInt(window.getComputedStyle(firstYearButton).height)
      }, function() {
        spinner.removeChild(firstYearButton);
        spinner.style.top = 0;
        callback();
      });
    }
    
    model.on('change:year', function() {
      selectButton('a[data-year="' + model.get('year') + '"]', spinner);
    });
    
    model.on('change:month', function() {
      selectButton('a[data-month="' + model.get('month') + '"]', months);
    });
    
    this.el = root;
    this.model = function() {return model};
  };
})();
