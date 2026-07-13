"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { addToCart, removeFromCart, isInCart, CART_EVENT } from "@/lib/cart";

const passes = [
  {
    id: "core",
    name: "Core",
    image: "/img/core.png",
    buyImage: "/img/core_card.png",
    align: "left" as const,
    price: "Free",
    priceValue: 0,
    cardDesc: "Entry point for everyone.",
  },
  {
    id: "plus",
    name: "Plus",
    image: "/img/core2.png",
    buyImage: "/img/plus_card.png",
    align: "right" as const,
    price: "₹299",
    priceValue: 299,
    cardDesc: "Affordable for students.",
  },
  {
    id: "prime",
    name: "Prime",
    image: "/img/core3.png",
    buyImage: "/img/prime_card.png",
    align: "left" as const,
    price: "₹999",
    priceValue: 999,
    cardDesc: "Premium commuters.",
  },
  {
    id: "infinite",
    name: "Infinite",
    image: "/img/core4.png",
    buyImage: "/img/infinity_card.png",
    align: "right" as const,
    price: "₹1499",
    priceValue: 1499,
    cardDesc: "Luxury with global access.",
  },
];

function useView(thresh = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: thresh }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [thresh]);

  return { ref, inView };
}

function HeroSec() {
  const { ref, inView } = useView(0.1);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "calc(100vh - 52px)",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1300px",
          padding: "0 6%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.97)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <Image
          src="/img/hero.png"
          alt="Introducing Nexus Pass"
          width={1300}
          height={730}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "1150px",
            objectFit: "contain",
          }}
          priority
        />
      </div>
    </section>
  );
}

function PassSec({ pass }: { pass: (typeof passes)[0] }) {
  const { ref, inView } = useView(0.15);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        minHeight: "calc(100vh - 52px)",
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.96)",
          transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.25, 1, 0.5, 1) 0.15s",
        }}
      >
        <Image
          src={pass.image}
          alt={`${pass.name} Nexus Pass`}
          width={1800}
          height={1800}
          style={{
            maxWidth: "clamp(600px, 95vw, 1000px)",
          }}
          priority
        />
      </div>
    </section>
  );
}

function ProdCard({
  pass,
  delay,
}: {
  pass: (typeof passes)[0];
  delay: number;
}) {
  const { ref, inView } = useView(0.1);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setAdded(isInCart(pass.id));
    const sync = () => setAdded(isInCart(pass.id));
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, [pass.id]);

  const handleAdd = () => {
    if (added) {
      removeFromCart(pass.id);
    } else {
      addToCart({
        id: pass.id,
        name: pass.name,
        price: pass.price,
        priceValue: pass.priceValue,
        buyImage: pass.buyImage,
      });
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#141414" : "#0f0f0f",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "12px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, background-color 0.2s ease, border-color 0.2s ease`,
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "260px",
          overflow: "hidden",
        }}
      >
        <Image
          src={pass.buyImage}
          alt={pass.name}
          width={240}
          height={240}
          style={{
            width: "auto",
            height: "auto",
            maxHeight: "180px",
            objectFit: "contain",
            transform: hovered ? "rotate(90deg) scale(1.06)" : "rotate(90deg) scale(1)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 600,
            fontSize: "15px",
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          {pass.name} Nexus Pass
        </p>
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            color: pass.price === "Free" ? "rgba(255,255,255,0.5)" : "#ffffff",
          }}
        >
          {pass.price}
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.5,
          marginTop: "-8px",
        }}
      >
        {pass.cardDesc}
      </p>

      <button
        id={`add-to-cart-${pass.id}`}
        onClick={handleAdd}
        style={{
          backgroundColor: added ? "#6b1010" : "transparent",
          border: `1px solid ${added ? "#8b1414" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "6px",
          color: added ? "#ffffff" : "rgba(255,255,255,0.7)",
          fontFamily: "'Satoshi', sans-serif",
          fontWeight: 500,
          fontSize: "12px",
          letterSpacing: "0.04em",
          padding: "8px 16px",
          cursor: "pointer",
          transition: "all 0.25s ease",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = added ? "#8b1414" : "rgba(255,255,255,0.08)";
          btn.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = added ? "#6b1010" : "transparent";
          btn.style.color = added ? "#ffffff" : "rgba(255,255,255,0.7)";
        }}
      >
        {added ? "✓ In cart" : "Add to cart →"}
      </button>
    </div>
  );
}

function CardsSec() {
  const { ref, inView } = useView(0.05);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "80px 6% 100px",
      }}
    >
      <div
        style={{
          marginBottom: "56px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(28px, 3vw, 42px)",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            marginBottom: "8px",
          }}
        >
          Choose your pass
        </h2>
        <p
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          Every journey, intelligently yours.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {passes.map((pass, i) => (
          <ProdCard key={pass.id} pass={pass} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

export default function NxPassPg() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      <HeroSec />
      {passes.map((pass) => (
        <PassSec key={pass.id} pass={pass} />
      ))}
      <CardsSec />
    </div>
  );
}
