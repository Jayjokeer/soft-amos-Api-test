import { db } from "../DB/db";
import { DataTypes, Model, Sequelize } from "sequelize";
import { CustomerAttributes } from "../Interfaces/customerInterface";


export class CustomerInstance extends Model<CustomerAttributes> { }

CustomerInstance.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: "customers",
    }
);
