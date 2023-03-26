import {Post} from "../types";

export interface ListPostsResponse {
    posts: Post[];
}

export interface CreatePostResponse {
    postId: string;
}

export interface getPostResponse {
    post: Post;
}