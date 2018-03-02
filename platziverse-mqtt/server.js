'use strict'

const debug = require('debug')('platziverse:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const chalk = require('chalk')
const db = require('platziverse-db')

const { parsePayload } = require('./utils')

const config = {
  database: process.env.DB_NAME || 'platziverse',
  username: process.env.DB_USER || 'platzi',
  password: process.env.DB_PASS || '12345',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: s => debug(s)
}

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const server = new mosca.Server(settings)
const clients = new Map()

<<<<<<< HEAD
=======
let Agent, Metric

>>>>>>> 0e66a22e2039dbc46c41866b42e3b7d028810592
server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
  clients.set(client.id, null)
})

server.on('clientDisconnected', client => {
  debug(`Client Disconnected: ${client.id}`)
})

server.on('published', async (packet, client) => {
  debug(`Received: ${packet.topic}`)

  switch (packet.topic) {
    case 'agent/connected':
    case 'agent/disconnected':
      debug(`Payload: ${packet.payload}`)
      break
    case 'agent/message':
      debug(`Payload: ${packet.payload}`)
      const payload = parsePayload(packet.payload)

      if (payload) {
        payload.agent.connected = true

        let agent
        try {
          agent = await Agent.createOrUpdate(payload.agent)
        } catch (e) {
          return handleError(e)
        }
        debug(`Agent ${agent.uuid} saved`)

        // Notify Agent is connected
        if (!clients.get(client.id)) {
          clients.set(client.id, agent)
          server.publish({
            topic: 'agent/connected',
            payload: JSON.stringify({
              agent: {
                uuid: agent.uuid,
                name: agent.name,
                hostname: agent.hostname,
                pid: agent.pid,
                connected: agent.connected
              }
            })
          })
        }
      }
      break
  }
})

<<<<<<< HEAD
server.on('ready', () => {
=======
server.on('ready', async () => {
  const services = await db(config).catch(handleFatalError)

  Agent = services.Agent
  Metric = services.Metric

>>>>>>> 0e66a22e2039dbc46c41866b42e3b7d028810592
  console.log(`${chalk.green('[platziverse-mqtt]')} server is running`)
})

server.on('error', handleFatalError)

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function handleError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
}

process.on('uncaughtException', handleFatalError)
<<<<<<< HEAD
process.on('unhandledRejection', handleFatalError)
=======
process.on('unhandledRejection', handleFatalError)
>>>>>>> 0e66a22e2039dbc46c41866b42e3b7d028810592
