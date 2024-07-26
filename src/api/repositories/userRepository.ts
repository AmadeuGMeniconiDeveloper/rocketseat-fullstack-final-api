import AppError from "../../utils/AppError.js";
import User from "../models/User.js";

export class UserRepository {
  private readonly user = User;

  add = async (user: User["dataValues"]): Promise<void> => {
    await this.user.create(user);
  };

  remove = async (id: User["dataValues"]["id"]): Promise<void> => {
    try {
      await this.user.destroy({ where: { id } });
    } catch (error) {
      console.error(error);
    }
  };

  findByEmail = async (
    email: User["dataValues"]["email"]
  ): Promise<User | null> => {
    const user = await this.user.findOne({ where: { email } });

    return user;
  };

  findById = async (id: User["dataValues"]["id"]): Promise<User | null> => {
    const user = await this.user.findOne({ where: { id } });

    return user;
  };
}
