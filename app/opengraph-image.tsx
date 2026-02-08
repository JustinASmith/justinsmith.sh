import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#111318",
          color: "#E2E4E8",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#21B47A",
            fontFamily: "monospace",
          }}
        >
          justinsmith.sh
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginTop: 16,
            lineHeight: 1.2,
          }}
        >
          Building the future of
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#21B47A",
            lineHeight: 1.2,
          }}
        >
          agentic coding
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#717888",
            marginTop: 24,
          }}
        >
          Software engineering, agentic coding, and the future of how we build
          software.
        </div>
      </div>
    ),
    { ...size }
  );
}
