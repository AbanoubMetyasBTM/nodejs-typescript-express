import {createPostHandler, listPostsHandler} from "./handlers/postHandler";

const dotEnv = require('dotenv');
import {DatabaseConnection} from "./datastore/DatabaseConnection";

// @ts-ignore
import express from 'express';

// @ts-ignore
import asyncHandler from 'express-async-handler';
import {signInHandler, signUpHandler} from "./handlers/authHandler";
import {authMiddleware} from "./middleware/authMiddleware";
import {requestLoggerMiddleware} from "./middleware/loggerMiddleware";
import {errorHandler} from "./middleware/errorMiddleware";

(async () => {

    dotEnv.config();
    await DatabaseConnection.initializeConnection();

    const app = express();

    app.use(express.json());
    app.use(requestLoggerMiddleware);


    app.get('/',(req,res)=>{
        res.send("hello");
    });

    app.post('/v1/sign-in',asyncHandler(signInHandler));
    app.post('/v1/sign-up',asyncHandler(signUpHandler));

    app.use(authMiddleware);

    app.get('/v1/posts', asyncHandler(listPostsHandler));
    app.post('/v1/post', asyncHandler(createPostHandler));


    app.use(errorHandler);
    app.listen(process.env.PORT || 3000)

})();