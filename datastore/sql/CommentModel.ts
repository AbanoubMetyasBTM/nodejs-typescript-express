import {CommentDao} from "../dao/CommentDao";
import {Comment} from "../../types";

export class CommentModel implements CommentDao {

    createComment(comment: Comment): Promise<void> {
        return Promise.resolve(undefined);
    }

    deleteComment(id: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve([]);
    }

}