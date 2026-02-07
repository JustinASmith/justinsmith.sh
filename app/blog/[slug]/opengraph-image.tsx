import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog Post";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Format the slug into a readable title
  const title = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#111318",
          color: "#E2E4E8",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              marginTop: 24,
              lineHeight: 1.2,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#717888",
          }}
        >
          justinsmith.sh
        </div>
      </div>
    ),
    { ...size }
  );
}
