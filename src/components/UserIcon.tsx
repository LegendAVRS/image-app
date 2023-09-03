import { User } from "firebase/auth";

interface UserIconProps {
  currentUser: User;
}
const UserIcon = ({ currentUser }: UserIconProps) => {
  console.log(currentUser, currentUser.photoURL, currentUser.displayName);
  return (
    <img
      src={currentUser.photoURL!}
      alt=""
      className="rounded-full h-3/4 object-cover justify-self-start"
    />
  );
};

export default UserIcon;
