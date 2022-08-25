import { connection } from "../database";
import { BuildOptions, DataTypes, Model, Optional } from "sequelize";
import {Service} from "./Service";


export interface TerminalAttributes{
  terminal_id:number,
  name:string,
  description:string,
  org_name:string,
  isActive:boolean,
}

export interface TerminalCreationAttributes extends Optional<TerminalAttributes, 'terminal_id'>{}
export interface TerminalInstance extends Model<TerminalAttributes,TerminalCreationAttributes>,TerminalAttributes{}

export type TerminalStatic = typeof Model
  & {associate:(models:any)=>void}
  & {new(values?:Record<string, unknown>,options?:BuildOptions):TerminalInstance}

const Terminal = <TerminalStatic>connection.define('terminal',{
  terminal_id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER,
    allowNull:false
  },
  name:{
    type:DataTypes.STRING,
    allowNull: false
  },
  description:{
    type:DataTypes.STRING,
    allowNull:false
  },
  org_name:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:'ГБУЗ РБ ГКБ №13 г.Уфа'
  },
  isActive:{
    type:DataTypes.BOOLEAN,
    allowNull:false
  }
},{
  timestamps:false,
  freezeTableName:true
})

Terminal.hasMany(Service,{foreignKey:"terminalId",as:'service'})
Service.belongsTo(Terminal,{foreignKey:"terminalId"})

// Terminal.associate=(model:any)=>{
//    model.terminal.hasMany(model.service,{as:'service',sourceKey:'service_id',constraints:false})
// }

export {
  Terminal
}