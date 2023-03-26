import {LikeDao} from "../dao/LikeDao";
import {Like} from "../../types";

export class LikeModel implements LikeDao {

    createLike(like: Like): Promise<void> {
        return Promise.resolve(undefined);
    }

}