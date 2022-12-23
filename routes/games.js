import express from "express";
const router  = express();
import {playGames} from "../controllers/games.js";
import  { authenticateUser, authorizeRoles } from "../middlewares/auth.js";

router.get('/', playGames);





export default router;