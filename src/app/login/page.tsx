"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import GoogleSvg from "./svg/googleSvg";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center text-[#D1D5DA] h-full flex-col">
      <div className="text-3xl mb-5">Chat GPT</div>
      <button
        className="bg-[#4C82E5] p-3 text-lg rounded-sm flex items-center"
        onClick={(e) => {
          e.preventDefault();
          signIn("google");
        }}
      >
        <div className="bg-white h-9 w-9 mr-3">
          <GoogleSvg />
        </div>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}
