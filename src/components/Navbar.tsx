"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLks = [
  { label: "Home", href: "/" },
  { label: "Nexus Pass", href: "/nexus-pass" },
  { label: "Cart", href: "/cart" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pName = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center h-[52px]"
      style={{
        backgroundColor: "#0a0a0a",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        paddingLeft: "6%",
        paddingRight: "6%",
      }}
    >
      <ul className="flex w-full items-center justify-between list-none">
        <li>
          <Link
            href="/"
            id="nav-logo"
            className="flex items-center justify-center w-8 h-8 flex-shrink-0 relative"
            aria-label="Metro Nexus Home"
          >
            <Image
              src="/img/logo_white.png"
              alt="Metro Nexus Logo"
              width={20}
              height={20}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
              priority
            />
          </Link>
        </li>
        {navLks.map((link) => {
          const isAct = pName === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  color: isAct
                    ? "rgba(255,255,255,1)"
                    : "rgba(255,255,255,0.75)",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(255,255,255,1)";
                }}
                onMouseLeave={(e) => {
                  if (!isAct) {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "rgba(255,255,255,0.75)";
                  }
                }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
