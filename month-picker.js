var MonthPicker = (function(){
  'use strict';

  var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function currentMonth() {
    return new Date().getMonth() + 1;
  }
  
  function currentYear() {
    return new Date().getYear() + 1900;
  }
  
  return function() {
    var selectedYear = currentYear();
    var selectedMonth = currentMonth();
    
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
      years.appendChild(createYearButton(selectedYear - index));
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
        selectedYear = year;
      });
      
      if(year == selectedYear) {
        button.className = 'selected';
      }
      
      return button;
    }
  
    function createMonthButton(month) {
      var monthName = monthNames[month-1];
      var button = createButton(monthName, function() {
        selectButton(button, months);
        selectedMonth = month;
      });
      
      if(month == selectedMonth) {
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
    
    this.model = function() {
      return {
        year: function() {return selectedYear},
        month: function() {return selectedMonth}
      };
    };
  };
})();
