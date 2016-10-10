
class Input extends QingModule

  @opts:
    wrapper: null
    placeholder: ''

  _setOptions: (opts) ->
    super
    $.extend @opts, Input.opts, opts

  _init: ->
    @wrapper = $ @opts.wrapper
    @active = false
    @empty = true
    @_render()
    @_bind()

  _render: ->
    @el = $ '<div class="input empty">'
    @textField = $ '<input type="text" class="text-field" readonly>'
      .attr 'placeholder', @opts.placeholder
      .appendTo @el
    @linkClear = $('''
      <a class="link-clear" href="javascript:;" tabindex="-1">
        &#10005;
      </a>
    ''').appendTo @el
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

    @linkClear.on 'click', (e) =>
      @trigger 'clearClick'
      false

  setValue: (value) ->
    @textField.val value
    @setEmpty !value
    value

  getValue: ->
    @textField.val()

  setActive: (active) ->
    @active = active
    @textField.toggleClass 'active', active
    @active

  setEmpty: (empty) ->
    @empty = empty
    @el.toggleClass 'empty', empty
    @empty

  setDisabled: (disabled) ->
    return if disabled == @disabled
    @el.toggleClass 'disabled', disabled
    @textField.prop 'disabled', disabled
    @disabled = disabled

  destroy: ->
    @el.remove()

module.exports = Input
