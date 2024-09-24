import "./globals.css";

export const metadata = {
  title: "KSK | Regionálny rozvojový portál",
  description: "Investícia do budúcnosti Košického kraja",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
