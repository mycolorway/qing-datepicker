
class Input extends QingModule

  @opts:
    wrapper: null
    placeholder: ''

  constructor: (opts) ->
    super
    @opts = $.extend {}, Input.opts, @opts

    @wrapper = $ @opts.wrapper
    @active = false
    @_render()
    @_bind()

  _render: ->
    @el = $ '<div class="input">'
    @textField = $ '<input type="text" class="text-field" readonly>'
      .attr 'placeholder', @opts.placeholder
      .appendTo @el
    @el.appendTo @wrapper

  _bind: ->
    @textField.on 'click', (e) =>
      return if @disabled
      @trigger 'click'

    @textField.on 'input', (e) =>
      if @_inputTimer
        clearTimeout @_inputTimer
        @_inputTimer = null

      @_inputTimer = setTimeout =>
        @trigger 'change', [@textField.val()]
      , 400

    @textField.on 'keydown', (e) =>
      return if @disabled
      if e.which in [13, 38, 40]
        @trigger 'click'

  setValue: (value) ->
    @textField.val value
    value

  getValue: ->
    @textField.val()

  setActive: (active) ->
    @active = active
    @textField.toggleClass 'active', active
    @active

  setDisabled: (disabled) ->
    return if disabled == @disabled
    @el.toggleClass 'disabled', disabled
    @textField.prop 'disabled', disabled
    @disabled = disabled

  destroy: ->
    @el.remove()

module.exports = Input
