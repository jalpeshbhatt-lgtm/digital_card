"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("SUBMIT CLICKED", form);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      if (res.ok) {
        alert("Registration Success");
        router.push("/login");
      } else {
        alert(data.error || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <div className="w-full max-w-md rounded-3xl bg-[#071132] p-8 border border-white/10">
        <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
            required
          />

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="w-full h-12 rounded-2xl bg-[#020617] border border-white/10 px-4"
          >
            <option value="USER">User</option>
            <option value="RESELLER">Reseller</option>
          </select>

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-violet-600 hover:bg-violet-700 transition font-semibold"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}