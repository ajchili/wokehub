import * as React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.js";

const $app = document.getElementById("app");
if (!$app) {
  throw new Error("Unable to create root, missing app div!");
}

const router = createRouter({ routeTree });

const root = createRoot($app);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
