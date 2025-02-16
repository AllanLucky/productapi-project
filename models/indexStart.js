const dbConfig = require('../config/dbConfig')

const {Sequelize, DataTypes} = require('sequelize')

// Set up the Sequelize connection

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('Database connected succefull..')
})
.catch(err =>{

    console.log('Error'+ err)
})


const db ={}

// Store Sequelize and connection instance

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.reviews = require('./reviewModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false})
.then(()=>{
    console.log('yes-re-sync done!')
})


// One to many Relationship

db.products.hasMany(db.reviews,{foreignKey:'product_id', as: 'review'})
db.reviews.belongsTo(db.products, {foreignKey: 'product_id', as:'product'})


module.exports = db

