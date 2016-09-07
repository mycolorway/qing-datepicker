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
    renderer: null
    locales:
      selectYear: 'Select Year'

  @count: 0

  constructor: (opts) ->
    super

    @el = $ @opts.el
    unless @el.length > 0
      throw new Error 'QingDatepicker: option el is required'

    @opts = $.extend {}, QingDatepicker.opts, @opts
    @inputFormats = @opts.inputFormats
    @locales = @opts.locales || QingDatepicker.locales
    @id = ++ QingDatepicker.count
    @_render()
    @_initChildComponents()
    @_bind()

    if $.isFunction @opts.renderer
      @opts.renderer.call @, @wrapper, @

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
      locales: @locales

  _bind: ->
    $(document).on "click.qing-datepicker-#{@id}", (e) =>
      return if $.contains @wrapper[0], e.target
      @popover.setActive false

    @input.on 'click', =>
      if @popover.active
        @popover.setActive false
        @input.setActive false
      else
        @popover.setDate @date
        @popover.setActive true
        @input.setActive true

    @input.on 'change', (e, value) =>
      date = moment value, @inputFormats, true
      if date.isValid()
        @setDate date
        @popover.setDate @date

    @popover.on 'show', (e) =>
      @popover.setPosition
        top: @input.el.outerHeight() + 2

    @popover.on 'select', (e, date) =>
      @setDate date
      @popover.setActive false
      @input.setActive false

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
    $(document).off ".qing-datepicker-#{@id}"

module.exports = QingDatepicker
