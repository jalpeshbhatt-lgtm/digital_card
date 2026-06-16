"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email && password) {
      localStorage.setItem("auth", "true");
      router.push("/dashboard");
    } else {
      alert("Enter credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="p-10 bg-gray-900 rounded-2xl w-[350px]">
        <h1 className="text-2xl mb-5">Login</h1>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 text-black"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}