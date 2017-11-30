# platziverse-db

### Usage

... js
const setupDataBase = require('platziverse-db')

setupDatabase(config).then(db => {
    const { Agent, Metric } = db
    
}).catch(err => console.error(err))
...