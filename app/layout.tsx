import '@/app/ui/global.css';
import { interFont } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       {/* antialiased class smooths out the font */}
      <body className={`${interFont.className} antialiased`}>{children}</body>
    </html>
  );
}
