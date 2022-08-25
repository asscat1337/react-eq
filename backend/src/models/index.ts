import fs from 'fs'
import path from 'path'
import {connection} from "../database";
import Sequelize from "sequelize";

const basename = path.basename(__filename)
const db:IDB = {}

interface IDB{
  [key:string]:any
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname,file))(connection,Sequelize.DataTypes)
    db[model.name] = model

  });

Object.keys(db).forEach((modelName)=>{
  if(db[modelName].associate){
    db[modelName].associate(db)
  }
})

db.sequelize = connection
db.Sequelize = Sequelize


export {
  db
}
