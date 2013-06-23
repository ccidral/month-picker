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
      if(typeof handlers[name] !== 'undefined') {
        for(var index = 0; index < handlers[name].length; index++) {
          handlers[name][index]();
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
        events.fire('change');
      }
    };
    
    this.on = function(eventName, handler) {
      events.on(eventName, handler);
    };
  };
  
  return function() {
    var model = new Model();
    
    model.set('year', currentYear());
    model.set('month', currentMonth());
    
    var root = document.createElement('div');
    var top = document.createElement('div');
    var main = document.createElement('div');
    var bottom = document.createElement('div');
    var years = document.createElement('div');
    var months = document.createElement('div');
    var yearUpButton = createButton('&#9650;', yearUp);
    var yearDownButton = createButton('&#9660;', yearDown);
    
    root.className = 'month-picker';
    years.className = 'years';
    months.className = 'months';
    yearUpButton.className = 'spin-year up';
    yearDownButton.className = 'spin-year down';
    
    root.appendChild(top);
    root.appendChild(main);
    root.appendChild(bottom);
    
    top.appendChild(yearUpButton);
    main.appendChild(years);
    main.appendChild(months);
    bottom.appendChild(yearDownButton);
    
    for(var index = 0; index < 4; index++) {
      years.appendChild(createYearButton(model.get('year') - index));
    }
    
    for(var month = 1; month <= 12; month++) {
      months.appendChild(createMonthButton(month));
    }
    
    function createButton(text, clickHandler) {
      var button = document.createElement('a');
      button.href = 'javascript:void(0)';
      button.innerHTML = text;
      button.onclick = clickHandler;
      return button;
    }
    
    function selectButton(button, container) {
      container.querySelector('.selected').className = '';
      button.className = 'selected';
    }
  
    function createYearButton(year) {
      var button = createButton(year.toString(), function() {
        selectButton(button, years);
        model.set('year', year);
      });
      
      if(year == model.get('year')) {
        button.className = 'selected';
      }
      
      return button;
    }
  
    function createMonthButton(month) {
      var monthName = monthNames[month-1];
      var button = createButton(monthName, function() {
        selectButton(button, months);
        model.set('month', month);
      });
      
      if(month == model.get('month')) {
        button.className = 'selected';
      }
      
      return button;
    }
    
    function yearButtons() {
      return years.querySelectorAll('a');
    }
    
    function yearUp() {
      var firstYearButton = yearButtons()[0];
      var lastYearButton = yearButtons()[yearButtons().length-1];
      var firstYear = parseInt(firstYearButton.innerHTML);
      var newYearButton = createYearButton(firstYear + 1);
      years.insertBefore(newYearButton, firstYearButton);
      years.removeChild(lastYearButton);
    }
    
    function yearDown() {
      var firstYearButton = yearButtons()[0];
      var lastYearButton = yearButtons()[yearButtons().length-1];
      var lastYear = parseInt(lastYearButton.innerHTML);
      var newYearButton = createYearButton(lastYear - 1);
      years.appendChild(newYearButton);
      years.removeChild(firstYearButton);
    }
    
    this.el = root;
    this.model = function() {return model};
  };
})();
