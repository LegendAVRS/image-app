// type
import { PostData } from "../interface/PostData";

// comps
import PostCard from "./PostCard";

interface ImageContainerProps {
  postDataList: PostData[];
  setPostDataList: Function;
  enabledTagList: string[];
}

const PostContainer = ({
  postDataList,
  setPostDataList,
  enabledTagList,
}: ImageContainerProps) => {
  return (
    // grid grid-cols-3 justify-items-center gap-4
    <div className="">
      <h2 className="h2-label">Illustrations</h2>
      <div className="img-container-grid lg:columns-4 md:columns-3 sm:columns-2">
        {postDataList?.map((postData) => {
          if (
            postData.tags.some((tag) => enabledTagList.includes(tag)) ||
            postData.name
              .split(" ")
              .some((token) => enabledTagList.includes(token))
          )
            return (
              <PostCard
                key={postData.id}
                data={postData}
                setPostDataList={setPostDataList}
              ></PostCard>
            );
          return null;
        })}
      </div>
    </div>
  );
};

export default PostContainer;
