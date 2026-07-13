import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nexus Pass — Metro Nexus",
  description:
    "Choose the Nexus Pass that fits your journey. Core, Plus, Prime, or Infinite — every pass powered by AI routing, Journey DNA, and seamless metro access.",
};

export default function NexusPassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
