import { DataTypes, Optional,Model } from "sequelize";
import {connection} from "../database";
import { Tickets } from "./Tickets";


export interface ServiceUserAttribute{
  serviceUser_id:number,
  service_id:number,
  user_id:number
}

export interface ServiceCreationAttributes extends Optional<ServiceUserAttribute, 'serviceUser_id'>{}
export interface ServiceUserInstance extends  Model<ServiceUserAttribute,ServiceCreationAttributes>,ServiceUserAttribute{}




const ServiceUser = connection.define<ServiceUserInstance>('services_user',{
  serviceUser_id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  service_id:{
    type:DataTypes.INTEGER,
    allowNull: false
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
},{
  freezeTableName:true,
  timestamps:false
})

export {
  ServiceUser
}