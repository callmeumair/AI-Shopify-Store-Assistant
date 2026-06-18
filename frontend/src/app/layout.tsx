import type { Metadata } from 'next';
import { Inter, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap' 
});

const syne = Syne({ 
  subsets: ['latin'], 
  variable: '--font-syne', 
  weight: ['700', '800'], 
  display: 'swap' 
});

const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono', 
  display: 'swap' 
});

export const metadata: Metadata = {
  title: 'StoreSync AI — Shopify Management Agent',
  description: 'Autonomous AI agent that manages your Shopify store via natural language.',
  keywords: ['Shopify', 'AI', 'automation', 'store management'],
  openGraph: {
    title: 'StoreSync AI',
    description: 'Your Shopify store, managed by AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${mono.variable}`}>
      <body className="noise bg-grid antialiased">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
