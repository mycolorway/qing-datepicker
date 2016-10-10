class SelectView extends QingModule

  @opts:
    wrapper: null

  _setOptions: (opts) ->
    super
    $.extend @opts, SelectView.opts, opts

  _init: ->
    @wrapper = $ @opts.wrapper
    @active = false

    @_render()
    @_bind()

  _render: ->
    @el = $("""
      <div class="select-view">
        <div class="top-bar">
          <a href="javascript:;" class="link-prev">&lt;</a>
          <span class="title">
          </span>
          <a href="javascript:;" class="link-next">&gt;</a>
        </div>
        <div class="select-grid"></div>
      </div>
    """).appendTo @wrapper

    @grid = @el.find '.select-grid'
    @el

  _renderGrid: ->
    # to be implemented

  _bind: ->

  setActive: (active) ->
    @active = active
    @el.toggleClass 'active', active
    @active

module.exports = SelectView
