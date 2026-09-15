
"use client";

import { usePathname } from "next/navigation";
import AppShell from "@/components/app-shell";
import LandingLayout from "./landing-layout";

export default function AppContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const publicRoutes = ["/", "/login", "/signup", "/features", "/about", "/contact"];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute) {
    return <LandingLayout>{children}</LandingLayout>;
  }

  return <AppShell>{children}</AppShell>;
}
