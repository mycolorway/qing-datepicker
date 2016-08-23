QingDatepicker = require '../src/qing-datepicker'
expect = chai.expect

describe 'QingDatepicker', ->

  $el = null
  qingDatepicker = null

  before ->

  after ->
    $el.remove()
    $el = null

  beforeEach ->
    $el = $('<input type="date" class="date-field">').appendTo 'body'
    qingDatepicker = new QingDatepicker
      el: '.date-field'

  afterEach ->
    qingDatepicker.destroy()
    qingDatepicker = null
    $el.remove()

  it 'should inherit from QingModule', ->
    expect(qingDatepicker).to.be.instanceof QingModule
    expect(qingDatepicker).to.be.instanceof QingDatepicker

  it 'should throw error when element not found', ->
    spy = sinon.spy QingDatepicker
    try
      new spy
        el: '.not-exists'
    catch e

    expect(spy.calledWithNew()).to.be.true
    expect(spy.threw()).to.be.true
