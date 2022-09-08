import { Sequelize } from 'sequelize';

const db = process.env.DB as string;
const db_user = process.env.DB_USER as string;
const db_password = process.env.DB_PASSWORD as string;
const db_host = process.env.DB_HOST as  string

const connection = new Sequelize(db, db_user, db_password, {
  host:db_host ,
  dialect: 'mysql',
  logging:true
});

const start = async (): Promise<void> => {
  try {
    await connection.authenticate();
    if (process.env.NODE_ENV!.trim() === 'dev') {
      await connection.sync({ alter: true });
    }
  } catch (e) {
    console.log(e);
  }
};
start();

export { connection };
