class SelectView extends QingModule

  @opts:
    wrapper: null
    prevArrow: null
    nextArrow: null

  constructor: (opts) ->
    super
    @opts = $.extend {}, SelectView.opts, @opts
    @wrapper = $ @opts.wrapper
    @active = false

    @_render()
    @_bind()

  _render: ->
    @el = $("""
      <div class="select-view">
        <div class="top-bar">
          <a href="javascript:;" class="link-prev">#{@opts.prevArrow}</a>
          <span class="title">
          </span>
          <a href="javascript:;" class="link-next">#{@opts.nextArrow}</a>
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
