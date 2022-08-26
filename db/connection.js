const mongos = require('mongoose')
const colors = require('colors')

const dbConn = async () => {
    await mongos.connect('mongodb+srv://ad1m:ad1m33n@cluster0.tyntv.mongodb.net/anderson-system')
        .then(() => console.log(`${colors.green('Database >')} Successfuly connected.`))
        .catch(console.error)
}

module.exports = dbConn