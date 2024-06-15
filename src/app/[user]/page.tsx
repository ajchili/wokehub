import { Suspense } from "react";
import { Repos } from "./repos";

export default function Home({
  params: { user },
}: {
  params: { user: string };
}) {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Repos user={user} />
    </Suspense>
  );
}
