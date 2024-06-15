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
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{ display: "flex", gap: 10, flexDirection: "column" }}
        action={() => redirectToUserProfile(username)}
      >
        <div style={{ display: "flex", gap: 10 }}>
          is
          <input
            style={{ border: "none", borderBottom: "1px solid black" }}
            className="text-black"
            required
            placeholder="username"
            autoComplete="off"
            name="username"
            type="text"
            data-1p-ignore
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          woke?
        </div>
        <button>lock in</button>
      </form>
    </div>
  );
};
