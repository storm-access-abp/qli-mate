import { Router } from "express";
import controller from "../controllers/HydrosController";

const routes = Router();

routes.get('/', controller.list);

export default routes;