"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CartItem,
  getCart,
  removeFromCart,
  CART_EVENT,
} from "@/lib/cart";

function fmt(v: number): string {
  return v === 0 ? "Free" : `₹${v.toLocaleString("en-IN")}`;
}

function deliveryRange(): string {
  const now = new Date();
  const s = new Date(now); s.setDate(s.getDate() + 2);
  const e = new Date(now); e.setDate(e.getDate() + 4);
  const m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${m[s.getMonth()]} ${s.getDate()}–${e.getDate()}`;
}

function ItemCard({ item, delivery, onRemove }: { item: CartItem; delivery: string; onRemove: () => void }) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered ? "#141414" : "#0f0f0f",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "flex-start",
        gap: "18px",
        transition: "background-color 0.15s ease",
      }}
    >
      <div style={{
        width: "80px",
        height: "80px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.03)",
        borderRadius: "6px",
        overflow: "hidden",
      }}>
        <Image
          src={item.buyImage}
          alt={item.name}
          width={80}
          height={80}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
        />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 600,
            fontSize: "16px",
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}>
            {item.name} Nexus Pass
          </p>
          <button
            onClick={() => setSaved(!saved)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: saved ? "#e05252" : "rgba(255,255,255,0.4)",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "12px",
              paddingLeft: "16px",
              flexShrink: 0,
              transition: "color 0.2s ease",
            }}
          >
            {saved ? "♥" : "♡"} Save
          </button>
        </div>
        <p style={{
          fontFamily: "'Satoshi', sans-serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}>
          <span style={{ fontSize: "11px" }}>🚚</span> Arrives {delivery}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <p style={{
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}>
            {item.price}
          </p>
          <button
            onClick={onRemove}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Satoshi', sans-serif",
              fontSize: "12px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e05252")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
          >
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    setMounted(true);
    setItems(getCart());
    const sync = () => setItems(getCart());
    window.addEventListener(CART_EVENT, sync);
    return () => window.removeEventListener(CART_EVENT, sync);
  }, []);

  if (!mounted) return null;

  const delivery = deliveryRange();
  const subtotal = items.reduce((s, i) => s + i.priceValue, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  const btnBase: React.CSSProperties = {
    width: "100%",
    border: "none",
    borderRadius: "6px",
    fontFamily: "'Satoshi', sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    letterSpacing: "0.01em",
    padding: "14px",
    cursor: "pointer",
    color: "#ffffff",
  };

  return (
    <div style={{
      padding: "48px 6% 80px",
      minHeight: "100%",
      backgroundColor: "#0a0a0a",
    }}>
      <h1 style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(36px, 4.5vw, 54px)",
        color: "#ffffff",
        letterSpacing: "-0.04em",
        marginBottom: "32px",
      }}>
        My cart
      </h1>

      {items.length === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh", gap: "20px" }}>
          <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.35)" }}>
            Your cart is empty.
          </p>
          <Link href="/nexus-pass" style={{
            backgroundColor: "#8b1414",
            color: "#ffffff",
            fontFamily: "'Satoshi', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            padding: "12px 28px",
            borderRadius: "6px",
            textDecoration: "none",
            letterSpacing: "0.01em",
          }}>
            Browse Nexus Pass
          </Link>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
          alignItems: "start",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                delivery={delivery}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          <div style={{
            backgroundColor: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "22px",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}>
              Order summary
            </h2>
            {promoOpen ? (
              <div style={{ marginBottom: "18px", display: "flex", gap: "8px" }}>
                <input
                  autoFocus
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code…"
                  style={{
                    flex: 1,
                    backgroundColor: "#1a1a1a",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    color: "#ffffff",
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: "13px",
                    padding: "10px 12px",
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => setPromoOpen(false)}
                  style={{ ...btnBase, width: "auto", padding: "10px 14px", backgroundColor: "#8b1414", fontSize: "13px" }}
                >
                  Apply
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPromoOpen(true)}
                style={{
                  ...btnBase,
                  backgroundColor: "#8b1414",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "18px",
                  fontSize: "13px",
                }}
              >
                🏷 Enter Promo code
              </button>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>Subtotal</span>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", color: "#ffffff" }}>{fmt(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "18px" }}>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>Shipping</span>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.65)" }}>Free</span>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", marginBottom: "18px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "19px", color: "#ffffff" }}>Total</span>
              <span style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 700, fontSize: "19px", color: "#ffffff" }}>{fmt(total)}</span>
            </div>
            <button
              id="checkout-btn"
              style={{ ...btnBase, backgroundColor: "#8b1414", marginBottom: "10px" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#a01818")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#8b1414")}
            >
              Continue to checkout
            </button>
            <Link
              href="/nexus-pass"
              id="continue-shopping-btn"
              style={{
                ...btnBase,
                backgroundColor: "#6b1010",
                display: "block",
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              Continue shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
