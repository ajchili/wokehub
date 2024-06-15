"use client";
import { useState } from "react";

interface SearchProps {
  username?: string;
}

export const Search = ({
  username: previousUsername,
}: SearchProps): JSX.Element => {
  const [username, setUsername] = useState(previousUsername);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form style={{ display: "flex", gap: 10, flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 10 }}>
          is
          <input
            style={{ border: "none", borderBottom: "1px solid black" }}
            required
            placeholder="username"
            name="username"
            type="text"
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
