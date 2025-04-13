import './globals.css';
import { Inter } from 'next/font/google';
import { InitializationLoader } from './components/InitializationLoader';
import { metadata, viewport } from './metadata';
import { Suspense } from 'react';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <InitializationLoader />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
