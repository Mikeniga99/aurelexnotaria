import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aurelex Notaires | Office Notarial Paris',
  description: 'Étude notariale Aurelex Notaires à Paris. Droit immobilier, droit de la famille, successions, droit des affaires et gestion de patrimoine.',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-aurelex-ivoire text-aurelex-ebene antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
