export const metadata = {
  title: 'Ma ZiYu — Portfolio',
  description: 'Ma ZiYu — industrial and packaging designer',
  openGraph: {
    title: 'Ma ZiYu — Portfolio',
    description: 'Industrial & Packaging Designer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ma ZiYu — Portfolio',
    description: 'Industrial & Packaging Designer',
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
