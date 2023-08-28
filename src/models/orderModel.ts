import { db } from "../DB/db";
import { DataTypes, Model, Sequelize } from "sequelize";
import { CustomerInstance } from "./customerModel";
import { OrderAttributes } from "../Interfaces/orderInterface";



export class OrderInstance extends Model<OrderAttributes> { }

OrderInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        orderNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "customers",
                key: "id",
            },
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

    },
    {
        sequelize: db,
        tableName: "orders",
    }
);
CustomerInstance.hasMany(OrderInstance, {
    foreignKey: "customerId",
    as: "orders",
});
OrderInstance.belongsTo(CustomerInstance, {
    foreignKey: "customerId",
    as: "customer",
});






