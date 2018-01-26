'use strict'
const agentFixtures = require('./agent')

const metric = {
  id: 1,
  type: 'ram',
  value: '45%',
  createdAt: new Date(),
  agent: 1
}

const metrics = [
  metric,
  extend(metric, { id: 2, type: 'cpu', value: '10%', agent: 2, createAt: new Date() }),
  extend(metric, { id: 3, type: 'disco', value: '45%', agent: 1, createAt: new Date() }),
  extend(metric, { id: 4, type: 'ram', value: '43%', agent: 2, createAt: new Date() }),
  extend(metric, { id: 5, type: 'cpu', value: '43%', agent: 4, createAt: new Date() }),
  extend(metric, { id: 6, type: 'ram', value: '43%', agent: 3, createAt: new Date() }),
  extend(metric, { id: 7, type: 'disco', value: '43%', agent: 4, createAt: new Date() }),
  extend(metric, { id: 7, type: 'disco', value: '43%', agent: 1, createAt: new Date() })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)

  return Object.assign(clone, values)
}

function findByTypeAgentUuid (uuid) {
  return metrics.filter(m => m.agent === agentFixtures.byUuid(uuid).id)
}

function findByAgentUuid (uuid) {
  const metricsAgent = metrics.filter(m => m.agent === agentFixtures.byUuid(uuid).id)
  const typesMetricsAgent = []

  metricsAgent.forEach(m => {
    var index = typesMetricsAgent.findIndex(e => {
      return e === m.type
    })
    if (index === -1) typesMetricsAgent.push(m.type)
  })
  return typesMetricsAgent
}

module.exports = {
  single: metric,
  all: metrics,
  byTypeAgentUuid: findByTypeAgentUuid,
  byAgentUuid: findByAgentUuid
}
