import type { RequestHandler } from "express";

import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const items = await userRepository.readAll();

    res.json(items);
  } catch (err) {
    next(err);
  }
};

export default { browse };
