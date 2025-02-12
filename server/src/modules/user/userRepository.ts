import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type UserI from "../../types/user";

class UserRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows;
  }

  async create(user: UserI) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, phone, email, matricule, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.phone,
        user.email,
        user.matricule,
        user.role,
        user.password,
      ],
    );

    return result.insertId;
  }

  async update(user: UserI) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE user SET firstname = ?, lastname = ?, phone = ?, email =?, matricule = ?, role = ?, password = ? WHERE id = ? ",
      [
        user.firstname,
        user.lastname,
        user.phone,
        user.email,
        user.matricule,
        user.role,
        user.password,
        user.id,
      ],
    );

    return result.affectedRows;
  }

  async destroy(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM user WHERE id = ? ",
      [id],
    );

    return result.affectedRows;
  }
}

export default new UserRepository();
