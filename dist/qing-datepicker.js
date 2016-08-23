/**
 * qing-datepicker v0.0.1
 * http://mycolorway.github.io/qing-datepicker
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/qing-datepicker/license.html
 *
 * Date: 2016-08-23
 */
;(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'),require('moment'),require('qing-module'));
  } else {
    root.QingDatepicker = factory(root.jQuery,root.moment,root.QingModule);
  }
}(this, function ($,moment,QingModule) {
var define, module, exports;
var b = require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Input,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Input = (function(superClass) {
  extend(Input, superClass);

  Input.opts = {
    wrapper: null,
    placeholder: ''
  };

  function Input(opts) {
    Input.__super__.constructor.apply(this, arguments);
    this.opts = $.extend({}, Input.opts, this.opts);
    this.wrapper = $(this.opts.wrapper);
    this.focused = false;
    this._render();
    this._bind();
  }

  Input.prototype._render = function() {
    return this.el = $('<input type="text" class="text-field">').attr('placeholder', this.opts.placeholder).appendTo(this.wrapper);
  };

  Input.prototype._bind = function() {
    this.el.on('focus', (function(_this) {
      return function(e) {
        _this.focused = true;
        return _this.trigger('focus');
      };
    })(this));
    this.el.on('blur', (function(_this) {
      return function(e) {
        _this.focused = false;
        return _this.trigger('blur');
      };
    })(this));
    this.el.on('click', (function(_this) {
      return function(e) {
        return _this.trigger('click');
      };
    })(this));
    return this.el.on('input', (function(_this) {
      return function(e) {
        if (_this._inputTimer) {
          clearTimeout(_this._inputTimer);
          _this._inputTimer = null;
        }
        return _this._inputTimer = setTimeout(function() {
          return _this.trigger('change', [_this.el.val()]);
        }, 400);
      };
    })(this));
  };

  Input.prototype.setValue = function(value) {
    this.el.val(value);
    return value;
  };

  Input.prototype.getValue = function() {
    return this.el.val();
  };

  Input.prototype.destroy = function() {
    return this.el.remove();
  };

  return Input;

})(QingModule);

module.exports = Input;

},{}],2:[function(require,module,exports){
var DateSelect, MonthSelect, Popover, YearSelect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DateSelect = require('./select-views/date-select.coffee');

MonthSelect = require('./select-views/month-select.coffee');

YearSelect = require('./select-views/year-select.coffee');

Popover = (function(superClass) {
  extend(Popover, superClass);

  Popover.opts = {
    wrapper: null,
    prevArrow: '',
    nextArrow: '',
    locales: null
  };

  function Popover(opts) {
    Popover.__super__.constructor.apply(this, arguments);
    this.opts = $.extend({}, Popover.opts, this.opts);
    this.wrapper = $(this.opts.wrapper);
    this._render();
    this.dateSelect = new DateSelect({
      wrapper: this.el,
      prevArrow: this.opts.prevArrow,
      nextArrow: this.opts.nextArrow
    });
    this.monthSelect = new MonthSelect({
      wrapper: this.el,
      prevArrow: this.opts.prevArrow,
      nextArrow: this.opts.nextArrow
    });
    this.yearSelect = new YearSelect({
      wrapper: this.el,
      prevArrow: this.opts.prevArrow,
      nextArrow: this.opts.nextArrow,
      locales: this.opts.locales
    });
    this._bind();
  }

  Popover.prototype._render = function() {
    return this.el = $('<div class="popover"></div>').appendTo(this.wrapper);
  };

  Popover.prototype._bind = function() {
    this.dateSelect.on('yearClick', (function(_this) {
      return function(e, year) {
        _this.yearSelect.setYear(year);
        return _this.setSelectView(_this.yearSelect);
      };
    })(this));
    this.dateSelect.on('monthClick', (function(_this) {
      return function(e, month) {
        _this.monthSelect.setMonth(month);
        return _this.setSelectView(_this.monthSelect);
      };
    })(this));
    this.dateSelect.on('select', (function(_this) {
      return function(e, date) {
        _this.date = date;
        return _this.trigger('select', [_this.date.clone()]);
      };
    })(this));
    this.monthSelect.on('yearClick', (function(_this) {
      return function(e, year) {
        _this.yearSelect.setYear(year);
        return _this.setSelectView(_this.yearSelect);
      };
    })(this));
    this.monthSelect.on('select', (function(_this) {
      return function(e, month) {
        _this.date.set({
          year: month.year(),
          month: month.month()
        });
        _this.dateSelect.setMonth(month);
        return _this.setSelectView(_this.dateSelect);
      };
    })(this));
    return this.yearSelect.on('select', (function(_this) {
      return function(e, year) {
        _this.monthSelect.setYear(year);
        _this.date.year(year);
        return _this.setSelectView(_this.monthSelect);
      };
    })(this));
  };

  Popover.prototype.setSelectView = function(selectView) {
    if (selectView === this.selectView) {
      return;
    }
    if (this.selectView) {
      this.selectView.setActive(false);
    }
    selectView.setActive(true);
    this.selectView = selectView;
    return this.selectView;
  };

  Popover.prototype.setDate = function(date) {
    this.date = moment(date);
    this.dateSelect.setDate(this.date.clone());
    this.setSelectView(this.dateSelect);
    return this.date;
  };

  Popover.prototype.setActive = function(active) {
    this.active = active;
    this.el.toggleClass('active', active);
    if (this.active) {
      this.trigger('show');
    } else {
      this.trigger('hide');
    }
    return this.active;
  };

  Popover.prototype.setPosition = function(position) {
    return this.el.css({
      top: position.top,
      left: position.left || 0
    });
  };

  return Popover;

})(QingModule);

module.exports = Popover;

},{"./select-views/date-select.coffee":3,"./select-views/month-select.coffee":4,"./select-views/year-select.coffee":6}],3:[function(require,module,exports){
var DateSelect, SelectView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectView = require('./select-view.coffee');

DateSelect = (function(superClass) {
  extend(DateSelect, superClass);

  function DateSelect(opts) {
    DateSelect.__super__.constructor.apply(this, arguments);
    this.date = moment().startOf('day');
    this.month = moment().startOf('month');
  }

  DateSelect.prototype._render = function() {
    DateSelect.__super__._render.apply(this, arguments);
    $("<a href=\"javascript:;\" class=\"link-year\"></a>\n<a href=\"javascript:;\" class=\"link-month\"></a>").appendTo(this.el.find('.title'));
    return this.el.addClass('date-select');
  };

  DateSelect.prototype._renderGrid = function() {
    var $day, date, endDate, weekdays;
    this.el.find('.link-year').text(this.month.format('YYYY'));
    this.el.find('.link-month').text(this.month.format('MMM'));
    this.grid.empty();
    date = this.month.clone().startOf('week');
    endDate = this.month.clone().endOf('month').endOf('week');
    while (date.isSameOrBefore(endDate)) {
      $day = $('<a>', {
        href: 'javascript:;',
        "class": 'grid-item link-day',
        'data-date': date.format('YYYY-MM-DD'),
        text: date.format('D')
      });
      if (!date.clone().startOf('month').isSame(this.month)) {
        $day.addClass('minor');
      }
      if (date.isSame(this.date)) {
        $day.addClass('selected');
      }
      if (date.isSame(moment().startOf('day'))) {
        $day.addClass('current');
      }
      weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      $day.addClass(weekdays[date.day()]).appendTo(this.grid);
      date.add(1, 'days');
    }
    return this.grid;
  };

  DateSelect.prototype._bind = function() {
    DateSelect.__super__._bind.apply(this, arguments);
    this.el.on('mousedown', '.link-prev', (function(_this) {
      return function(e) {
        _this.month.subtract(1, 'months');
        return _this._renderGrid();
      };
    })(this));
    this.el.on('mousedown', '.link-next', (function(_this) {
      return function(e) {
        _this.month.add(1, 'months');
        return _this._renderGrid();
      };
    })(this));
    this.el.on('mousedown', '.link-year', (function(_this) {
      return function(e) {
        return _this.trigger('yearClick', [_this.month.year()]);
      };
    })(this));
    this.el.on('mousedown', '.link-month', (function(_this) {
      return function(e) {
        return _this.trigger('monthClick', [_this.month.clone()]);
      };
    })(this));
    return this.el.on('mousedown', '.link-day', (function(_this) {
      return function(e) {
        var $link, date;
        $link = $(e.currentTarget);
        date = moment($link.data('date'));
        return _this.trigger('select', [date]);
      };
    })(this));
  };

  DateSelect.prototype.setDate = function(date) {
    if (!(moment.isMoment(date) && date.isValid())) {
      return;
    }
    this.date = date;
    this.month = date.clone().startOf('month');
    this._renderGrid();
    return this.date;
  };

  DateSelect.prototype.setMonth = function(month) {
    if (!(moment.isMoment(month) && month.isValid())) {
      return;
    }
    this.month = month;
    this._renderGrid();
    return this.month;
  };

  return DateSelect;

})(SelectView);

module.exports = DateSelect;

},{"./select-view.coffee":5}],4:[function(require,module,exports){
var MonthSelect, SelectView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectView = require('./select-view.coffee');

MonthSelect = (function(superClass) {
  extend(MonthSelect, superClass);

  function MonthSelect(opts) {
    MonthSelect.__super__.constructor.apply(this, arguments);
    this.month = moment().startOf('month');
    this.year = moment().year();
  }

  MonthSelect.prototype._render = function() {
    MonthSelect.__super__._render.apply(this, arguments);
    $('<a href="javascript:;" class="link-year"></a>').appendTo(this.el.find('.title'));
    return this.el.addClass('month-select');
  };

  MonthSelect.prototype._renderGrid = function() {
    var $month, i, j, month;
    this.el.find('.link-year').text(this.year);
    this.grid.empty();
    month = moment([this.year, 0, 1]);
    for (i = j = 0; j <= 11; i = ++j) {
      if (i > 0) {
        month = month.add(1, 'months');
      }
      $month = $('<a>', {
        href: 'javascript:;',
        "class": 'grid-item link-month',
        'data-month': month.format('YYYY-MM'),
        text: month.format('MMM')
      });
      if (month.isSame(moment().startOf('month'))) {
        $month.addClass('current');
      }
      if (month.isSame(this.month)) {
        $month.addClass('selected');
      }
      $month.appendTo(this.grid);
    }
    return this.grid;
  };

  MonthSelect.prototype._bind = function() {
    MonthSelect.__super__._bind.apply(this, arguments);
    this.el.on('mousedown', '.link-prev', (function(_this) {
      return function(e) {
        _this.year -= 1;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('mousedown', '.link-next', (function(_this) {
      return function(e) {
        _this.year += 1;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('mousedown', '.link-year', (function(_this) {
      return function(e) {
        return _this.trigger('yearClick', [_this.year]);
      };
    })(this));
    return this.el.on('mousedown', '.link-month', (function(_this) {
      return function(e) {
        var $link, month;
        $link = $(e.currentTarget);
        month = moment($link.data('month'));
        return _this.trigger('select', [month]);
      };
    })(this));
  };

  MonthSelect.prototype.setMonth = function(month) {
    if (!(moment.isMoment(month) && month.isValid())) {
      return;
    }
    this.month = month;
    this.year = month.year();
    this._renderGrid();
    return this.month;
  };

  MonthSelect.prototype.setYear = function(year) {
    this.year = year;
    this._renderGrid();
    return this.year;
  };

  return MonthSelect;

})(SelectView);

module.exports = MonthSelect;

},{"./select-view.coffee":5}],5:[function(require,module,exports){
var SelectView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectView = (function(superClass) {
  extend(SelectView, superClass);

  SelectView.opts = {
    wrapper: null,
    prevArrow: null,
    nextArrow: null
  };

  function SelectView(opts) {
    SelectView.__super__.constructor.apply(this, arguments);
    this.opts = $.extend({}, SelectView.opts, this.opts);
    this.wrapper = $(this.opts.wrapper);
    this.active = false;
    this._render();
    this._bind();
  }

  SelectView.prototype._render = function() {
    this.el = $("<div class=\"select-view\">\n  <div class=\"top-bar\">\n    <a href=\"javascript:;\" class=\"link-prev\">" + this.opts.prevArrow + "</a>\n    <span class=\"title\">\n    </span>\n    <a href=\"javascript:;\" class=\"link-next\">" + this.opts.nextArrow + "</a>\n  </div>\n  <div class=\"select-grid\"></div>\n</div>").appendTo(this.wrapper);
    this.grid = this.el.find('.select-grid');
    return this.el;
  };

  SelectView.prototype._renderGrid = function() {};

  SelectView.prototype._bind = function() {
    return this.el.on('mousedown', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  };

  SelectView.prototype.setActive = function(active) {
    this.active = active;
    this.el.toggleClass('active', active);
    return this.active;
  };

  return SelectView;

})(QingModule);

module.exports = SelectView;

},{}],6:[function(require,module,exports){
var SelectView, YearSelect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SelectView = require('./select-view.coffee');

YearSelect = (function(superClass) {
  extend(YearSelect, superClass);

  YearSelect.opts = {
    locales: null
  };

  function YearSelect(opts) {
    YearSelect.__super__.constructor.apply(this, arguments);
    this.opts = $.extend({}, YearSelect.opts, this.opts);
    this.year = moment().year();
    this.currentYear = this.year;
  }

  YearSelect.prototype._render = function() {
    YearSelect.__super__._render.apply(this, arguments);
    this.el.find('.title').text(this.opts.locales.selectYear);
    return this.el.addClass('year-select');
  };

  YearSelect.prototype._renderGrid = function() {
    var $year, end, i, ref, ref1, start, year;
    this.grid.empty();
    start = this.year - 4;
    end = this.year + 4;
    for (year = i = ref = start, ref1 = end; ref <= ref1 ? i <= ref1 : i >= ref1; year = ref <= ref1 ? ++i : --i) {
      $year = $('<a>', {
        href: 'javascript:;',
        "class": 'grid-item link-year',
        'data-year': year,
        text: year
      });
      if (year === moment().year()) {
        $year.addClass('current');
      }
      if (year === this.currentYear) {
        $year.addClass('selected');
      }
      $year.appendTo(this.grid);
    }
    return this.grid;
  };

  YearSelect.prototype._bind = function() {
    YearSelect.__super__._bind.apply(this, arguments);
    this.el.on('mousedown', '.link-prev', (function(_this) {
      return function(e) {
        _this.year -= 9;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('mousedown', '.link-next', (function(_this) {
      return function(e) {
        _this.year += 9;
        return _this._renderGrid();
      };
    })(this));
    return this.el.on('mousedown', '.link-year', (function(_this) {
      return function(e) {
        var $link, year;
        $link = $(e.currentTarget);
        year = $link.data('year');
        return _this.trigger('select', [year]);
      };
    })(this));
  };

  YearSelect.prototype.setYear = function(year) {
    this.year = year;
    this.currentYear = year;
    this._renderGrid();
    return this.year;
  };

  return YearSelect;

})(SelectView);

module.exports = YearSelect;

},{"./select-view.coffee":5}],"qing-datepicker":[function(require,module,exports){
var Input, Popover, QingDatepicker,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Input = require('./input.coffee');

Popover = require('./popover.coffee');

QingDatepicker = (function(superClass) {
  extend(QingDatepicker, superClass);

  QingDatepicker.opts = {
    el: null,
    placeholder: '',
    format: 'YYYY-MM-DD',
    displayFormat: 'LL',
    inputFormats: ['YYYY-M-D', 'M/D/YY', 'YYYY年M月D日', 'YYYY.M.D', 'YYYY/M/D'],
    prevArrow: '&lt;',
    nextArrow: '&gt;',
    locales: {
      selectYear: 'Select Year'
    }
  };

  function QingDatepicker(opts) {
    QingDatepicker.__super__.constructor.apply(this, arguments);
    this.el = $(this.opts.el);
    if (!(this.el.length > 0)) {
      throw new Error('QingDatepicker: option el is required');
    }
    this.opts = $.extend({}, QingDatepicker.opts, this.opts);
    this.inputFormats = this.opts.inputFormats;
    this.locales = this.opts.locales || QingDatepicker.locales;
    this._render();
    this._initChildComponents();
    this._bind();
    this.setDate(moment(this.el.val(), this.opts.format));
  }

  QingDatepicker.prototype._render = function() {
    this.wrapper = $('<div class="qing-datepicker"></div>').data('qingDatepicker', this).insertBefore(this.el).append(this.el);
    return this.el.hide().data('qingDatepicker', this);
  };

  QingDatepicker.prototype._initChildComponents = function() {
    this.input = new Input({
      wrapper: this.wrapper,
      placeholder: this.opts.placeholder || this.el.attr('placeholder') || ''
    });
    return this.popover = new Popover({
      wrapper: this.wrapper,
      prevArrow: this.opts.prevArrow,
      nextArrow: this.opts.nextArrow,
      locales: this.locales
    });
  };

  QingDatepicker.prototype._bind = function() {
    this.input.on('focus', (function(_this) {
      return function() {
        _this.popover.setDate(_this.date);
        return _this.popover.setActive(true);
      };
    })(this));
    this.input.on('blur', (function(_this) {
      return function() {
        return _this.popover.setActive(false);
      };
    })(this));
    this.input.on('click', (function(_this) {
      return function() {
        if (_this.popover.active) {
          return;
        }
        _this.popover.setDate(_this.date);
        return _this.popover.setActive(true);
      };
    })(this));
    this.input.on('change', (function(_this) {
      return function(e, value) {
        var date;
        date = moment(value, _this.inputFormats, true);
        console.log(value, date);
        if (date.isValid()) {
          _this.setDate(date);
          return _this.popover.setDate(_this.date);
        }
      };
    })(this));
    this.popover.on('show', (function(_this) {
      return function(e) {
        return _this.popover.setPosition({
          top: _this.input.el.outerHeight() + 2
        });
      };
    })(this));
    return this.popover.on('select', (function(_this) {
      return function(e, date) {
        _this.setDate(date);
        return _this.popover.setActive(false);
      };
    })(this));
  };

  QingDatepicker.prototype.setDate = function(date) {
    if (moment.isMoment(date) && date.isValid() && !date.isSame(this.date)) {
      this.input.setValue(date.format(this.opts.displayFormat));
      this.el.val(date.format(this.opts.format));
      this.date = date;
      this.trigger('change', [this.date.clone()]);
    }
    return date;
  };

  QingDatepicker.prototype.getDate = function() {
    return this.date;
  };

  QingDatepicker.prototype.destroy = function() {
    this.el.insertAfter(this.wrapper).show().removeData('qingDatepicker');
    return this.wrapper.remove();
  };

  return QingDatepicker;

})(QingModule);

module.exports = QingDatepicker;

},{"./input.coffee":1,"./popover.coffee":2}]},{},[]);

return b('qing-datepicker');
}));
