import { createRoot } from "react-dom/client";

const $app = document.getElementById("app");
if (!$app) {
  throw new Error("Unable to create root, missing app div!");
}

const root = createRoot($app);
root.render(<h1>Hello, world</h1>);
