'use client';

import React, { useEffect, useState } from 'react';
import {
  FileText,
  Plus,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit3,
  Globe,
  Tag,
  Save,
} from 'lucide-react';
import { ContentStatus, Locale } from '@notaria/contracts';

interface ArticleItem {
  id: string;
  coverImage?: string;
  isFeatured: boolean;
  hasFr: boolean;
  hasEn: boolean;
  missingTranslations: string[];
  translations: Array<{
    id: string;
    locale: string;
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    status: ContentStatus;
  }>;
  createdAt: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [titleFr, setTitleFr] = useState('');
  const [slugFr, setSlugFr] = useState('');
  const [contentFr, setContentFr] = useState('');
  const [statusFr, setStatusFr] = useState<ContentStatus>(ContentStatus.DRAFT);

  const [titleEn, setTitleEn] = useState('');
  const [slugEn, setSlugEn] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [statusEn, setStatusEn] = useState<ContentStatus>(ContentStatus.DRAFT);
  const [activeTab, setActiveTab] = useState<'FR' | 'EN'>('FR');
  const [isSaving, setIsSaving] = useState(false);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/articles/admin/all');
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const translations: any[] = [];
    if (titleFr.trim()) {
      translations.push({
        locale: Locale.FR,
        title: titleFr,
        slug: slugFr || titleFr.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content: contentFr,
        status: statusFr,
      });
    }
    if (titleEn.trim()) {
      translations.push({
        locale: Locale.EN,
        title: titleEn,
        slug: slugEn || titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        content: contentEn,
        status: statusEn,
      });
    }

    try {
      const res = await fetch('/api/v1/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          translations,
        }),
      });

      if (res.ok) {
        setIsModalOpen(false);
        // Reset form
        setTitleFr('');
        setSlugFr('');
        setContentFr('');
        setTitleEn('');
        setSlugEn('');
        setContentEn('');
        fetchArticles();
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article et l’ensemble de ses traductions ?')) return;

    try {
      await fetch(`/api/v1/articles/${id}`, { method: 'DELETE' });
      fetchArticles();
    } catch (err) {
      alert('Impossible de supprimer.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-aurelex-bordeaux">
            Articles & Publications Bilingues
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gestion éditoriale, alertes sur traductions manquantes et statuts de publication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aurelex-bordeaux text-white text-xs font-semibold hover:bg-aurelex-bordeaux-hover transition-colors shadow"
          >
            <Plus className="w-4 h-4 text-aurelex-champagne" />
            <span>Nouvel article</span>
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Chargement des articles...
          </div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            Aucun article n'a été créé pour le moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Titre (FR / EN)</th>
                  <th className="py-3.5 px-4">Traductions Disponibles</th>
                  <th className="py-3.5 px-4">Alerte Traduction</th>
                  <th className="py-3.5 px-4">Date de Création</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((item) => {
                  const frTrans = item.translations.find((t) => t.locale === 'fr');
                  const enTrans = item.translations.find((t) => t.locale === 'en');

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">
                          {frTrans?.title || enTrans?.title || 'Sans titre'}
                        </div>
                        <div className="text-slate-400 font-mono text-[11px]">
                          /{frTrans?.slug || enTrans?.slug}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.hasFr ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            FR {frTrans ? `(${frTrans.status})` : ''}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              item.hasEn ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            EN {enTrans ? `(${enTrans.status})` : ''}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {item.missingTranslations.length > 0 ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            <span>Manque : {item.missingTranslations.join(', ').toUpperCase()}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Bilingue complet</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal: New Article */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <h3 className="font-serif text-xl font-bold text-aurelex-bordeaux">
                Nouvelle Publication Bilingue
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-lg">
                ✕
              </button>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab('FR')}
                className={`px-6 py-2.5 text-xs font-bold transition-all border-b-2 ${
                  activeTab === 'FR'
                    ? 'border-aurelex-bordeaux text-aurelex-bordeaux'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Version Française (FR)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('EN')}
                className={`px-6 py-2.5 text-xs font-bold transition-all border-b-2 ${
                  activeTab === 'EN'
                    ? 'border-aurelex-bordeaux text-aurelex-bordeaux'
                    : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                Version Anglaise (EN)
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              {activeTab === 'FR' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Titre de l'article (FR) *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleFr}
                      onChange={(e) => setTitleFr(e.target.value)}
                      placeholder="Ex : Les atouts fiscaux de la donation-partage"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Slug URL
                    </label>
                    <input
                      type="text"
                      value={slugFr}
                      onChange={(e) => setSlugFr(e.target.value)}
                      placeholder="atouts-fiscaux-donation-partage"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Statut de publication
                    </label>
                    <select
                      value={statusFr}
                      onChange={(e) => setStatusFr(e.target.value as ContentStatus)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    >
                      <option value={ContentStatus.DRAFT}>Brouillon (DRAFT)</option>
                      <option value={ContentStatus.PUBLISHED}>Publié en ligne (PUBLISHED)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Contenu de l'article (FR) *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={contentFr}
                      onChange={(e) => setContentFr(e.target.value)}
                      placeholder="Rédigez l'analyse juridique..."
                      className="w-full p-4 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Article Title (EN)
                    </label>
                    <input
                      type="text"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="Ex: Estate planning benefits of inter-vivos gifts"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slugEn}
                      onChange={(e) => setSlugEn(e.target.value)}
                      placeholder="estate-planning-benefits-gifts"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={statusEn}
                      onChange={(e) => setStatusEn(e.target.value as ContentStatus)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    >
                      <option value={ContentStatus.DRAFT}>Draft</option>
                      <option value={ContentStatus.PUBLISHED}>Published</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Article Content (EN)
                    </label>
                    <textarea
                      rows={6}
                      value={contentEn}
                      onChange={(e) => setContentEn(e.target.value)}
                      placeholder="Write the English version..."
                      className="w-full p-4 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-aurelex-champagne outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-aurelex-bordeaux text-white text-xs font-semibold hover:bg-aurelex-bordeaux-hover shadow"
                >
                  <Save className="w-4 h-4 text-aurelex-champagne" />
                  <span>Enregistrer la publication</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
