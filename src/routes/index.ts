import { Router, Request, Response } from "express";
import hydros from './Hydros';

const routes = Router();
routes.use("/hydros", hydros);

routes.use( (_:any,res:any) => res.json({error:"Requisição desconhecida"}) );

export default routes;
