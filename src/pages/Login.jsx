import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { object, string } from "yup";
import { auth, db } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginSchema = object({
    email: string()
      .email("must be a valid email")
      .required("email is required!"),
    password: string()
      .min(4, "must be at least 3 characters long")
      .max("8", "must be smaller than 8 characters long")
      .required("password is required!"),
  });

  const loginHandler = async () => {
    try {
      const userData = await loginSchema.validate({ email, password });
      console.log(userData);
      const { user } = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => localStorage.setItem("id", doc.id));
      navigate("/");
      resetFormHandler();
    } catch (err) {
      console.log(err.message);
      if (err.path === "email") setEmailError(err.message);
      else if (err.path === "password") setPasswordError(err.message);
      else setError(err.message);
    }
  };

  const resetFormHandler = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setError("");
  };

  return (
    <div className="h-screen bg-black flex text-white">
      <div className="h-[80%] w-[50%] m-auto flex flex-col items-center justify-center border rounded-md">
        <h1 className="text-3xl underline">
          Log<span className="text-yellow-500">in</span>
        </h1>
        <form className="px-20 mt-5 w-full">
          {error ? <p className="text-red-500 text-center">{error}</p> : ""}
          <div className="my-2">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              placeholder="Please enter your email..."
              className="w-full outline-none bg-inherit border-b"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError ? <p className="text-red-500">{emailError}</p> : ""}
          </div>
          <div className="my-2">
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              id="password"
              placeholder="Please enter your password..."
              className="w-full outline-none bg-inherit border-b"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError ? (
              <p className="text-red-500">{passwordError}</p>
            ) : (
              ""
            )}
          </div>
          <p className="mt-5">
            Don't Have an Account?{" "}
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </p>
          <div className="flex justify-between mt-5">
            <button type="button" className="hover:underline">
              Forget Password?
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetFormHandler}
                className="px-5 py-1 border-b border-yellow-500 bg-yellow-500 text-xl text-black hover:bg-inherit transition-all hover:text-white"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={loginHandler}
                className="px-5 py-1 border-b border-yellow-500 text-xl hover:bg-yellow-500 transition-all hover:text-black"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
