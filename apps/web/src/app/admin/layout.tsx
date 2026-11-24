'use client';

import React, { useState, useEffect } from 'react';
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
  Loader2,
  Settings,
  History,
  Users,
  FolderLock,
  ClipboardList,
  BarChart3,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { NotarialActLoader } from '@/components/public/NotarialActLoader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(pathname !== '/admin/login');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifs, setNotifs] = useState<{
    pendingRdv: number;
    unreadMsgs: number;
    pendingDocs: number;
    total: number;
  }>({
    pendingRdv: 0,
    unreadMsgs: 0,
    pendingDocs: 0,
    total: 0,
  });

  useEffect(() => {
    if (pathname === '/admin/login') return;

    const fetchNotifications = async () => {
      try {
        const [statsRes, docsRes] = await Promise.all([
          fetch('/api/v1/stats/dashboard'),
          fetch('/api/v1/documents'),
        ]);

        let pendingRdv = 0;
        let unreadMsgs = 0;
        let pendingDocs = 0;

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          if (statsData.success && statsData.data?.kpi) {
            pendingRdv = statsData.data.kpi.appointments?.pending || 0;
            unreadMsgs = statsData.data.kpi.messages?.unread || 0;
          }
        }

        if (docsRes.ok) {
          const docsData = await docsRes.json();
          if (docsData.success && Array.isArray(docsData.data)) {
            pendingDocs = docsData.data.filter((d: any) => d.status === 'PENDING').length;
          }
        }

        setNotifs({
          pendingRdv,
          unreadMsgs,
          pendingDocs,
          total: pendingRdv + unreadMsgs + pendingDocs,
        });
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };

    fetchNotifications();
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setIsVerifying(false);
      return;
    }

    fetch('/api/v1/auth/me')
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        const data = await res.json();
        const role = data.data?.role;
        // Strict RBAC: Visitors must go to the Client Portal
        if (role === 'VISITOR' || !role) {
          router.replace('/espace-client');
          return;
        }
        setCurrentUser(data.data);
        setIsVerifying(false);
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [pathname, router]);

  // If on login page, don't show the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-white">
        <Loader2 className="w-8 h-8 animate-spin text-aurelex-champagne mb-3" />
        <p className="text-xs tracking-wider uppercase text-slate-400 font-medium">
          Vérification des accréditations notariales...
        </p>
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('/api/v1/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      router.push('/admin/login');
    }, 1800);
  };

  const navGroups = [
    {
      title: 'GESTION NOTARIALE',
      items: [
        { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
        { href: '/admin/rdv', label: 'Rendez-vous', icon: CalendarCheck2 },
        { href: '/admin/messages', label: 'Messages reçus', icon: Mail },
        { href: '/admin/documents', label: 'GED & Pièces clients', icon: FolderLock },
        { href: '/admin/articles', label: 'Articles & Guides', icon: FileText },
        { href: '/admin/modeles', label: 'Modèles & Check-lists', icon: ClipboardList },
      ],
    },
    {
      title: 'ADMINISTRATION & CONFORMITÉ',
      items: [
        { href: '/admin/equipe', label: 'Équipe & Notaires', icon: Users },
        { href: '/admin/statistiques', label: 'Statistiques & Exports', icon: BarChart3 },
        { href: '/admin/tracabilite', label: 'Traçabilité & Audit', icon: History },
        { href: '/admin/parametres', label: 'Paramètres de l’étude', icon: Settings },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-slate-800">
      {/* ── ANIMATION BALANCE & MAILLET LORS DE LA DÉCONNEXION ── */}
      <NotarialActLoader
        isOpen={isLoggingOut}
        title="Fermeture Sécurisée de la Session"
        subtitle="Clôture des accréditations et scellement du registre"
      />
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#0B1938] text-white p-4 flex items-center justify-between border-b border-[#D4B483]/30">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#D4B483] bg-white p-0.5">
            <Image src="/images/favicon.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-serif font-bold text-lg text-[#D4B483]">Aurelex Notaires</span>
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
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0B1938] text-white border-r border-[#1B3B6F]/40 shadow-2xl flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo & Office Name */}
          <div className="p-5 border-b border-white/10 flex items-center gap-3.5 shrink-0 bg-[#060D1F]/50">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#D4B483] shrink-0 bg-white p-0.5 shadow-sm">
              <Image src="/images/favicon.png" alt="Aurelex Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-white tracking-wide">AURELEX</div>
              <div className="text-[10px] tracking-widest uppercase text-[#D4B483] font-bold -mt-0.5">
                Office Notarial
              </div>
            </div>
          </div>

          {/* Navigation Links with Groups */}
          <nav className="flex-1 p-3.5 space-y-6 overflow-y-auto">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#D4B483] mb-1.5">
                  {group.title}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md font-semibold border-l-4 border-[#D4B483]'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#D4B483]' : 'text-slate-400 group-hover:text-[#D4B483]'}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#060D1F]/40">
          <Link
            href="/fr"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-[#D4B483]" />
              <span>Voir le site public</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs text-red-400 hover:text-red-200 hover:bg-red-500/20 transition-colors font-medium cursor-pointer"
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
          <div className="text-sm font-serif font-bold text-slate-800 tracking-wide">
            Espace Notarial Sécurisé
          </div>

          {/* Cloche de Notifications du Site */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-all cursor-pointer focus:outline-none"
              title="Notifications du site"
            >
              <Bell className="w-5 h-5 text-blue-700" />
              {notifs.total > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-sm">
                  {notifs.total > 99 ? '99+' : notifs.total}
                </span>
              )}
            </button>

            {/* Menu Déroulant des Notifications */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-scaleIn">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-700" />
                    <span className="font-bold text-sm text-slate-900">Notifications du site</span>
                  </div>
                  {notifs.total > 0 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                      {notifs.total} en attente
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">À jour</span>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifs.total === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      Aucune nouvelle notification pour le moment.
                    </div>
                  ) : (
                    <>
                      {notifs.pendingRdv > 0 && (
                        <Link
                          href="/admin/rdv"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-3.5 flex items-start gap-3 hover:bg-blue-50/60 transition-colors block"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                            <CalendarCheck2 className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-800">
                              {notifs.pendingRdv} demande{notifs.pendingRdv > 1 ? 's' : ''} de rendez-vous
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Nouveaux créneaux en attente de confirmation
                            </div>
                          </div>
                        </Link>
                      )}

                      {notifs.unreadMsgs > 0 && (
                        <Link
                          href="/admin/messages"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-3.5 flex items-start gap-3 hover:bg-amber-50/60 transition-colors block"
                        >
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-800">
                              {notifs.unreadMsgs} message{notifs.unreadMsgs > 1 ? 's' : ''} non lu{notifs.unreadMsgs > 1 ? 's' : ''}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Sollicitations reçues via le formulaire de contact
                            </div>
                          </div>
                        </Link>
                      )}

                      {notifs.pendingDocs > 0 && (
                        <Link
                          href="/admin/documents"
                          onClick={() => setNotificationsOpen(false)}
                          className="p-3.5 flex items-start gap-3 hover:bg-purple-50/60 transition-colors block"
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                            <FolderLock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-800">
                              {notifs.pendingDocs} pièce{notifs.pendingDocs > 1 ? 's' : ''} justificative{notifs.pendingDocs > 1 ? 's' : ''}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Documents clients à examiner dans la GED
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <Link
                    href="/admin"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-900"
                  >
                    Voir le tableau de bord complet →
                  </Link>
                </div>
              </div>
            )}
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
