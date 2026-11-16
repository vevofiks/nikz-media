"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/mockup" || pathname.startsWith("/admin");

  return (
    <>
      {bare ? null : <Header />}
      {bare ? (
        children
      ) : (
        <main id="main" tabIndex={-1}>
          {children}
        </main>
      )}
      {bare ? null : <Footer />}
    </>
  );
}
