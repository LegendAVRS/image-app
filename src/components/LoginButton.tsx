import { signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../config/firebase";

interface LoginButtonProps {
  setCurrentUser: Function;
}

const LoginButton = ({ setCurrentUser }: LoginButtonProps) => {
  const loginGoogle = async () => {
    try {
      return await signInWithPopup(auth, googleAuth);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginGoogle();
      setCurrentUser(res?.user);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button className="authen-btn" onClick={handleLogin}>
      Sign in
    </button>
  );
};

export default LoginButton;
