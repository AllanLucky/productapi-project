module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("prodct", {  // Keep the table name as "prodct"
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    return Product;
};
