import React, { useState } from "react";
import Link from "next/link";
import { MODAL_LOGIN } from "./constants";
import useModalState from "../hooks/useModalState.ts";
import useUserState from "../useUserState";

const SignupForm = ({
  onClose,
  isNotModal,
}: {
  onClose: any;
  isNotModal?: boolean;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const updateActiveModal = useModalState((state) => state.updateActiveModal);
  const signupUser = useUserState((state) => state.signupUser);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await signupUser({ email, password });
      onClose?.();
    } catch (err) {
      setError(String(err));
    }
  };

  const onClickLogin = (event) => {
    if (!isNotModal) {
      event.preventDefault();
      updateActiveModal(MODAL_LOGIN);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <form
        className="bg-white dark:bg-transparent rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={onSubmit}
      >
        <div className="border-b border-gray-600 pb-3 mb-4">
          <h3 className="text-2xl font-bold mb-2">
            Sign up to Yume for more features
          </h3>
          <div className="text-gray-400 text-sm mb-1">
            Already have an account?{" "}
            <Link href="/login" onClick={onClickLogin}>
              Log in here!
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:shadow-outline bg-transparent"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-white leading-tight focus:shadow-outline bg-transparent"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition w-full"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" onClick={onClickLogin}>
            Log in here!
          </Link>
        </div>
      </form>
      {/* <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p> */}
    </div>
  );
};

export default SignupForm;
