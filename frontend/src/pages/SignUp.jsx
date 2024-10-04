import React from "react";
import { Link, useNavigate } from "react-router-dom";
import loginIcon from "../assest/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import imageToBase64 from "../helpers/imaetobase64";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match"); // Use toast for error
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.username,
          profilePic: data.profilePic,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Signup successful"); // Use toast for success
        setData({
          email: "",
          password: "",
          username: "",
          confirmPassword: "",
          profilePic: "",
        });
        navigate("/login");
      } else {
        throw new Error(result.message || "Signup Failed");
      }
    } catch (err) {
      toast.error("Error signing up: " + err.message); // Show error toast
      console.error("Error signing up:", err);
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-sm">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-5 pt-3 cursor-pointer text-center absolute bottom-0 w-full">
                  upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Username:</label>
              <div className="bg-slate-200 p-2 rounded-full">
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={data.username}
                  onChange={handleOnChange}
                  className=" w-full h-full outline-none bg-transparent "
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-2 rounded-full">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className=" w-full h-full outline-none bg-transparent "
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-200 p-2 flex rounded-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  onChange={handleOnChange}
                  value={data.password}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer tex-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              {/* <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:text-blue-500"
              >
                Forgot Password
              </Link> */}
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-200 p-2 flex rounded-full">
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer tex-xl"
                  onClick={() => setConfirmPassword((prev) => !prev)}
                >
                  <span>{confirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            {/* Centering the button */}
            <div className="flex justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-95 transition-all mt-6">
                Sign Up
              </button>
            </div>
          </form>
          <p className="my-5 ">
            Already have a account ?{" "}
            <Link
              to={"/login"}
              className=" text-blue-800    hover:text-blue-400 "
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
