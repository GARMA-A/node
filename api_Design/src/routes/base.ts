import { Router } from "express";
import { productRoutes } from './product.ts';
import { updateRoutes } from './update.ts';
import { updatePointRoutes } from './updatePoint.ts';
import { userRoutes } from './user.ts';


export const baseRouter = Router();

baseRouter.use("/product", productRoutes)
baseRouter.use("/update", updateRoutes)
baseRouter.use("/updatepoint", updatePointRoutes)
baseRouter.use("/user", userRoutes)
