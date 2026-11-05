import type {Metadata} from 'next';
// @ts-expect-error Next.js handles global CSS imports at runtime.
import './globals.css';
import { NightSky } from '../components/NightSky';

export const metadata: Metadata = {
  title: 'Noctura Sleep Aid - Fè Moun Dòmi',
  description: 'Application d’aide à la gestion de l’insomnie basée sur 4 piliers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <NightSky />
        <div className="relative z-10 flex flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}