'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let sandbox = null
let MetricStub = null
let db = null

let uuid = 'yyy-yyy-yyy'
let newMetric = {
  type: 'segundos',
  value: '1000'
}

let config = {
  logging: function () {}
}

let AgentStub = {
  hasMany: sinon.spy()
}
test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  MetricStub = {
    belongsTo: sandbox.spy()
  }

  MetricStub.create = sandbox.stub()
  MetricStub.create.withArgs(uuid, newMetric).returns(Promise.resolve({
    toJSON () { return newMetric }
  }))

  MetricStub.findByAgentUuid = sandbox.stub()
  MetricStub.findByAgentUuid.withArgs(uuid).returns(Promise.resolve({
    
  }))

  const setupDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test('pass', t => {
  t.pass()
})

test('Metric', t => {
  t.truthy(db.Metric, 'Metric must exist!')
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the Metricmodel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the Agentmodel')
})
