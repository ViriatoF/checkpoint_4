import type { RequestHandler } from "express";

import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await userRepository.create(req.body);
    console.warn(newUser);

    if (newUser) {
      res.status(201).send("Nouvel utilisateur ajouté");
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
    const user = req.body;
    user.id = id;
    const updateUser = await userRepository.update(user);

    if (updateUser) {
      res.status(201).send(`User ${id} has updated!`);
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userDelete = await userRepository.destroy(id);
    if (userDelete) {
      res
        .status(201)
        .send(`L'utilisateur dont l'id est ${id} a bien été supprimé!`);
    } else {
      res.status(401).send("l'utilisateur n'a pas pu être supprimé.");
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, add, edit, deleteUser };
