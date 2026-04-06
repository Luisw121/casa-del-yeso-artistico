import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Casa del Yeso Artístico - Techos Gypsum Loja Ecuador";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A2E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Decorative corner accents */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 60,
            height: 60,
            borderTop: "3px solid #C9A96E",
            borderLeft: "3px solid #C9A96E",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 60,
            height: 60,
            borderTop: "3px solid #C9A96E",
            borderRight: "3px solid #C9A96E",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            width: 60,
            height: 60,
            borderBottom: "3px solid #C9A96E",
            borderLeft: "3px solid #C9A96E",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 40,
            width: 60,
            height: 60,
            borderBottom: "3px solid #C9A96E",
            borderRight: "3px solid #C9A96E",
          }}
        />

        {/* Gold divider top */}
        <div
          style={{
            width: 80,
            height: 2,
            background: "#C9A96E",
            marginBottom: 32,
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#F5F0EB",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 8,
            display: "flex",
          }}
        >
          La Casa del
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#C9A96E",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 32,
            display: "flex",
          }}
        >
          Yeso Artístico
        </div>

        {/* Gold divider bottom */}
        <div
          style={{
            width: 80,
            height: 2,
            background: "#C9A96E",
            marginBottom: 32,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: "#F5F0EB99",
            textAlign: "center",
            display: "flex",
          }}
        >
          Techos Gypsum · Molduras · Decoración Artística
        </div>

        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            fontSize: 20,
            color: "#C9A96E99",
            display: "flex",
          }}
        >
          Loja, Ecuador
        </div>
      </div>
    ),
    { ...size }
  );
}
