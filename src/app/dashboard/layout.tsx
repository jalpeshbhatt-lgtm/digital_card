"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [userName, setUserName] =
    useState("Dashboard");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (user?.name) {
      setUserName(user.name);
    }
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="flex bg-[#020617] min-h-screen">

      {/* SIDEBAR */}

      <aside
        className="
          w-[340px]
          min-h-screen
          bg-[#020617]
          border-r
          border-white/10
          text-white
          p-6
          flex
          flex-col
          shrink-0
        "
      >

        {/* USER NAME */}

       {/* USER PROFILE */}

<div className="mb-10">

  <h1 className="text-3xl font-bold break-words">
    {userName}
  </h1>

  <div className="flex gap-3 mt-4">

    {/* VIEW PROFILE */}

    <button
      className="
        px-4
        py-2
        rounded-xl
        text-sm
        bg-[#071132]
        border
        border-white/10
        hover:border-violet-500
        transition
      "
    >
      View Profile
    </button>

    {/* EDIT PROFILE */}

    <button
      className="
        px-4
        py-2
        rounded-xl
        text-sm
        bg-[#071132]
        border
        border-white/10
        hover:border-violet-500
        transition
      "
    >
      Edit Profile
    </button>

  </div>

  {/* SMALL LOGOUT */}

  <button
    onClick={logout}
    className="
      mt-4
      px-4
      py-2
      rounded-xl
      text-sm
      bg-red-500
      hover:bg-red-600
      transition
    "
  >
    Logout
  </button>

</div>

        {/* MENU */}

        <nav className="flex flex-col gap-5">

          {[
            ["Dashboard", "/dashboard"],
            ["My Cards", "/dashboard/cards"],
            ["Create Card", "/dashboard/cards/new"],
            ["Templates", "/dashboard/templates"],
            ["Leads", "/dashboard/leads"],
            ["Users", "/dashboard/users"],
            ["Analytics", "/dashboard/analytics"],
            ["Reseller", "/dashboard/reseller"],
          ].map(([label, href]) => (

            <Link
              key={href}
              href={href}
              className="
                w-full
                rounded-3xl
                border
                border-white/10
                bg-[#071132]
                px-8
                py-6
                text-2xl
                font-medium
                hover:border-violet-500
                hover:bg-[#0b173d]
                transition
              "
            >
              {label}
            </Link>

          ))}

        </nav>

      </aside>

      {/* MAIN CONTENT */}

      <main
        className="
          flex-1
          w-full
          overflow-x-hidden
          p-6
          bg-[#020617]
        "
      >
        {children}
      </main>

    </div>
  );
}