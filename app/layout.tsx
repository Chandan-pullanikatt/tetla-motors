import "./globals.css";
import { Urbanist, Chakra_Petch } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-urbanist",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-chakra",
});

export const metadata = {
  title: "EV Vehicle",
  description: "EV Landing Page",
};

import { SmoothScroll } from "@/app/components/ui/SmoothScroll";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${chakraPetch.variable} ${urbanist.className}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
