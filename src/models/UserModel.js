import { Sequelize } from "sequelize";
import db from "../config/Database.js";
 
const { DataTypes } = Sequelize;
 
const Users = db.define('users',{
    id:{
        type: DataTypes.STRING,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});
 
(async () => {
    await db.sync();
})();
 
export default Users;