import { notFound } from "next/navigation";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "GitPilled OG Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image(props: {
  params: {
    user: string;
  };
}) {
  return null;
}
