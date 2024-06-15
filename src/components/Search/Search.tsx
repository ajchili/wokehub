"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

const redirectToUserProfile = (username: string) => {
  return redirect("/" + username);
};

export const Search = (): JSX.Element => {
  const [username, setUsername] = useState("");

  return (
    <div
      className="flex justify-center items-center pt-20"
    >
      <form
        className="flex flex-col gap-10"
        action={() => redirectToUserProfile(username)}
      >
        <div 
          className="flex justify-center items-center gap-4"
        >
          is
          <input
            className="border-b-2 p-2 border-black bg-gray-700"
            required
            placeholder="username"
            autoComplete="off"
            name="username"
            type="text"
            data-1p-ignore
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          woke?
        </div>
        <button className="bg-blue-800 rounded-2xl p-4 text-4xl">lock in</button>
      </form>
    </div>
  );
};
