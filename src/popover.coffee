DateSelect = require './select-views/date-select.coffee'
MonthSelect = require './select-views/month-select.coffee'
YearSelect = require './select-views/year-select.coffee'

class Popover extends QingModule

  @opts:
    wrapper: null
    locales: null

  _setOptions: (opts) ->
    super
    $.extend @opts, Popover.opts, opts

  _init: ->
    @wrapper = $ @opts.wrapper
    @active = false
    @_render()

    @dateSelect = new DateSelect
      wrapper: @el

    @monthSelect = new MonthSelect
      wrapper: @el

    @yearSelect = new YearSelect
      wrapper: @el
      locales: @opts.locales

    @_bind()

  _render: ->
    @el = $ '<div class="popover"></div>'
      .appendTo @wrapper

  _bind: ->
    @dateSelect.on 'yearClick', (e, year) =>
      @yearSelect.setYear year
      @setSelectView @yearSelect

    @dateSelect.on 'monthClick', (e, month) =>
      @monthSelect.setMonth month
      @setSelectView @monthSelect

    @dateSelect.on 'select', (e, date) =>
      @date = date
      @trigger 'select', [@date.clone()]

    @monthSelect.on 'yearClick', (e, year) =>
      @yearSelect.setYear year
      @setSelectView @yearSelect

    @monthSelect.on 'select', (e, month) =>
      @date.set
        year: month.year()
        month: month.month()
      @dateSelect.setMonth month
      @setSelectView @dateSelect

    @yearSelect.on 'select', (e, year) =>
      @monthSelect.setYear year
      @date.year year
      @setSelectView @monthSelect

  setSelectView: (selectView) ->
    return if selectView == @selectView
    @selectView.setActive(false) if @selectView
    selectView.setActive true
    @selectView = selectView
    @selectView

  setDate: (date) ->
    @date = moment date
    @dateSelect.setDate @date.clone()
    @setSelectView @dateSelect
    @date

  setActive: (active) ->
    @active = active
    @el.toggleClass 'active', active
    if @active
      @trigger 'show'
    else
      @trigger 'hide'
    @active

  setPosition: (position) ->
    @el.css
      top: position.top
      left: position.left || 0

module.exports = Popover
