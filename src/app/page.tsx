"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const GlobeModel = dynamic(() => import("@/components/GlobeModel"), {
  ssr: false,
  loading: () => null,
});

export default function HomePage() {
  return (
    <section
      id="hero"
      className="relative flex-1 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "calc(100vh - 52px)", // full viewport minus navbar height
      }}
    >
      <div
        className="absolute select-none pointer-events-none"
        style={{
          left: "3%",
          top: "50%",
          transform: "translateY(-55%)",
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(90px, 13vw, 180px)",
            lineHeight: 0.9,
            color: "#ffffff",
            letterSpacing: "-0.05em",
            display: "block",
          }}
        >
          Metro
        </span>
      </div>

      <div
        className="absolute select-none pointer-events-none"
        style={{
          right: "2%",
          top: "50%",
          transform: "translateY(10%)",
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(90px, 13vw, 180px)",
            lineHeight: 0.9,
            color: "#ffffff",
            letterSpacing: "-0.05em",
            display: "block",
          }}
        >
          Nexus
        </span>
      </div>

      <div
        className="relative flex-shrink-0"
        style={{
          width: "clamp(340px, 48vw, 580px)",
          height: "clamp(340px, 48vw, 580px)",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          zIndex: 10,
          overflow: "hidden",
          backgroundColor: "rgba(10, 10, 10, 0.3)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "inset 0 0 60px rgba(255,255,255,0.02), 0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <GlobeModel hasModel={false} />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 12 }}
        >
          <Image
            src="/img/logo_white.png"
            alt="Metro Nexus Central Logo"
            width={120}
            height={120}
            style={{ width: "auto", height: "auto" }}
            className="object-contain opacity-80"
          />
        </div>
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          width: "clamp(340px, 48vw, 580px)",
          height: "clamp(340px, 48vw, 580px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)",
          zIndex: 15,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </section>
  );
}
