import "@/styles/globals.css";

import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "./_components/theme-provider";

export const metadata: Metadata = {
  title: "Uno",
  description: "The card game Uno, but online.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="color-scheme: dark;" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
