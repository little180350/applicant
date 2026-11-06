'use client';

import "./globals.css";
import Navs from "./components/navs";
import Header from "./components/header";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="flex min-h-screen">
        <Navs />
        <div className="min-w-0 flex-1">
          <Header />
          <main className="m-2 min-w-0 p-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
