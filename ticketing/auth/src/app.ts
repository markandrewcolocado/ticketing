import express from 'express';
import 'express-async-errors'; // used to handle errors related to async requests
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/singin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // trust first proxy
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
);

app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

// Adding curly braces so it will be a named export
export { app }