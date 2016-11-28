SelectView = require './select-view.coffee'

class DateSelect extends SelectView

  _init: ->
    super
    @date = moment().startOf 'day'
    @month = moment().startOf 'month'

  _render: ->
    super
    $("""
      <a href="javascript:;" class="link-year"></a>
      <a href="javascript:;" class="link-month"></a>
    """).appendTo @el.find('.title')
    @el.addClass 'date-select'

  _renderGrid: ->
    @el.find('.link-year').text @month.format('YYYY')
    @el.find('.link-month').text @month.format('MMM')

    @grid.empty()
    @_renderGridHead()
    @_renderGridBody()
    @grid

  _renderGridHead: ->
    $head = $ '<div class="weekdays">'
    $.each moment.weekdaysMin(true), (i, weekdayName) =>
      $ '<span>',
        class: 'weekday'
        text: weekdayName
      .appendTo $head
    @grid.prepend $head

  _renderGridBody: ->
    $body = $ '<div class="days">'
    date = @month.clone().startOf('week')
    endDate = @month.clone().endOf('month').endOf('week')
    while date.isSameOrBefore(endDate)
      $day = $ '<a>',
        href: 'javascript:;'
        class: 'grid-item link-day'
        'data-date': date.format('YYYY-MM-DD')
        text: date.format('D')

      $day.addClass('minor') unless date.clone().startOf('month').isSame(@month)
      $day.addClass('selected') if date.isSame(@date)
      $day.addClass('current') if date.isSame(moment().startOf('day'))

      weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      $day.addClass weekdays[date.day()]
        .appendTo $body
      date.add 1, 'days'

    @grid.append $body
    @grid

  _bind: ->
    super

    @el.on 'click', '.link-prev', (e) =>
      @month.subtract 1, 'months'
      @_renderGrid()

    @el.on 'click', '.link-next', (e) =>
      @month.add 1, 'months'
      @_renderGrid()

    @el.on 'click', '.link-year', (e) =>
      @trigger 'yearClick', [@month.year()]

    @el.on 'click', '.link-month', (e) =>
      @trigger 'monthClick', [@month.clone()]

    @el.on 'click', '.link-day', (e) =>
      $link = $ e.currentTarget
      date = moment $link.data('date')
      @trigger 'select', [date]

  setDate: (date) ->
    return unless moment.isMoment(date) && date.isValid()

    @date = date
    @month = date.clone().startOf 'month'
    @_renderGrid()
    @date

  setMonth: (month) ->
    return unless moment.isMoment(month) && month.isValid()
    @month = month
    @_renderGrid()
    @month

module.exports = DateSelect
