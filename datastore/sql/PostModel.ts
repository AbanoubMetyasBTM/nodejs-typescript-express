import {PostDao} from "../dao/PostDao";
import {Post} from "../../types";
import {DatabaseConnection} from "../DatabaseConnection";


export class PostModel implements PostDao {

    async createPost(post: Post): Promise<string> {
        let insertedRow =  await DatabaseConnection.query(
            "INSERT INTO `posts`(`userId`, `title`, `url`) VALUES (?,?,?)",
            [
                post.userId,
                post.title,
                post.url,
            ]
        );

        return insertedRow.insertId;
    }

    async deletePost(id: string): Promise<void> {
        await DatabaseConnection.query(
            "DELETE FROM `posts` WHERE id=?",
            [
                id
            ]
        );
    }

    getPost(id: string): Promise<Post> {
        return DatabaseConnection.getRow(
            "SELECT * FROM `posts` WHERE id=?",
            [
                id
            ]
        );
    }

    listPosts(): Promise<Post[]> {
        return DatabaseConnection.query(
            "SELECT * FROM `posts`"
        );
    }


}

export let postModelObj: PostModel = new PostModel();