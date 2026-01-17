import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInWithGoogle({ onLoginSuccess }) {
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in Successfully", {
          position: "top-center",
        });
        
        if (onLoginSuccess) {
          onLoginSuccess({
            name: user.displayName || 'User',
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL
          });
        } else {
          window.location.href = "/profile";
        }
      }
    }).catch((error) => {
      console.error("Google sign-in error:", error);
      toast.error(error.message, {
        position: "bottom-center",
      });
    });
  }
  
  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <FcGoogle style={{ fontSize: "40px" }} />
      </div>
    </div>
  );
}

export default SignInWithGoogle;
