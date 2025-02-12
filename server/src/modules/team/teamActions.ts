import type { RequestHandler } from "express";
import teamRepository from "./teamRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const teams = await teamRepository.readAll();

    res.json(teams);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newTeam = await teamRepository.create(req.body);
    console.warn(newTeam);

    if (newTeam) {
      res.status(201).send("Nouvelle team ajouté");
    } else {
      res.status(401);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const team = req.body;
    team.id = id;
    const updateTeam = await teamRepository.update(team);

    if (updateTeam) {
      res.status(201).send(`User ${id} has updated!`);
    } else {
      res.status(401);
    }
  } catch (err) {
    next(err);
  }
};

const deleteTeam: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const teamDelete = await teamRepository.destroy(id);
    if (teamDelete) {
      res.status(201).send(`La team dont l'id est ${id} a bien été supprimé!`);
    } else {
      res.status(401).send("La team n'a pas pu être supprimé.");
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit, deleteTeam };
