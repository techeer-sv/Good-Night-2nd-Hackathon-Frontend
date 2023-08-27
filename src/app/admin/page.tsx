"use client";

import Link from "next/link";
import { useState } from "react";

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAdmin(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdmin", "true");
      }
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div>
      {isAdmin ? (
        <Link href="/">Welcome, Admin!</Link>
      ) : (
        <div className="mt-2 ml-2">
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handlePasswordSubmit}>Login</button>
        </div>
      )}
    </div>
  );
}
