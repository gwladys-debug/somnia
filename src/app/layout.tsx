import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Noctura Sleep Aid - Sommeil Serein',
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
        {children}
      </body>
    </html>
  );
}
