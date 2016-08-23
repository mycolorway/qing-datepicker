SelectView = require './select-view.coffee'

class MonthSelect extends SelectView

  constructor: (opts) ->
    super
    @month = moment().startOf 'month'
    @year = moment().year()

  _render: ->
    super
    $('<a href="javascript:;" class="link-year"></a>')
      .appendTo @el.find('.title')
    @el.addClass 'month-select'

  _renderGrid: ->
    @el.find('.link-year').text @year

    @grid.empty()
    month = moment [@year, 0, 1]
    for i in [0..11]
      month = month.add(1, 'months') if i > 0
      $month = $ '<a>',
        href: 'javascript:;'
        class: 'grid-item link-month'
        'data-month': month.format('YYYY-MM')
        text: month.format('MMM')

      $month.addClass('current') if month.isSame(moment().startOf('month'))
      $month.addClass('selected') if month.isSame(@month)
      $month.appendTo @grid

    @grid

  _bind: ->
    super

    @el.on 'mousedown', '.link-prev', (e) =>
      @year -= 1
      @_renderGrid()

    @el.on 'mousedown', '.link-next', (e) =>
      @year += 1
      @_renderGrid()

    @el.on 'mousedown', '.link-year', (e) =>
      @trigger 'yearClick', [@year]

    @el.on 'mousedown', '.link-month', (e) =>
      $link = $ e.currentTarget
      month = moment $link.data('month')
      @trigger 'select', [month]

  setMonth: (month) ->
    return unless moment.isMoment(month) && month.isValid()

    @month = month
    @year = month.year()
    @_renderGrid()
    @month

  setYear: (year) ->
    @year = year
    @_renderGrid()
    @year

module.exports = MonthSelect
