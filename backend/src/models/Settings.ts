import { BuildOptions, DataTypes, Model, Optional } from "sequelize";
import { connection } from "../database";
import { Users } from "./Users";

export interface SettingsAttributes{
  setting_id:number,
  isActive:boolean,
  userId:number,
  transferToUser:number,
}

export interface SettingsCreationAttributes extends Optional<SettingsAttributes, "setting_id">{}
export interface SettingsInstance extends Model<SettingsAttributes,SettingsCreationAttributes>{}
export type SettingsStatic = typeof Model
 & {associate:(models:any)=>void}
 & {new(values?:Record<string, unknown>,options?:BuildOptions):SettingsInstance}


const Settings = <SettingsStatic>connection.define('settings',{
  setting_id:{
    primaryKey:true,
    autoIncrement:true,
    allowNull:false,
    type:DataTypes.INTEGER
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false
  },
  userId:{
    type:DataTypes.INTEGER,
    allowNull:true,
    references:{
      model:Users,
      key:"user_id"
    }
  },
  transferToUser:{
    type:DataTypes.INTEGER,
    allowNull:true
  }
},{
  freezeTableName:true,
  timestamps:false
})
Users.hasOne(Settings,{foreignKey:"userId"})
Settings.belongsTo(Users,{foreignKey:"userId"})

export {
  Settings
}