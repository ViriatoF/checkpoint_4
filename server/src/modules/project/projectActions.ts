import type { RequestHandler } from "express";
import projectRepository from "./projectRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectRepository.readAll();

    if (projects) {
      res.json(projects);
    } else {
      res.status(401);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newProject = await projectRepository.create(req.body);

    if (newProject) {
      res.status(201).send(`New project ${req.body.name_project} added!`);
    } else {
      res.status(401).send("No new project added. Sorry my dear!");
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const project = req.body;
    project.id = id;
    const editProject = await projectRepository.update(project);
    if (editProject) {
      res.status(201).send(`Update data in ${req.body.name_project} is done!`);
    } else {
      res.status(401).send("No data updated...");
    }
  } catch (err) {
    next(err);
  }
};

const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedProject = await projectRepository.destroy(id);
    if (deletedProject) {
      res.status(201);
    } else {
      res
        .status(401)
        .send(
          `The project where name is ${req.body.name_project} hasn't deleted.`,
        );
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit, deleteProject };
