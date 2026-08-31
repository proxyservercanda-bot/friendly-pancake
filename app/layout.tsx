import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'फरकाडे पोल्ट्री फार्म | गावराण अंडी | सिल्लोड',
  description:
    'फरकाडे पोल्ट्री फार्म, बनकिंन्होळा, ता. सिल्लोड, जि. छत्रपती संभाजीनगर. गावराण अंडी १ ते २,००० पर्यंत उपलब्ध. १,०००+ अंड्यांवर १५% Discount आणि मोफत घरपोच सेवा.',
  keywords: [
    'फरकाडे पोल्ट्री फार्म',
    'गावराण अंडी',
    'गावराण अंडी सिल्लोड',
    'गावराण अंडी छत्रपती संभाजीनगर',
    'गावराण अंडी बनकिंन्होळा',
    'गावराण अंडी ऑर्डर',
    'सिल्लोड गावराण अंडी',
    'Bulk गावराण अंडी',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className="scroll-smooth">
      <body className="antialiased pb-14 md:pb-0">{children}</body>
    </html>
  );
}
