module.exports = (sequelize, DataTypes) =>{

    const Review = sequelize.define("review", {
        review_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    })

    return Review
}