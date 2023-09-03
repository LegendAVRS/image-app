import { useState } from "react";
import ReactModal from "react-modal";
import { compressImage } from "../functions/compressImage";
import { uploadImageToStorage } from "../functions/uploadImageToStorage";
import { uploadPostToDatabase } from "../functions/uploadPostToDatabase";
import { realImgFolderName, thumbImgFolderName } from "../global/globalVar";
import { PostData } from "../interface/PostData";
import UploadButton from "./UploadButton";

ReactModal.defaultStyles.overlay!.backgroundColor = "rgba(0, 0, 0, 0.5)";

interface UploadModalProps {
  setPostDataList: Function;
}

const UploadModal = ({ setPostDataList }: UploadModalProps) => {
  const [selectedImage, setSelectedImage] = useState(null) as any;
  const [selectedFile, setSelectedFile] = useState<File>();
  const [postName, setPostName] = useState("");
  const [postTags, setPostTags] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleImageChange = (e: any) => {
    const file = e.target!.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (postName === "" || postTags === "" || !selectedFile) return;
    let tagList = postTags.split(" ");

    try {
      const thumbImgUploadRes = await uploadImageToStorage(
        await compressImage(selectedFile),
        thumbImgFolderName
      );
      const realImgUploadRes = await uploadImageToStorage(
        selectedFile,
        realImgFolderName,
        thumbImgUploadRes.snapshot?.metadata.name!
      );

      const postUploadRes = await uploadPostToDatabase(
        postName,
        tagList,
        thumbImgUploadRes.imgUrl,
        realImgUploadRes.imgUrl,
        realImgUploadRes.snapshot?.metadata.name!,
        realImgUploadRes.snapshot?.metadata.timeCreated!
      );

      setPostDataList((old: PostData[]) => [
        ...old,
        {
          name: postName,
          tags: tagList,
          thumbImgUrl: thumbImgUploadRes.imgUrl,
          realImgUrl: realImgUploadRes.imgUrl,
          imgFileName: realImgUploadRes.snapshot?.metadata.name!,
          time: realImgUploadRes.snapshot?.metadata.timeCreated,
          id: postUploadRes?.id,
        },
      ]);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <ReactModal
        className="p-8  bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        isOpen={modalIsOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        shouldCloseOnEsc={true}
        preventScroll={true}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
          onClick={closeModal}
          className=" ml-auto hover:cursor-pointer"
        >
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
        <div className={"flex"}>
          <div className={"w-[300px] h-[300px] pr-4"}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            )}
            {!selectedImage && (
              <img
                src="svg/blank.jpg"
                className="w-full h-full object-cover"
              ></img>
            )}
          </div>
          <div className="flex flex-col justify-evenly flex-grow">
            <div className="flex flex-col">
              <label className="bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer text-center">
                <span>Choose image</span>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                />
              </label>

              <div className="m-auto">
                {selectedFile ? selectedFile.name : "No file chosen"}
              </div>
            </div>

            <label>
              Post name
              <input
                type="text"
                placeholder="Name..."
                className="input-text"
                onChange={(e) => setPostName(e.target.value)}
              />
            </label>
            <label>
              Tags
              <input
                type="text"
                placeholder="tags..."
                className="input-text"
                onChange={(e) => setPostTags(e.target.value)}
              />
            </label>

            <button className="confirm-btn" onClick={handleUpload}>
              Submit
            </button>
          </div>
        </div>
      </ReactModal>
      <UploadButton openModal={openModal}></UploadButton>
    </div>
  );
};

export default UploadModal;
