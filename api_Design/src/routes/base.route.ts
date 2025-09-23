import { Router } from "express";
import { productRoutes } from './product.route.ts';
import { updateRoutes } from './update.route.ts';
import { updatePointRoutes } from './updatePoint.route.ts';
import { userRoutes } from './user.route.ts';


export const baseRouter = Router();

baseRouter.use("/product", productRoutes)
baseRouter.use("/update", updateRoutes)
baseRouter.use("/updatepoint", updatePointRoutes)
baseRouter.use("/user", userRoutes)
