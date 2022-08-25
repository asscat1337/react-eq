import * as bcrypt from "bcrypt";
import { Users } from "../../models/Users";
import { Service } from "../../models/Service";
import { User } from "./user.interface";
import { UserDto } from "../../dtos/user.dto";
import { generateTokens, verifyRefreshToken } from "../jwt/jwt.service";
import { Settings } from "../../models/Settings";


const create = async (data: User) => {
  const { login, password, terminal } = data;
  const hashPassword = await bcrypt.hash(password, 3);

  const findUser = await Users.findOne({
    where: {
      login
    }
  });
  const decodePassword = await bcrypt.compare(password, findUser!.password);
  if (findUser && decodePassword) {
    throw new Error("такой пользователь уже есть!");
  }

  const newUser = await Users.create({
    login,
    password: hashPassword,
    terminal
  });

  return newUser;
};

const get = async (payload: any,options?:any) => {
  const data = await Users.findAll({
    where: {
      ...payload
    },
    include: [{
      model: Service, as: "services"
    }],
  });
  const userDto = data.map(item => {
    return new UserDto(item);
  });

  return userDto;
};

const loginUser = async (payload: any) => {
  const { login, password,rememberMe} = payload;
  const findUser = await Users.findOne({
    where: {
      login
    },
    raw:true,
    nest:true,
    include:[{
      model:Settings
    }]
  });
  const decodePassword = await bcrypt.compare(password, findUser!.password);


  if (!findUser && !decodePassword) {
    throw new Error("Такого пользователя не существует!");
  }
  if (findUser && !decodePassword) {
    throw new Error("Неверный пароль!");
  }
  const userDto = new UserDto(findUser);
  const tokens = generateTokens({ ...userDto,rememberMe });
  const expired = verifyRefreshToken(tokens.refreshToken);


  return {
    user: {
      ...userDto,
      expired: expired.exp * 1000
    },
    tokens
  };

};

const refresh = async (payload: string) => {
  const validate = verifyRefreshToken(payload);
  if(!validate){
    return {
      valid:false
    }
  }else{
    return {
      valid:true
    }
  }


  // if (!validate) {
  //   throw new Error("Не валидный токен");
  // }
  // const { user_id } = validate;
  // const getUser = await Users.findOne({
  //   where: {
  //     user_id: user_id
  //   }
  // });
  // const userDto = new UserDto(getUser);
  // const tokens = generateTokens({ ...userDto,rememberMe });
  // const expired = verifyRefreshToken(tokens.refreshToken);
  //
  // return {
  //   user: {
  //     ...userDto,
  //     expired: expired.exp * 1000
  //   },
  //   tokens
  // };
};


export {
  create,
  get,
  loginUser,
  refresh
};