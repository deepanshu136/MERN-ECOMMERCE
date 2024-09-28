import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded-sm">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="login icon" />
          </div>

          <form className="pt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-2 rounded-full">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
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
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer tex-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:text-blue-500"
              >
                Forgot Password
              </Link>
            </div>

            {/* Centering the button */}
            <div className="flex justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-95 transition-all mt-6">
                Login
              </button>
            </div>
          </form>
          <p className="my-5 ">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-blue-800    hover:text-blue-400 "
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
