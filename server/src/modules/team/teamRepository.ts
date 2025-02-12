import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type TeamI from "../../types/team";

class TeamRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM team");
    return rows;
  }

  async create(team: TeamI) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO team (nb_team, name_team, lead_team, user_id, project_id) VALUES (?, ?, ?, ?, ?)",
      [
        team.nb_team,
        team.name_team,
        team.lead_team,
        team.user_id,
        team.project_id,
      ],
    );

    return result.insertId;
  }

  async update(team: TeamI) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE team SET nb_team = ?, name_team = ?, lead_team = ?, user_id =?, project_id = ? WHERE id = ? ",
      [
        team.nb_team,
        team.name_team,
        team.lead_team,
        team.user_id,
        team.project_id,
      ],
    );

    return result.affectedRows;
  }

  async destroy(id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM team WHERE id = ? ",
      [id],
    );

    return result.affectedRows;
  }
}

export default new TeamRepository();
