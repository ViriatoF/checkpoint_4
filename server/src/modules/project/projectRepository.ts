import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type ProjectI from "../../types/project";

class ProjectRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM project");

    return rows;
  }

  async create(project: ProjectI) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO project (name_project, start_date, end_date) VALUES (?, ?, ?)",
      [project.name_project, project.start_date, project.end_date],
    );

    return result.insertId;
  }

  async update(project: ProjectI) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE project SET name_project = ?, start_date = ?, end_date = ? WHERE id = ?",
      [project.name_project, project.start_date, project.end_date, project.id],
    );
    return result.affectedRows;
  }

  async destroy(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM project WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProjectRepository();
