import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" onClick={()=>deletePost(post.id)}>

            <MdDeleteForever />

            <span className="visually-hidden">unread messages</span>
          </span>
        </h5>

        <p className="card-text">{post.body}</p>
        {post.tags.map((tag, i) => (
          <span className="badge text-bg-primary hashtag" key={i}>
            {tag}
          </span>
        ))}
        {/* <a href="#" className="btn btn-primary">
          Go somewhere
        </a> */}
        <div className="alert alert-success reaction" role="alert">
          This post is reacted by {post.reaction}
        </div>
      </div>
    </div>
  );
};

export default Post;
