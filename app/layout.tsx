import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kawung — Warisan Batik Nusantara",
  description:
    "Jelajahi keindahan dan filosofi mendalam batik Indonesia — warisan budaya dunia yang terus hidup dan menginspirasi.",
  keywords: ["batik", "indonesia", "nusantara", "warisan budaya", "kawung", "parang", "batik tulis"],
  openGraph: {
    title: "Kawung — Warisan Batik Nusantara",
    description: "Platform interaktif eksplorasi budaya batik Indonesia.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of unstyled theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var stored = localStorage.getItem('batik-theme');
                  var theme = stored || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
