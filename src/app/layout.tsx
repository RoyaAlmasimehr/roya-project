import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/hooks/ReactQueryProvider";

export const metadata: Metadata = {
  title: "My-BlogPost",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
