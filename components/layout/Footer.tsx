"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n/context";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative bg-gray-900 border-t border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image
              src="/logo/logo-red.png"
              alt="ASI Everest"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <p className="text-gray-400 text-sm">
              Chatbot AI thông minh cho doanh nghiệp
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-gray-100 font-bold mb-4">Sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Tính năng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Giá cả
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Tài liệu
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-100 font-bold mb-4">Công ty</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-100 font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="text-red-500" />
                <a href="mailto:info@example.com" className="hover:text-red-500 transition-colors">
                  info@example.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="text-red-500" />
                <a href="tel:+84123456789" className="hover:text-red-500 transition-colors">
                  +84 123 456 789
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="text-red-500 mt-1 shrink-0" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 ASI Everest. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                Điều khoản dịch vụ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

