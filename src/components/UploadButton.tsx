interface UploadButtonProps {
  openModal: Function;
}

const UploadButton = ({ openModal }: UploadButtonProps) => {
  return (
    <button className="confirm-btn" onClick={() => openModal()}>
      Upload post
    </button>
  );
};

export default UploadButton;
