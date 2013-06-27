Month Picker
============

A simple yet good looking JavaScript month picker. It doesn't have any dependencies (so far).

How to use it
-------------

```javascript
var monthPicker = new MonthPicker();

document.body.appendChild(monthPicker.el);

monthPicker.model().on('change', function() {
  var year = monthPicker.model().get('year');
  var month = monthPicker.model().get('month');
  
  console.log('year:', year);
  console.log('month:', month);
});
```
