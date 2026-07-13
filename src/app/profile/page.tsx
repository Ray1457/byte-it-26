"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DNA_CATEGORIES = [
  {
    id: "communication",
    label: "Communication",
    options: ["Silent", "Updates Only", "Open to Chat"],
  },
  {
    id: "ambience",
    label: "Ambience",
    options: ["Quiet Ride", "Soft Music", "Focus Mode", "Cool & Airy", "Rest Mode", "Scenic Calm"],
  },
  {
    id: "route",
    label: "Route Preferences",
    options: ["Fastest", "Least Crowded", "Most Scenic", "Budget-Friendly"],
  },
  {
    id: "style",
    label: "Journey Style",
    options: ["Rush", "Smooth", "Leisurely"],
  },
];

const DNA_KEY = "nexus-journey-dna";

function loadDna(): Record<string, string[]> {
  if (typeof window === "undefined")
    return Object.fromEntries(DNA_CATEGORIES.map((c) => [c.id, [...c.options]]));
  try {
    const raw = localStorage.getItem(DNA_KEY);
    if (raw) return JSON.parse(raw) as Record<string, string[]>;
  } catch {}
  return Object.fromEntries(DNA_CATEGORIES.map((c) => [c.id, [...c.options]]));
}

const STATS = [
  "1,284 Journeys Completed",
  "5,942 km Distance Traveled",
  "87 hrs Time Saved with NEXUS AI",
  "18,460 Nexus Points Earned",
];

function DnaOption({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "7px",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "right",
      }}
    >
      <span style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 400,
        fontSize: "12px",
        color: checked ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
        transition: "color 0.15s ease",
      }}>
        {label}
      </span>
      <div style={{
        width: "9px",
        height: "9px",
        border: "1px solid rgba(255,255,255,0.4)",
        backgroundColor: checked ? "#ffffff" : "transparent",
        flexShrink: 0,
        transition: "background-color 0.15s ease",
      }} />
    </button>
  );
}

export default function ProfilePage() {
  const [dna, setDna] = useState<Record<string, string[]>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDna(loadDna());
    setMounted(true);
  }, []);

  const toggleOption = (catId: string, option: string) => {
    const cur = dna[catId] ?? [];
    const next = cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option];
    const updated = { ...dna, [catId]: next };
    setDna(updated);
    localStorage.setItem(DNA_KEY, JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <div style={{
      padding: "48px 6% 80px",
      minHeight: "100%",
      backgroundColor: "#0a0a0a",
    }}>
      <h1 style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 700,
        fontSize: "clamp(26px, 3.5vw, 44px)",
        color: "#ffffff",
        letterSpacing: "-0.03em",
        marginBottom: "4px",
      }}>
        Hey Yovaan ,
      </h1>
      <p style={{
        fontFamily: "'Satoshi', sans-serif",
        fontWeight: 400,
        fontSize: "13px",
        color: "rgba(255,255,255,0.4)",
        marginBottom: "32px",
        letterSpacing: "0.01em",
      }}>
        Welcome back, Yovaan. Your next journey awaits.
      </p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        alignItems: "start",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            backgroundColor: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "24px 24px 20px",
            position: "relative",
            overflow: "hidden",
            minHeight: "160px",
          }}>
            <div style={{ position: "relative", zIndex: 2 }}>
              <p style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 40px)",
                color: "#ffffff",
                letterSpacing: "-0.04em",
                marginBottom: "16px",
                lineHeight: 1,
              }}>
                Infinite
              </p>
              <button
                id="change-plan-btn"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: "20px",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  padding: "5px 16px",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.18)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.1)")}
              >
                Change plan
              </button>
            </div>
            <div style={{
              position: "absolute",
              right: "-16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
              opacity: 0.55,
              pointerEvents: "none",
            }}>
              <Image
                src="/img/core4.png"
                alt="Infinite Pass"
                width={220}
                height={220}
                style={{ width: "auto", height: "160px", objectFit: "contain" }}
              />
            </div>
          </div>
          <div style={{
            backgroundColor: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "24px",
          }}>
            <h3 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 600,
              fontSize: "17px",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              marginBottom: "16px",
            }}>
              Journey Stats
            </h3>
            {STATS.map((stat) => (
              <p key={stat} style={{
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.5,
                marginBottom: "10px",
              }}>
                {stat}
              </p>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            backgroundColor: "#111111",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}>
            <h2 style={{
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textAlign: "center",
              marginBottom: "22px",
            }}>
              Journey DNA
            </h2>

            {DNA_CATEGORIES.map((cat, idx) => (
              <div key={cat.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingTop: idx === 0 ? 0 : "14px",
                paddingBottom: "14px",
                borderBottom: idx < DNA_CATEGORIES.length - 1
                  ? "1px solid rgba(255,255,255,0.055)"
                  : "none",
              }}>
                <span style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 400,
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.4)",
                  flexShrink: 0,
                  width: "110px",
                  paddingTop: "2px",
                }}>
                  {cat.label}
                </span>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "7px",
                }}>
                  {cat.options.map((opt) => (
                    <DnaOption
                      key={opt}
                      label={opt}
                      checked={(dna[cat.id] ?? []).includes(opt)}
                      onToggle={() => toggleOption(cat.id, opt)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            backgroundColor: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <button
              id="sign-out-btn"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Satoshi', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "#c0392b",
                letterSpacing: "-0.01em",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
