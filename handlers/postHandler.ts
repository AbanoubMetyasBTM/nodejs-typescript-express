import {CreatePostRequest, ListPostsRequest} from "../requests/postRequests";
import {ExpressHandler, Post} from "../types";
import {CreatePostResponse, ListPostsResponse} from "../responses/postResponses";
import {postModelObj} from "../datastore/sql/PostModel";
import {userObj} from "../middleware/authMiddleware";

export const listPostsHandler: ExpressHandler<ListPostsRequest, ListPostsResponse> = async (
    req,
    res
) => {

    return res.send({
        posts: await postModelObj.listPosts()
    });

}

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
    req,
    res
)=>{

    const {url, title} = req.body;
    if (!url || !title) {
        return res.status(400).send({
                error:{
                    "required":{
                        url: '',
                        title: '',
                    }
                }
            }
        );
    }

    // TODO: validate user exists
    // TODO: get user Id from session
    // TODO: validate title and url are non-empty
    // TODO: validate url is new, otherwise add +1 to existing post


    const post: Post = {
        id:'', //ignored from db
        postedAt:123, //ignored from db
        title: title,
        url: url,
        userId: userObj.id,
    };

    const postId = await postModelObj.createPost(post);

    return res.status(200).send({postId:postId});

}