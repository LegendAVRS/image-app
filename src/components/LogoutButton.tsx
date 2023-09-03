import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

interface LogoutButtonProps {
  setCurrentUser: Function;
}

const LogoutButton = ({ setCurrentUser }: LogoutButtonProps) => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button className="authen-btn" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default LogoutButton;
