import {connection} from "../database";
import { BuildOptions, DataTypes, Model, Optional } from "sequelize";
import {ServiceUser} from "./ServiceUser";
import {Service} from "./Service";

export interface UsersAttributes {
  user_id:number,
  login:string,
  password:string,
  terminal:string
}

export interface UsersCreationAttributes
  extends Optional<UsersAttributes, 'user_id'>{}

export interface UsersInstance extends Model<UsersAttributes,UsersCreationAttributes>,UsersAttributes{}

export type UsersStatic = typeof Model
& {associate:(models:any)=>void}
& {new(values?:Record<string, unknown>,options?:BuildOptions):UsersInstance}

const Users = <UsersStatic>connection.define('users',{
  user_id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },
  login: {
    type:DataTypes.STRING,
    allowNull: false
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  terminal:{
    type:DataTypes.STRING,
    allowNull:false
  },
  sendNotice:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  getCurrentTicket:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  cabinet:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
},{
  freezeTableName:true,
  timestamps:false
})

Users.associate=(models:any)=>{
  Users.belongsToMany(models.Service,{through:ServiceUser,as:"users",foreignKey:"users_id"})
}


export {
  Users
}