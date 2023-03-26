import {ExpressHandler, User} from "../types";
import {verifyJwt} from "../helpers/auth";
import {UserModelObj} from "../datastore/sql/UserModel";

export let userObj: User;

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {

    if(!req.headers.authorization){
        return res.status(403).send({
            error: 'auth token is required'
        });
    }

    let token: string[] = req.headers.authorization.split(" ");
    if (!token[1]) {
        return res.status(403).send({
            error: 'auth token is required'
        });
    }

    try {
        const payload = verifyJwt(token[1]);
        userObj = await UserModelObj.getUserById(payload.userId);

        if (!userObj) {
            throw "not found";
        }

        res.locals.userId = payload.userId;
        next();
    } catch {
        return res.status(403).send({
            error: 'bad token'
        });
    }


};
