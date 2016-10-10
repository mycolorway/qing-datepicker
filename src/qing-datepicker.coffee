Input = require './input.coffee'
Popover = require './popover.coffee'

class QingDatepicker extends QingModule

  @name: 'QingDatepicker'

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
    popoverOffset: 6
    popoverAppendTo: 'body'
    locales:
      selectYear: 'Select Year'

  @count: 0

  _setOptions: (opts) ->
    super
    $.extend @opts, QingDatepicker.opts, opts

  _init: ->
    @el = $ @opts.el
    unless @el.length > 0
      throw new Error 'QingDatepicker: option el is required'

    if (initialized = @el.data('qingDatepicker'))
      return initialized

    @inputFormats = @opts.inputFormats
    @locales = @opts.locales || QingDatepicker.locales
    @id = ++ QingDatepicker.count
    @_render()
    @_initChildComponents()
    @_bind()

    if $.isFunction @opts.renderer
      @opts.renderer.call @, @wrapper, @

    if value = @el.val() && (date = moment(value, @opts.format)).isValid()
      @input.setValue date.format(@opts.displayFormat)
      @date = date

    @disable() if @el.prop('disabled')

  _render: ->
    @wrapper = $('<div class="qing-datepicker"></div>')
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
      appendTo: @opts.popoverAppendTo
      locales: @locales

  _bind: ->
    $(document).on "click.qing-datepicker-#{@id}", (e) =>
      return if $.contains(@wrapper[0], e.target) ||
        $.contains(@popover.el[0], e.target)
      @popover.setActive false
      null

    @input.on 'click', =>
      if @popover.active
        @popover.setActive false
        @input.setActive false
      else
        @popover.setDate @date
        @popover.setActive true
        @input.setActive true

    @input.on 'clearClick', =>
      @setValue ''
      @popover.setActive false
      @input.setActive false

    @input.on 'change', (e, value) =>
      date = moment value, @inputFormats, true
      if date.isValid()
        @setDate date
        @popover.setDate @date

    @popover.on 'show', (e) =>
      inputOffset = @input.el.offset()
      wrapperOffset = @popover.el.offsetParent().offset()
      offsetTop = inputOffset.top - wrapperOffset.top
      offsetLeft = inputOffset.left - wrapperOffset.left
      @popover.setPosition
        top: offsetTop + @input.el.outerHeight() + @opts.popoverOffset
        left: offsetLeft

    @popover.on 'select', (e, date) =>
      @setDate date
      @popover.setActive false
      @input.setActive false

    @on 'change', (e) =>
      @el.trigger 'change', [@date]

  setDate: (date) ->
    if moment.isMoment(date) && date.isValid() && !date.isSame(@date)
      @input.setValue date.format(@opts.displayFormat)
      @el.val date.format(@opts.format)
      @date = date
      @trigger 'change', [@date.clone()]
    @

  getDate: ->
    @date

  setValue: (value) ->
    if value
      date = moment(date, @opts.format)
      @setDate date
    else
      @input.setValue ''
      @el.val ''
      @date = null
      @trigger 'change', [@date]
    @

  getValue: ->
    @el.val()

  disable: ->
    @el.prop 'disabled', true
    @input.setDisabled true

  enable: ->
    @el.prop 'disabled', false
    @input.setDisabled false

  destroy: ->
    @el.insertAfter @wrapper
      .show()
      .removeData 'qingDatepicker'
    @wrapper.remove()
    $(document).off ".qing-datepicker-#{@id}"

module.exports = QingDatepicker
