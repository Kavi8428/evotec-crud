import React from "react";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="relative flex w-[750px] h-[450px] overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Login Section */}
        <div className="absolute top-0 left-0 flex w-1/2 h-full flex-col justify-center p-10 transition-all duration-700 ease-in-out">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Login</h2>
          <form className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className="peer w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-transparent focus:border-black focus:outline-none"
                placeholder="Username"
                id="username"
              />
              <label
                htmlFor="username"
                className="absolute left-3 -top-3 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-800 transition-all"
              >
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                className="peer w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 placeholder-transparent focus:border-black focus:outline-none"
                placeholder="Password"
                id="password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-3 text-sm text-gray-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-800 transition-all"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-black py-2 text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Section */}
        <div className="absolute top-0 right-0 flex w-1/2 h-full flex-col items-center justify-center bg-black text-white p-10">
          <h2 className="mb-4 text-3xl font-bold">WELCOME BACK!</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            rem?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
