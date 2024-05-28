"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

export default function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      <Link href="/">
        <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>
      <Link
        href="/"
        className="flex items-center p-3 hover:bg-gray-100 rounded-full transition-all duration-200 gap-2 w-fit"
      >
        <HiHome className="w-7 h-7" />
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>

      {session ? (
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white w-48 h-9 rounded-full  hover:brightness-95 shadow-md transition-all duration-200 hidden xl:inline font-semibold"
        >
          Sign in
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="bg-blue-500 text-white w-48 h-9 rounded-full  hover:brightness-95 shadow-md transition-all duration-200 hidden xl:inline font-semibold"
        >
          Sign Out
        </button>
      )}
    </div>
  );
}
