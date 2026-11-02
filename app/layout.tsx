'use client';

import "./globals.css";
import Navs from "./components/navs";
import Header from "./components/header";
import Roll from "./components/roll";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html>
      <body className="flex">
        <Navs />
        <div className="w-full">
          <Header />
          <main className="p-2 m-2">
            {children}
          </main>
        </div>
        <Roll />
      </body>
    </html>
  );
}
