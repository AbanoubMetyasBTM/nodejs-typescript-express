import {Post} from '../../types';

export interface PostDao {
    listPosts(): Promise<Post[]>;

    createPost(post: Post): Promise<string>;

    getPost(id: string): Promise<Post>;

    deletePost(id: string): Promise<void>;
}
