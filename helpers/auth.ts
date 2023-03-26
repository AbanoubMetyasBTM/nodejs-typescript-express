import * as crypto from "crypto";
import {JwtObject} from "../types";
// @ts-ignore
import jwt from 'jsonwebtoken';

export function hashPassword(password: string):string
{
    return crypto.pbkdf2Sync(password,process.env.PASSWORD_SALT!,42,64,'sha512').toString();
}

export function signJwt(obj: JwtObject):string
{
    return jwt.sign(obj,getJwtSecret(),{
        expiresIn: '15d',
    });
}

function getJwtSecret(){
    const secret = process.env.JWT_SECRET;
    if(!secret){
        console.log("Missing JWT_SECRET");
        process.exit(1);
    }

    return secret;
}

export function verifyJwt(token:string):JwtObject
{

    return jwt.verify(token,getJwtSecret()) as JwtObject;

}