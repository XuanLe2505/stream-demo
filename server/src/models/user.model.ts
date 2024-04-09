import db from "../db";

interface CrudModel<T> {
  getMany: () => Promise<T[]>;
}

interface IUser {
  username: string;
  email: string;
  password: string;
  image?: string;
}

class UserModelInstance implements CrudModel<IUser> {
  db;
  static instance: UserModelInstance;
  constructor() {
    this.db = db;
  }

  // design pattern singleton
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserModelInstance();
    }
    return this.instance;
  }

  async getOne(id: string) {
    const SQL_GET_USER_BY_ID = `
			SELECT * FROM users where id = ?
		`;
    const [data]: any = await db.query(SQL_GET_USER_BY_ID, [id])
    return data[0];
  }

  async getMany(): Promise<IUser[]> {
    const SQL_GET_USER_BY_ID = `SELECT * FROM users`;
    const [data]: any = await db.query(SQL_GET_USER_BY_ID);
    return data;
  }

  async createOne({ username, email, password }: any) {
    const SQL_CREATE_NEW_USER = `
    INSERT INTO users(username,email,password) VALUES (?,?,?)
  `;
    const [result]: any = await db.query(SQL_CREATE_NEW_USER, [
      username,
      email,
      password,
    ]);
    const data = await this.getOne(String(result.insertId));
    return data;
  }
}

export const UserModel = UserModelInstance.getInstance();
