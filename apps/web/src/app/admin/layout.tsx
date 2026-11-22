'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck2,
  FileText,
  Mail,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  UserCheck,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } finally {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/rdv', label: 'Rendez-vous', icon: CalendarCheck2 },
    { href: '/admin/articles', label: 'Articles & Guides', icon: FileText },
    { href: '/admin/messages', label: 'Messages reçus', icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-aurelex-ebene text-white p-4 flex items-center justify-between border-b border-aurelex-bordeaux">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#D4B483]">
            <Image src="/images/favicon.png" alt="Logo" fill className="object-cover" />
          </div>
          <span className="font-serif font-bold text-lg text-aurelex-champagne">Aurelex CMS</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-white hover:bg-white/10"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-aurelex-ebene text-white flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Office Name */}
          <div className="p-6 border-b border-white/10 flex items-center gap-3.5">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D4B483]/60 shrink-0">
              <Image src="/images/favicon.png" alt="Aurelex Logo" fill className="object-cover" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-white tracking-wide">AURELEX</div>
              <div className="text-[10px] tracking-widest uppercase text-aurelex-champagne font-semibold -mt-0.5">
                Espace Notarial
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-aurelex-bordeaux text-white shadow-md font-semibold'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-aurelex-champagne' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/fr"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-aurelex-champagne" />
              <span>Voir le site public</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-red-300 hover:text-red-100 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Session sécurisée — Chiffrement Argon2id & RBAC serveur</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-aurelex-champagne-soft text-aurelex-bordeaux flex items-center justify-center font-bold text-xs border border-aurelex-champagne">
              AN
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-900">Maître Administrateur</div>
              <div className="text-[10px] text-slate-500 font-medium">SUPER_ADMIN</div>
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
