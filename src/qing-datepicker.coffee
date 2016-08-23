Input = require './input.coffee'
Popover = require './popover.coffee'

class QingDatepicker extends QingModule

  @opts:
    el: null
    placeholder: ''
    format: 'YYYY-MM-DD'
    displayFormat: 'LL'
    inputFormats: [
      'YYYY-M-D'
      'M/D/YY'
      'YYYY年M月D日'
      'YYYY.M.D'
      'YYYY/M/D'
    ]
    prevArrow: '&lt;'
    nextArrow: '&gt;'
    locales:
      selectYear: 'Select Year'

  constructor: (opts) ->
    super

    @el = $ @opts.el
    unless @el.length > 0
      throw new Error 'QingDatepicker: option el is required'

    @opts = $.extend {}, QingDatepicker.opts, @opts
    @inputFormats = @opts.inputFormats
    @locales = @opts.locales || QingDatepicker.locales
    @_render()
    @_initChildComponents()
    @_bind()

    @setDate moment(@el.val(), @opts.format)

  _render: ->
    @wrapper = $ '<div class="qing-datepicker"></div>'
      .data 'qingDatepicker', @
      .insertBefore @el
      .append @el
    @el.hide()
      .data 'qingDatepicker', @

  _initChildComponents: ->
    @input = new Input
      wrapper: @wrapper
      placeholder: @opts.placeholder || @el.attr('placeholder') || ''

    @popover = new Popover
      wrapper: @wrapper
      prevArrow: @opts.prevArrow
      nextArrow: @opts.nextArrow
      locales: @locales

  _bind: ->
    @input.on 'focus', =>
      @popover.setDate @date
      @popover.setActive true

    @input.on 'blur', =>
      @popover.setActive false

    @input.on 'click', =>
      return if @popover.active
      @popover.setDate @date
      @popover.setActive true

    @input.on 'change', (e, value) =>
      date = moment value, @inputFormats, true
      console.log value, date
      if date.isValid()
        @setDate date
        @popover.setDate @date

    @popover.on 'show', (e) =>
      @popover.setPosition
        top: @input.el.outerHeight() + 2

    @popover.on 'select', (e, date) =>
      @setDate date
      @popover.setActive false

  setDate: (date) ->
    if moment.isMoment(date) && date.isValid() && !date.isSame(@date)
      @input.setValue date.format(@opts.displayFormat)
      @el.val date.format(@opts.format)
      @date = date
      @trigger 'change', [@date.clone()]
    date

  getDate: ->
    @date

  destroy: ->
    @el.insertAfter @wrapper
      .show()
      .removeData 'qingDatepicker'
    @wrapper.remove()

module.exports = QingDatepicker
