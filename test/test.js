(function() {
  describe('MonthPicker', function(){
    var monthPicker;

    function currentYear() {
      return new Date().getYear() + 1900;
    }

    function currentMonth() {
      return new Date().getMonth() + 1;
    }
    
    function notTheCurrentMonth() {
      var month = currentMonth() - 1;
      return month > 0 ? month : 12;
    }

    function selectYears() {
      return $(monthPicker.el).find('.years a');
    }

    function selectMonths() {
      return $(monthPicker.el).find('.months a');
    }
    
    function spinYearUpButton() {
      return $(monthPicker.el).find('.spin-button.up a');
    }
    
    function spinYearDownButton() {
      return $(monthPicker.el).find('.spin-button.down a');
    }
    
  
    beforeEach(function() {
      monthPicker = new MonthPicker();
      $('body').append(monthPicker.el);
    });
  
    afterEach(function() {
      $(monthPicker.el).remove();
    });
    
  
    it('displays 4 years', function(){
      expect(selectYears().size()).to.be(4);
    });
  
    it('displays 12 months', function() {
      expect(selectMonths().size()).to.be(12);
    });
  
    it('displays years in descending order starting with the current year', function() {
      expect(selectYears().eq(0).html()).to.eql(currentYear());
      expect(selectYears().eq(1).html()).to.eql(currentYear() - 1);
      expect(selectYears().eq(2).html()).to.eql(currentYear() - 2);
      expect(selectYears().eq(3).html()).to.eql(currentYear() - 3);
    });
  
    it('should select current year by default', function() {
      expect(selectYears().eq(0).hasClass('selected')).to.be(true);
      expect(selectYears().eq(1).hasClass('selected')).to.be(false);
      expect(selectYears().eq(2).hasClass('selected')).to.be(false);
      expect(selectYears().eq(3).hasClass('selected')).to.be(false);
    });
  
    it('should select current month by default', function() {
      expect(selectMonths().eq(0).hasClass('selected')).to.be(currentMonth() == 1);
      expect(selectMonths().eq(1).hasClass('selected')).to.be(currentMonth() == 2);
      expect(selectMonths().eq(2).hasClass('selected')).to.be(currentMonth() == 3);
      expect(selectMonths().eq(3).hasClass('selected')).to.be(currentMonth() == 4);
      expect(selectMonths().eq(4).hasClass('selected')).to.be(currentMonth() == 5);
      expect(selectMonths().eq(5).hasClass('selected')).to.be(currentMonth() == 6);
      expect(selectMonths().eq(6).hasClass('selected')).to.be(currentMonth() == 7);
      expect(selectMonths().eq(7).hasClass('selected')).to.be(currentMonth() == 8);
      expect(selectMonths().eq(8).hasClass('selected')).to.be(currentMonth() == 9);
      expect(selectMonths().eq(9).hasClass('selected')).to.be(currentMonth() == 10);
      expect(selectMonths().eq(10).hasClass('selected')).to.be(currentMonth() == 11);
      expect(selectMonths().eq(11).hasClass('selected')).to.be(currentMonth() == 12);
    });
    
    it('should select year on click', function() {
      selectYears().eq(2).click();
      expect(selectYears().eq(0).hasClass('selected')).to.be(false);
      expect(selectYears().eq(1).hasClass('selected')).to.be(false);
      expect(selectYears().eq(2).hasClass('selected')).to.be(true);
      expect(selectYears().eq(3).hasClass('selected')).to.be(false);
    });
    
    it('should select year on click given that the previously selected year was out of visible range', function() {
      spinYearDownButton().click();
      selectYears().eq(1).click();
      expect(selectYears().eq(0).hasClass('selected')).to.be(false);
      expect(selectYears().eq(1).hasClass('selected')).to.be(true);
      expect(selectYears().eq(2).hasClass('selected')).to.be(false);
      expect(selectYears().eq(3).hasClass('selected')).to.be(false);
    });
    
    it('should select month on click', function() {
      var anotherMonth = notTheCurrentMonth();
      selectMonths().eq(anotherMonth-1).click();
      expect(selectMonths().eq(0).hasClass('selected')).to.be(anotherMonth == 1);
      expect(selectMonths().eq(1).hasClass('selected')).to.be(anotherMonth == 2);
      expect(selectMonths().eq(2).hasClass('selected')).to.be(anotherMonth == 3);
      expect(selectMonths().eq(3).hasClass('selected')).to.be(anotherMonth == 4);
      expect(selectMonths().eq(4).hasClass('selected')).to.be(anotherMonth == 5);
      expect(selectMonths().eq(5).hasClass('selected')).to.be(anotherMonth == 6);
      expect(selectMonths().eq(6).hasClass('selected')).to.be(anotherMonth == 7);
      expect(selectMonths().eq(7).hasClass('selected')).to.be(anotherMonth == 8);
      expect(selectMonths().eq(8).hasClass('selected')).to.be(anotherMonth == 9);
      expect(selectMonths().eq(9).hasClass('selected')).to.be(anotherMonth == 10);
      expect(selectMonths().eq(10).hasClass('selected')).to.be(anotherMonth == 11);
      expect(selectMonths().eq(11).hasClass('selected')).to.be(anotherMonth == 12);
    });
    
    
    describe('Default localization', function() {
      it('displays text in English language by default', function() {
        expect(selectMonths().eq(0).html()).to.eql('Jan');
        expect(selectMonths().eq(1).html()).to.eql('Feb');
        expect(selectMonths().eq(2).html()).to.eql('Mar');
        expect(selectMonths().eq(3).html()).to.eql('Apr');
        expect(selectMonths().eq(4).html()).to.eql('May');
        expect(selectMonths().eq(5).html()).to.eql('Jun');
        expect(selectMonths().eq(6).html()).to.eql('Jul');
        expect(selectMonths().eq(7).html()).to.eql('Aug');
        expect(selectMonths().eq(8).html()).to.eql('Sep');
        expect(selectMonths().eq(9).html()).to.eql('Oct');
        expect(selectMonths().eq(10).html()).to.eql('Nov');
        expect(selectMonths().eq(11).html()).to.eql('Dec');
      });
    });
    
    
    describe('Year spinner', function() {
      
      describe('Up button', function() {
        
        beforeEach(function() {
          spinYearUpButton().click();
          spinYearUpButton().click();
        });
        
        it('keeps the same number of years', function() {
          expect(selectYears().size()).to.be(4);
        });
        
        it('inserts new years at the top', function() {
          expect(selectYears().eq(0).html()).to.eql(currentYear() + 2);
          expect(selectYears().eq(1).html()).to.eql(currentYear() + 1);
          expect(selectYears().eq(2).html()).to.eql(currentYear());
          expect(selectYears().eq(3).html()).to.eql(currentYear() - 1);
        });
        
        it('preserves selected year', function() {
          expect(selectYears().eq(0).hasClass('selected')).to.be(false);
          expect(selectYears().eq(1).hasClass('selected')).to.be(false);
          expect(selectYears().eq(2).hasClass('selected')).to.be(true);
          expect(selectYears().eq(3).hasClass('selected')).to.be(false);
        });
      });
      
      
      describe('Down button', function() {
        
        beforeEach(function() {
          spinYearDownButton().click();
          spinYearDownButton().click();
        });
        
        it('keeps the same number of years', function() {
          expect(selectYears().size()).to.be(4);
        });
        
        it('appends new years at the bottom', function() {
          expect(selectYears().eq(0).html()).to.eql(currentYear() - 2);
          expect(selectYears().eq(1).html()).to.eql(currentYear() - 3);
          expect(selectYears().eq(2).html()).to.eql(currentYear() - 4);
          expect(selectYears().eq(3).html()).to.eql(currentYear() - 5);
        });
      });
      
      
      describe('Selected year', function() {
        
        it('is restored when it goes out then comes back into visible range', function() {
          // the first year is the selected year,
          // so it goes out of visible range when you click on the 'down' button
          spinYearDownButton().click();

          expect(selectYears().eq(0).hasClass('selected')).to.be(false);
          expect(selectYears().eq(1).hasClass('selected')).to.be(false);
          expect(selectYears().eq(2).hasClass('selected')).to.be(false);
          expect(selectYears().eq(3).hasClass('selected')).to.be(false);
          
          // it comes back into visible range after you click on the 'up' button
          spinYearUpButton().click();
          
          expect(selectYears().eq(0).hasClass('selected')).to.be(true);
          expect(selectYears().eq(1).hasClass('selected')).to.be(false);
          expect(selectYears().eq(2).hasClass('selected')).to.be(false);
          expect(selectYears().eq(3).hasClass('selected')).to.be(false);
        });
      });
    });
    
    describe('The model', function() {
      it('exists', function() {
        expect(monthPicker.model()).not.to.be(undefined);
      });
      
      it('is not null', function() {
        expect(monthPicker.model()).not.to.be(null);
      });
      
      describe('The year', function() {
        it('returns the current year by default', function() {
          expect(monthPicker.model().get('year')).to.be(currentYear());
        });
        
        it('returns the year selected by the user', function() {
          selectYears().eq(1).click();
          expect(monthPicker.model().get('year')).to.be(currentYear()-1);
        });
        
        it('updates the UI when changed', function() {
          monthPicker.model().set('year', currentYear()-1);
          expect(selectYears().eq(0).hasClass('selected')).to.be(false);
          expect(selectYears().eq(1).hasClass('selected')).to.be(true);
          expect(selectYears().eq(2).hasClass('selected')).to.be(false);
          expect(selectYears().eq(3).hasClass('selected')).to.be(false);
        });
      });
      
      describe('The month', function() {
        it('returns the current month by default', function() {
          expect(monthPicker.model().get('month')).to.be(currentMonth());
        });
        
        it('returns the month selected by the user', function() {
          var anotherMonth = notTheCurrentMonth();
          selectMonths().eq(anotherMonth-1).click();
          expect(monthPicker.model().get('month')).to.be(anotherMonth);
        });
        
        it('updates the UI when changed', function() {
          var anotherMonth = notTheCurrentMonth();
          monthPicker.model().set('month', anotherMonth);
          expect(selectMonths().eq(0).hasClass('selected')).to.be(anotherMonth == 1);
          expect(selectMonths().eq(1).hasClass('selected')).to.be(anotherMonth == 2);
          expect(selectMonths().eq(2).hasClass('selected')).to.be(anotherMonth == 3);
          expect(selectMonths().eq(3).hasClass('selected')).to.be(anotherMonth == 4);
          expect(selectMonths().eq(4).hasClass('selected')).to.be(anotherMonth == 5);
          expect(selectMonths().eq(5).hasClass('selected')).to.be(anotherMonth == 6);
          expect(selectMonths().eq(6).hasClass('selected')).to.be(anotherMonth == 7);
          expect(selectMonths().eq(7).hasClass('selected')).to.be(anotherMonth == 8);
          expect(selectMonths().eq(8).hasClass('selected')).to.be(anotherMonth == 9);
          expect(selectMonths().eq(9).hasClass('selected')).to.be(anotherMonth == 10);
          expect(selectMonths().eq(10).hasClass('selected')).to.be(anotherMonth == 11);
          expect(selectMonths().eq(11).hasClass('selected')).to.be(anotherMonth == 12);
        });
      });
      
      describe('The generic "change" event', function() {
        var triggered;
        
        beforeEach(function() {
          triggered = false;
          
          monthPicker.model().set('foo', 'something');
          
          monthPicker.model().on('change', function() {
            triggered = true;
          });
        });
        
        it('is not triggered when a property does not change', function() {
          monthPicker.model().set('foo', 'something');
          expect(triggered).to.be(false);
        });
        
        it('is triggered when any property of the model is programmatically changed', function() {
          monthPicker.model().set('foo', 'bar');
          expect(triggered).to.be(true);
        });
        
        it('accepts multiple event handlers', function() {
          var alsoTriggeredTheOtherHandler = false;
          
          monthPicker.model().on('change', function() {
            alsoTriggeredTheOtherHandler = true;
          });
          
          monthPicker.model().set('foo', 'bar');
          
          expect(triggered).to.be(true);
          expect(alsoTriggeredTheOtherHandler).to.be(true);
        });
        
        it('is triggered when a specific change event is triggered', function() {
          var alsoTriggeredTheSpecificHandler = false;
          
          monthPicker.model().on('change:foo', function() {
            alsoTriggeredTheSpecificHandler = true;
          });
          
          monthPicker.model().set('foo', 'bar');
          
          expect(triggered).to.be(true);
          expect(alsoTriggeredTheSpecificHandler).to.be(true);
        });
      });
      
      describe('Specific "change" events', function() {
        var triggered;
        
        beforeEach(function() {
          triggered = {
            car: false,
            food: false
          };
          
          monthPicker.model().on('change:car', function() {
            triggered.car = true;
          });
          
          monthPicker.model().on('change:food', function() {
            triggered.food = true;
          });
        });
        
        it('is triggered when corresponding property is changed', function() {
          monthPicker.model().set('car', 'Mustang');
          expect(triggered.car).to.be(true);
        });
        
        it('is not triggered when incorresponding property is changed', function() {
          monthPicker.model().set('car', 'Mustang');
          expect(triggered.food).to.be(false);
        });
      });
      
      describe('The specific "change:year" event', function() {
        var triggered;
        
        beforeEach(function() {
          triggered = false;
          
          monthPicker.model().on('change:year', function() {
            triggered = true;
          });
        });
        
        it('is triggered when the user selects a different year', function() {
          selectYears().eq(1).click();
          expect(triggered).to.be(true);
        });
        
        it('is not triggered when the user selects a different month', function() {
          selectMonths().eq(notTheCurrentMonth()-1).click();
          expect(triggered).to.be(false);
        });
        
        it('is not triggered when the user clicks on a year that is already selected', function() {
          selectYears().eq(0).click();
          expect(triggered).to.be(false);
        });
      });
      
      describe('The specific "change:month" event', function() {
        var triggered;
        
        beforeEach(function() {
          triggered = false;
          
          monthPicker.model().on('change:month', function() {
            triggered = true;
          });
        });
        
        it('is triggered when the user selects a different month', function() {
          selectMonths().eq(notTheCurrentMonth()-1).click();
          expect(triggered).to.be(true);
        });
        
        it('is not triggered when the user selects a different year', function() {
          selectYears().eq(1).click();
          expect(triggered).to.be(false);
        });
        
        it('is not triggered when the user clicks on a month that is already selected', function() {
          selectMonths().eq(currentMonth()-1).click();
          expect(triggered).to.be(false);
        });
      });
    });
  });
})();
