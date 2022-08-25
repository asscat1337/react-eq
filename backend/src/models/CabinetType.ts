import {connection} from "../database";
import { DataTypes, Optional, Model, BuildOptions } from "sequelize";



export interface CabinetTypeInterface {
  type_id:number,
  title:string
}

export interface CabinetTypeCreationAttribute extends Optional<any, "type_id">{}
export interface CabinetTypeInstance extends Model<CabinetTypeInterface,CabinetTypeCreationAttribute>,CabinetTypeInterface{}

export type CabinetTypeStatic = typeof Model
&{associate:(model:any)=>void}
&{new (values?:Record<string, unknown>,options?:BuildOptions):CabinetTypeInstance}



const CabinetType = <CabinetTypeStatic>connection.define('typeCabinet',{
  type_id:{
    primaryKey:true,
    allowNull:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  title:{
    allowNull: false,
    type:DataTypes.STRING
  }
},{
  freezeTableName:true,
  timestamps:false
})

export {
  CabinetType
}