import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
import userActions from "./modules/user/userActions";

router.get("/api/users", userActions.browse);
router.post("/api/user/create", userActions.add);
router.put("/api/user/update/:id", userActions.edit);
router.delete("/api/user/delete/:id", userActions.deleteUser);

/*************************************************************************** */
import teamActions from "./modules/team/teamActions";

router.get("/api/teams", teamActions.browse);
router.post("/api/team/create", teamActions.add);
router.put("/api/team/update/:id", teamActions.edit);
router.delete("/api/team/delete/:id", teamActions.deleteTeam);

export default router;
