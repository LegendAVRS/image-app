// react
import { useState } from "react";

// firestore

// functions
import { deleteImageFromStorage } from "../functions/deleteImageFromStorage";
import { deletePostFromDatabase } from "../functions/deletePostFromDatabase";

// global var
import { realImgFolderName, thumbImgFolderName } from "../global/globalVar";

// type
import { PostData } from "../interface/PostData";

// utils
import ReactModal from "react-modal";

interface ImageCardProps {
  data: PostData;
  setPostDataList: Function;
}

const PostCard = ({ data, setPostDataList }: ImageCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deletePost = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await deletePostFromDatabase(data.id);
      await deleteImageFromStorage(realImgFolderName, data.imgFileName);
      await deleteImageFromStorage(thumbImgFolderName, data.imgFileName);
      setPostDataList((old: PostData[]) =>
        old.filter((post) => post.id != data.id)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const openPost = () => {
    setModalIsOpen(true);
  };

  const closePost = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div
        className="flex flex-col gap-y-1 hover:brightness-50 hover:cursor-pointer relative mb-4"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={openPost}
      >
        <img
          src={data.thumbImgUrl}
          alt=""
          className=" max-w-full object-cover rounded-xl"
        />

        {/* <div className="font-bold">{postName}</div> */}
        {isHover && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            onClick={(e) => deletePost(e)}
            className="hover:cursor-pointer  h-4 absolute right-4 top-4"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        )}
      </div>
      <ReactModal
        className="relative"
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closePost}
        preventScroll={true}
        shouldReturnFocusAfterClose={false}
        ariaHideApp={false}
      >
        <img
          src={data.realImgUrl}
          className=" h-auto max-h-screen absolute inset-0 object-contain mx-auto"
          alt=""
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
          onClick={closePost}
          className="hover:cursor-pointer  h-4 absolute right-4 top-4"
        >
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </ReactModal>
    </div>
  );
};

export default PostCard;
