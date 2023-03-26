// Post APIs
import {Post} from "../types";


export interface ListPostsRequest{}

export type CreatePostRequest = Pick<Post, 'title'|'url'>;

export interface GetPostRequest {
    postId:string;
}