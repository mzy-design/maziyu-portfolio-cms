export const metadata = {
  metadataBase: new URL('https://maziyudesign.com'),
  title: 'Ma Ziyu (Iven) — Product & Packaging Designer',
  description: 'Shanghai-based Product & Packaging Designer focused on beauty packaging, CMF, structural design, prototyping, tooling and production development.',
  openGraph: {
    title: 'Ma Ziyu (Iven) — Product & Packaging Designer',
    description: 'Beauty and personal-care packaging, product design, CMF and production development in Shanghai.',
    images: ['/images/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ma Ziyu (Iven) — Product & Packaging Designer',
    description: 'Beauty and personal-care packaging, product design, CMF and production development in Shanghai.',
    images: ['/images/og.png'],
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
