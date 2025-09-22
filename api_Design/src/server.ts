import express from 'express';
import morgan from 'morgan';
import { baseRouter } from './routes/base.ts';
import { protect } from './modules/auth.ts';
import { signIn, createUser } from './handlers/user.ts';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get('/', (_, res) => {
	res.status(200).json({ message: 'Hello World' });
});

app.use("/api", protect, baseRouter);

app.post("/user", createUser);

app.post("/signin", signIn);





export { app };






