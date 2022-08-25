import { BuildOptions, DataTypes, Model, Optional,Includeable } from "sequelize";
import {connection} from "../database";
import {ServiceUser} from "./ServiceUser";
import { Service } from "./Service";


export interface TicketAttribute {
  ticket_id:number,
  date:string,
  time:string,
  ticket:string,
  isCall:boolean,
  isComplete:boolean,
  cabinet:number,
  serviceName:string,
  service_id:number
}
export interface TicketCreationAttributes extends Optional<TicketAttribute, "ticket_id">{}
export interface TicketInstance extends Model<TicketAttribute,TicketCreationAttributes>,TicketAttribute{}

export type TicketStatic = typeof Model
& {associate:(model:any)=>void}
& {new (values?:Record<any, any>,options?:BuildOptions):TicketInstance}


const Tickets = <TicketStatic>connection.define('tickets',{
  ticket_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
  },
  date:{
    type:DataTypes.DATEONLY,
    allowNull: false
  },
  time:{
    type:DataTypes.TIME,
    allowNull:false
  },
  ticket:{
    type:DataTypes.STRING,
    allowNull:false
  },
  isCall:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  isComplete:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:false
  },
  cabinet:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 1
  },
  serviceName:{
    type:DataTypes.STRING,
    allowNull:false,
    defaultValue:""
  },
  service_id:{
    type:DataTypes.INTEGER,
    references:{
      model:"service",
      key:"service_id"
    },
    allowNull:false
  },
  notice:{
    type:DataTypes.STRING,
    allowNull:true
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:0
  }
},{
  freezeTableName:false,
  timestamps:false
})

Service.hasMany(Tickets,{foreignKey:'service_id',})
Tickets.belongsTo(Service,{foreignKey:"service_id"})

export {
  Tickets
}