import { connection } from "../database";
import { DataTypes, Optional, Model, BuildOptions } from "sequelize";
import {ServiceUser} from "./ServiceUser";
import {Users} from "./Users";
import { CabinetType } from "./CabinetType";


export interface ServiceAttributes{
  service_id:number,
  letter:string,
  serviceName:string,
  pointer:number,
  status:boolean,
  start_time:string,
  end_time:string,
  terminalId?:number
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'service_id'>{}
export interface ServiceInstance extends Model<ServiceAttributes,ServiceCreationAttributes>,ServiceAttributes{}

export type ServiceStatic = typeof Model
& {associate:(models:any)=>void}
& {new(values?:Record<string, unknown>,options?:BuildOptions):ServiceInstance}

const Service = <ServiceStatic>connection.define(
  'service',
  {
    service_id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pointer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    typeId:{
      type:DataTypes.INTEGER,
      references: {
          key:'type_id',
          model:CabinetType
      }
    },
    terminalId:{
      type:DataTypes.INTEGER,
      references:{
        key:'terminal_id',
        model:'terminal'
      }
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
Users.belongsToMany(Service,{through:ServiceUser,foreignKey:"user_id"})
Service.belongsToMany(Users,{through:ServiceUser,foreignKey:"service_id"})
Service.belongsTo(CabinetType,{foreignKey:'typeId',constraints:false})
CabinetType.hasOne(Service,{foreignKey:"typeId",as:"type"})

// Tickets.hasMany(Service,{foreignKey:'service_id'})
// Service.belongsTo(Tickets,{foreignKey:"service_id"})

export { Service };
