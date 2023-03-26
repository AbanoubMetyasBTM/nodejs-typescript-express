import {ErrorRequestHandler} from "express";

export const errorHandler:ErrorRequestHandler = (
    err,
    req,
    res,
    next
)=>{

    console.error('uncaught error',err);
    return res.status(500).send("Oops, please try again");

}