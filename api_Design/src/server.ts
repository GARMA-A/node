import express from 'express';
import morgan from 'morgan';
import { baseRouter } from './routes/base.route.ts';
import { protect } from './middlewares/auth.midleware.ts';
import { refresh, signIn, signOut, signUp } from './controllers/auth.controller.ts';
import { isUserNotExist } from './middlewares/user.middleware.ts';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.get('/', (_, res) => {
	res.status(200).json({ message: 'Hello World' });
});

app.use("/api", protect, baseRouter);

app.post("/signup", isUserNotExist, signUp);

app.post("/signin", signIn);

app.get("/refresh", protect, refresh);

app.get("/signout", signOut);





export { app };






