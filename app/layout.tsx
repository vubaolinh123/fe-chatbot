import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";

export const metadata: Metadata = {
  title: "AI Chatbot - Tự động hóa hội thoại khách hàng",
  description: "Chatbot AI thông minh với tích hợp dữ liệu, trả lời 24/7 và tích hợp Facebook Messenger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
