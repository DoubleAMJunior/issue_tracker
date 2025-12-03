
import { Sequelize, DataTypes, Model } from "sequelize";

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "issues.db",
    logging: false
});

export class IssueModel extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: boolean;
}

IssueModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Issue",
    tableName: "issues",
    timestamps: false
});
export const initDB = async () => {
    await sequelize.sync();
};
