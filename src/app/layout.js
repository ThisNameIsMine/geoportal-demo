import "./globals.css";

export const metadata = {
  title: "KSK Invest",
  description: "Investícia do budúcnosti Košického kraja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
