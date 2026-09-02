export const metadata = {
  metadataBase: new URL('https://maziyu-portfolio.fd76kmdt6h.chatgpt.site'),
  title: 'Ma ZiYu — Portfolio',
  description: 'Ma ZiYu — industrial and packaging designer',
  openGraph: {
    title: 'Ma ZiYu — Portfolio',
    description: 'Industrial & Packaging Designer',
    images: ['/images/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ma ZiYu — Portfolio',
    description: 'Industrial & Packaging Designer',
    images: ['/images/og.png'],
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
