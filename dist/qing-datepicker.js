/**
 * qing-datepicker v1.0.1
 * http://mycolorway.github.io/qing-datepicker
 *
 * Copyright Mycolorway Design
 * Released under the MIT license
 * http://mycolorway.github.io/qing-datepicker/license.html
 *
 * Date: 2016-11-23
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

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.opts = {
    wrapper: null,
    placeholder: ''
  };

  Input.prototype._setOptions = function(opts) {
    Input.__super__._setOptions.apply(this, arguments);
    return $.extend(this.opts, Input.opts, opts);
  };

  Input.prototype._init = function() {
    this.wrapper = $(this.opts.wrapper);
    this.active = false;
    this.empty = true;
    this._render();
    return this._bind();
  };

  Input.prototype._render = function() {
    this.el = $('<div class="input empty">');
    this.textField = $('<input type="text" class="text-field" readonly>').attr('placeholder', this.opts.placeholder).appendTo(this.el);
    this.linkClear = $('<a class="link-clear" href="javascript:;" tabindex="-1">\n  &#10005;\n</a>').appendTo(this.el);
    return this.el.appendTo(this.wrapper);
  };

  Input.prototype._bind = function() {
    this.textField.on('click', (function(_this) {
      return function(e) {
        if (_this.disabled) {
          return;
        }
        return _this.trigger('click');
      };
    })(this));
    this.textField.on('input', (function(_this) {
      return function(e) {
        if (_this._inputTimer) {
          clearTimeout(_this._inputTimer);
          _this._inputTimer = null;
        }
        return _this._inputTimer = setTimeout(function() {
          return _this.trigger('change', [_this.textField.val()]);
        }, 400);
      };
    })(this));
    this.textField.on('keydown', (function(_this) {
      return function(e) {
        var ref;
        if (_this.disabled) {
          return;
        }
        if ((ref = e.which) === 13 || ref === 38 || ref === 40) {
          return _this.trigger('click');
        }
      };
    })(this));
    return this.linkClear.on('click', (function(_this) {
      return function(e) {
        _this.trigger('clearClick');
        return false;
      };
    })(this));
  };

  Input.prototype.setValue = function(value) {
    this.textField.val(value);
    this.setEmpty(!value);
    return value;
  };

  Input.prototype.getValue = function() {
    return this.textField.val();
  };

  Input.prototype.setActive = function(active) {
    this.active = active;
    this.textField.toggleClass('active', active);
    return this.active;
  };

  Input.prototype.setEmpty = function(empty) {
    this.empty = empty;
    this.el.toggleClass('empty', empty);
    return this.empty;
  };

  Input.prototype.setDisabled = function(disabled) {
    if (disabled === this.disabled) {
      return;
    }
    this.el.toggleClass('disabled', disabled);
    this.textField.prop('disabled', disabled);
    return this.disabled = disabled;
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

  function Popover() {
    return Popover.__super__.constructor.apply(this, arguments);
  }

  Popover.opts = {
    wrapper: null,
    appendTo: 'body',
    locales: null
  };

  Popover.prototype._setOptions = function(opts) {
    Popover.__super__._setOptions.apply(this, arguments);
    return $.extend(this.opts, Popover.opts, opts);
  };

  Popover.prototype._init = function() {
    this.active = false;
    this._render();
    this.dateSelect = new DateSelect({
      wrapper: this.el
    });
    this.monthSelect = new MonthSelect({
      wrapper: this.el
    });
    this.yearSelect = new YearSelect({
      wrapper: this.el,
      locales: this.opts.locales
    });
    return this._bind();
  };

  Popover.prototype._render = function() {
    return this.el = $('<div class="qing-datepicker-popover"></div>').appendTo(this.opts.appendTo);
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

  Popover.prototype.destroy = function() {
    return this.el.remove();
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

  function DateSelect() {
    return DateSelect.__super__.constructor.apply(this, arguments);
  }

  DateSelect.prototype._init = function() {
    DateSelect.__super__._init.apply(this, arguments);
    this.date = moment().startOf('day');
    return this.month = moment().startOf('month');
  };

  DateSelect.prototype._render = function() {
    DateSelect.__super__._render.apply(this, arguments);
    $("<a href=\"javascript:;\" class=\"link-year\"></a>\n<a href=\"javascript:;\" class=\"link-month\"></a>").appendTo(this.el.find('.title'));
    return this.el.addClass('date-select');
  };

  DateSelect.prototype._renderGrid = function() {
    this.el.find('.link-year').text(this.month.format('YYYY'));
    this.el.find('.link-month').text(this.month.format('MMM'));
    this.grid.empty();
    this._renderGridHead();
    this._renderGridBody();
    return this.grid;
  };

  DateSelect.prototype._renderGridHead = function() {
    var $head;
    $head = $('<div class="weekdays">');
    $.each(moment.weekdaysMin(), (function(_this) {
      return function(i, weekdayName) {
        return $('<span>', {
          "class": 'weekday',
          text: weekdayName
        }).appendTo($head);
      };
    })(this));
    return this.grid.prepend($head);
  };

  DateSelect.prototype._renderGridBody = function() {
    var $body, $day, date, endDate, weekdays;
    $body = $('<div class="days">');
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
      $day.addClass(weekdays[date.day()]).appendTo($body);
      date.add(1, 'days');
    }
    this.grid.append($body);
    return this.grid;
  };

  DateSelect.prototype._bind = function() {
    DateSelect.__super__._bind.apply(this, arguments);
    this.el.on('click', '.link-prev', (function(_this) {
      return function(e) {
        _this.month.subtract(1, 'months');
        return _this._renderGrid();
      };
    })(this));
    this.el.on('click', '.link-next', (function(_this) {
      return function(e) {
        _this.month.add(1, 'months');
        return _this._renderGrid();
      };
    })(this));
    this.el.on('click', '.link-year', (function(_this) {
      return function(e) {
        return _this.trigger('yearClick', [_this.month.year()]);
      };
    })(this));
    this.el.on('click', '.link-month', (function(_this) {
      return function(e) {
        return _this.trigger('monthClick', [_this.month.clone()]);
      };
    })(this));
    return this.el.on('click', '.link-day', (function(_this) {
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

  function MonthSelect() {
    return MonthSelect.__super__.constructor.apply(this, arguments);
  }

  MonthSelect.prototype._init = function() {
    MonthSelect.__super__._init.apply(this, arguments);
    this.month = moment().startOf('month');
    return this.year = moment().year();
  };

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
    this.el.on('click', '.link-prev', (function(_this) {
      return function(e) {
        _this.year -= 1;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('click', '.link-next', (function(_this) {
      return function(e) {
        _this.year += 1;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('click', '.link-year', (function(_this) {
      return function(e) {
        return _this.trigger('yearClick', [_this.year]);
      };
    })(this));
    return this.el.on('click', '.link-month', (function(_this) {
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

  function SelectView() {
    return SelectView.__super__.constructor.apply(this, arguments);
  }

  SelectView.opts = {
    wrapper: null
  };

  SelectView.prototype._setOptions = function(opts) {
    SelectView.__super__._setOptions.apply(this, arguments);
    return $.extend(this.opts, SelectView.opts, opts);
  };

  SelectView.prototype._init = function() {
    this.wrapper = $(this.opts.wrapper);
    this.active = false;
    this._render();
    return this._bind();
  };

  SelectView.prototype._render = function() {
    this.el = $("<div class=\"select-view\">\n  <div class=\"top-bar\">\n    <a href=\"javascript:;\" class=\"link-prev\">&lt;</a>\n    <span class=\"title\">\n    </span>\n    <a href=\"javascript:;\" class=\"link-next\">&gt;</a>\n  </div>\n  <div class=\"select-grid\"></div>\n</div>").appendTo(this.wrapper);
    this.grid = this.el.find('.select-grid');
    return this.el;
  };

  SelectView.prototype._renderGrid = function() {};

  SelectView.prototype._bind = function() {};

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

  function YearSelect() {
    return YearSelect.__super__.constructor.apply(this, arguments);
  }

  YearSelect.opts = {
    locales: null
  };

  YearSelect.prototype._setOptions = function(opts) {
    YearSelect.__super__._setOptions.apply(this, arguments);
    return $.extend(this.opts, YearSelect.opts, opts);
  };

  YearSelect.prototype._init = function() {
    YearSelect.__super__._init.apply(this, arguments);
    this.year = moment().year();
    return this.currentYear = this.year;
  };

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
    this.el.on('click', '.link-prev', (function(_this) {
      return function(e) {
        _this.year -= 9;
        return _this._renderGrid();
      };
    })(this));
    this.el.on('click', '.link-next', (function(_this) {
      return function(e) {
        _this.year += 9;
        return _this._renderGrid();
      };
    })(this));
    return this.el.on('click', '.link-year', (function(_this) {
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

  function QingDatepicker() {
    return QingDatepicker.__super__.constructor.apply(this, arguments);
  }

  QingDatepicker.name = 'QingDatepicker';

  QingDatepicker.opts = {
    el: null,
    placeholder: '',
    format: 'YYYY-MM-DD',
    displayFormat: 'LL',
    inputFormats: ['YYYY-M-D', 'M/D/YY', 'YYYY年M月D日', 'YYYY.M.D', 'YYYY/M/D'],
    renderer: null,
    popoverOffset: 6,
    popoverAppendTo: 'body',
    locales: {
      selectYear: 'Select Year'
    }
  };

  QingDatepicker.count = 0;

  QingDatepicker.prototype._setOptions = function(opts) {
    QingDatepicker.__super__._setOptions.apply(this, arguments);
    return $.extend(this.opts, QingDatepicker.opts, opts);
  };

  QingDatepicker.prototype._init = function() {
    var date, initialized, value;
    this.el = $(this.opts.el);
    if (!(this.el.length > 0)) {
      throw new Error('QingDatepicker: option el is required');
    }
    if ((initialized = this.el.data('qingDatepicker'))) {
      return initialized;
    }
    this.inputFormats = this.opts.inputFormats;
    this.locales = this.opts.locales || QingDatepicker.locales;
    this.id = ++QingDatepicker.count;
    this._render();
    this._initChildComponents();
    this._bind();
    if ($.isFunction(this.opts.renderer)) {
      this.opts.renderer.call(this, this.wrapper, this);
    }
    if ((value = this.el.val()) && (date = moment(value, this.opts.format)).isValid()) {
      this.input.setValue(date.format(this.opts.displayFormat));
      this.date = date;
    }
    if (this.el.prop('disabled')) {
      return this.disable();
    }
  };

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
      appendTo: this.opts.popoverAppendTo,
      locales: this.locales
    });
  };

  QingDatepicker.prototype._bind = function() {
    $(document).on("click.qing-datepicker-" + this.id, (function(_this) {
      return function(e) {
        if ($.contains(_this.wrapper[0], e.target) || $.contains(_this.popover.el[0], e.target)) {
          return;
        }
        _this.popover.setActive(false);
        return null;
      };
    })(this));
    this.input.on('click', (function(_this) {
      return function() {
        if (_this.popover.active) {
          _this.popover.setActive(false);
          return _this.input.setActive(false);
        } else {
          _this.popover.setDate(_this.date);
          _this.popover.setActive(true);
          return _this.input.setActive(true);
        }
      };
    })(this));
    this.input.on('clearClick', (function(_this) {
      return function() {
        _this.setValue('');
        _this.popover.setActive(false);
        return _this.input.setActive(false);
      };
    })(this));
    this.input.on('change', (function(_this) {
      return function(e, value) {
        var date;
        date = moment(value, _this.inputFormats, true);
        if (date.isValid()) {
          _this.setDate(date);
          return _this.popover.setDate(_this.date);
        }
      };
    })(this));
    this.popover.on('show', (function(_this) {
      return function(e) {
        return _this.positionPopover();
      };
    })(this));
    this.popover.on('select', (function(_this) {
      return function(e, date) {
        _this.setDate(date);
        _this.popover.setActive(false);
        return _this.input.setActive(false);
      };
    })(this));
    return this.on('change', (function(_this) {
      return function(e) {
        return _this.el.trigger('change', [_this.date]);
      };
    })(this));
  };

  QingDatepicker.prototype.positionPopover = function() {
    var inputOffset, offsetLeft, offsetTop, wrapperOffset;
    inputOffset = this.input.el.offset();
    wrapperOffset = this.popover.el.offsetParent().offset();
    offsetTop = inputOffset.top - wrapperOffset.top;
    offsetLeft = inputOffset.left - wrapperOffset.left;
    return this.popover.setPosition({
      top: offsetTop + this.input.el.outerHeight() + this.opts.popoverOffset,
      left: offsetLeft
    });
  };

  QingDatepicker.prototype.setDate = function(date) {
    if (moment.isMoment(date) && date.isValid() && !date.isSame(this.date)) {
      this.input.setValue(date.format(this.opts.displayFormat));
      this.el.val(date.format(this.opts.format));
      this.date = date;
      this.trigger('change', [this.date.clone()]);
    }
    return this;
  };

  QingDatepicker.prototype.getDate = function() {
    return this.date;
  };

  QingDatepicker.prototype.setValue = function(value) {
    var date;
    if (value) {
      date = moment(date, this.opts.format);
      this.setDate(date);
    } else {
      this.input.setValue('');
      this.el.val('');
      this.date = null;
      this.trigger('change', [this.date]);
    }
    return this;
  };

  QingDatepicker.prototype.getValue = function() {
    return this.el.val();
  };

  QingDatepicker.prototype.disable = function() {
    this.el.prop('disabled', true);
    return this.input.setDisabled(true);
  };

  QingDatepicker.prototype.enable = function() {
    this.el.prop('disabled', false);
    return this.input.setDisabled(false);
  };

  QingDatepicker.prototype.destroy = function() {
    this.popover.destroy();
    this.el.insertAfter(this.wrapper).show().removeData('qingDatepicker');
    this.wrapper.remove();
    return $(document).off(".qing-datepicker-" + this.id);
  };

  return QingDatepicker;

})(QingModule);

module.exports = QingDatepicker;

},{"./input.coffee":1,"./popover.coffee":2}]},{},[]);

return b('qing-datepicker');
}));
