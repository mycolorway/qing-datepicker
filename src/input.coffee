
class Input extends QingModule

  @opts:
    wrapper: null
    placeholder: ''

  constructor: (opts) ->
    super
    @opts = $.extend {}, Input.opts, @opts

    @wrapper = $ @opts.wrapper
    @focused = false
    @_render()
    @_bind()

  _render: ->
    @el = $ '<input type="text" class="text-field">'
      .attr 'placeholder', @opts.placeholder
      .appendTo @wrapper

  _bind: ->
    @el.on 'focus', (e) =>
      @focused = true
      @trigger 'focus'

    @el.on 'blur', (e) =>
      @focused = false
      @trigger 'blur'

    @el.on 'click', (e) =>
      @trigger 'click'

    @el.on 'input', (e) =>
      if @_inputTimer
        clearTimeout @_inputTimer
        @_inputTimer = null

      @_inputTimer = setTimeout =>
        @trigger 'change', [@el.val()]
      , 400

  setValue: (value) ->
    @el.val value
    value

  getValue: ->
    @el.val()

  destroy: ->
    @el.remove()

module.exports = Input
