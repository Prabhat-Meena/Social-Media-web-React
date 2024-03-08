import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  }else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, tags) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reaction: reactions,
        userId: userId,
        tags: tags,
      },
    });
    console.log(`${userId} ${postTitle} ${postBody} ${reactions} ${tags}`);
  };

  const deletePost = (postId) => {
    // console.log(`delete post ${postId}`)
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostList.Provider
      value={{ postList: postList, addPost: addPost, deletePost: deletePost }}
    >
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi friends i am going to mumbai for my vacation. hope i will enjoy",
    reaction: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "enjoy"],
  },
  {
    id: "2",
    title: "pass ho gye to",
    body: "Hi friends i am going to mumbai for my vacation. hope i will enjoy",
    reaction: 15,
    userId: "user-10",
    tags: ["pass", "exam", "enjoy"],
  },
];

export default PostListProvider;
