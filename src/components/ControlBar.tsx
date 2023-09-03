// react

// firebase
import { User } from "firebase/auth";

// utils

// type

// functions

// global var
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import UploadModal from "./UploadModal";
import UserIcon from "./UserIcon";

interface ControlBarProps {
  setPostDataList: Function;
  currentUser: User | null;
  setCurrentUser: Function;
}

const ControlBar = ({
  setPostDataList,
  currentUser,
  setCurrentUser,
}: ControlBarProps) => {
  return (
    <div className="flex items-center h-16 justify-between px-4">
      {currentUser && <UserIcon currentUser={currentUser}></UserIcon>}
      <div className="flex items-center gap-2">
        <UploadModal setPostDataList={setPostDataList}></UploadModal>
        {!currentUser && (
          <LoginButton setCurrentUser={setCurrentUser}></LoginButton>
        )}
        {currentUser && (
          <LogoutButton setCurrentUser={setCurrentUser}></LogoutButton>
        )}
      </div>
    </div>
  );
};

export default ControlBar;
