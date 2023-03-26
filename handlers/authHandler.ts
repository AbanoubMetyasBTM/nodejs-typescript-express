import {ExpressHandler, User} from "../types";
import {SignInRequest, SignUpRequest} from "../requests/authRequests";
import {SignUpResponse, SingInResponse} from "../responses/authResponses";
import {UserModelObj} from "../datastore/sql/UserModel";
import {hashPassword, signJwt} from "../helpers/auth";

export const signInHandler: ExpressHandler<SignInRequest, SingInResponse> = async (req, res) => {

    const {login, password} = req.body;
    if (!login || !password) {
        return res.sendStatus(400);
    }

    const checkUserExistence = await UserModelObj.getUserByEmail(login) || await UserModelObj.getUserByUsername(login);
    if (!checkUserExistence || checkUserExistence.password != hashPassword(password)) {
        return res.status(403).send({
            error:"no user"
        });
    }

    const jwt = signJwt({
        userId: checkUserExistence.id
    });

    return res.status(200).send({
        user: {
            email: checkUserExistence.email,
            firstName: checkUserExistence.firstName,
            lastName: checkUserExistence.lastName,
            id: checkUserExistence.id,
            userName: checkUserExistence.userName,
        },
        jwt
    });


};

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res) => {

    const {email, firstName, lastName, password, userName} = req.body;
    if (!email || !firstName || !lastName || !userName || !password) {
        return res.status(400).send({
                error:{
                    "required":{
                        email: '',
                        firstName: '',
                        lastName: '',
                        userName: '',
                        password: '',
                    }
                }
            }
        );
    }

    const existing = (await UserModelObj.getUserByEmail(email)) || (await UserModelObj.getUserByUsername(userName));
    if (existing) {
        return res.status(403).send({error: 'User already exists'});
    }

    let user: User = {
        id: '',
        email,
        firstName,
        lastName,
        userName,
        password: hashPassword(password),
    };

    user.id = await UserModelObj.createUser(user);
    const jwt = signJwt({
        userId: user.id
    });

    return res.send({
        jwt: jwt
    });

};
