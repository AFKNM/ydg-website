'use client'

import { useState } from 'react'
import { Search, Plus, RefreshCw, Sparkles, Globe, ExternalLink, ChevronDown, ChevronUp, Save } from 'lucide-react'

type SeoSetting = {
  route:           string
  metaTitle:       string
  metaDescription: string
  ogImage?:        string | null
  canonicalUrl?:   string | null
  noIndex:         boolean
  keywords:        string[]
}

type Redirect = {
  id:         string
  from:       string
  to:         string
  statusCode: number
}

export function SEOPanelClient({
  initialSettings,
  initialRedirects,
}: {
  initialSettings:  SeoSetting[]
  initialRedirects: Redirect[]
}) {
  const [settings,    setSettings]    = useState<SeoSetting[]>(initialSettings)
  const [redirects,   setRedirects]   = useState<Redirect[]>(initialRedirects)
  const [activeRoute, setActiveRoute] = useState<string | null>(null)
  const [search,      setSearch]      = useState('')
  const [saving,      setSaving]      = useState(false)
  const [generating,  setGenerating]  = useState<string | null>(null)
  const [tab,         setTab]         = useState<'pages' | 'redirects' | 'sitemap'>('pages')
  const [newRoute,    setNewRoute]    = useState('')

  const filtered = settings.filter(s =>
    s.route.toLowerCase().includes(search.toLowerCase()) ||
    s.metaTitle.toLowerCase().includes(search.toLowerCase())
  )

  const updateSetting = (route: string, field: keyof SeoSetting, value: any) => {
    setSettings(prev =>
      prev.map(s => s.route === route ? { ...s, [field]: value } : s)
    )
  }

  const saveSetting = async (route: string) => {
    setSaving(true)
    const setting = settings.find(s => s.route === route)
    try {
      await fetch('/api/v1/admin/seo', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ route, ...setting }),
      })
    } finally {
      setSaving(false)
    }
  }

  const generateAISuggestions = async (route: string) => {
    setGenerating(route)
    try {
      const res = await fetch('/api/v1/ai/seo-suggest', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ route, keywords: [] }),
      })
      const data = await res.json()
      if (data.title)       updateSetting(route, 'metaTitle', data.title)
      if (data.description) updateSetting(route, 'metaDescription', data.description)
    } finally {
      setGenerating(null)
    }
  }

  const generateSitemap = async () => {
    await fetch('/api/v1/admin/seo/sitemap', { method: 'POST' })
    alert('Sitemap gegenereer en ingdien!')
  }

  const addRoute = () => {
    if (!newRoute || settings.find(s => s.route === newRoute)) return
    setSettings(prev => [...prev, {
      route:           newRoute,
      metaTitle:       '',
      metaDescription: '',
      noIndex:         false,
      keywords:        [],
    }])
    setActiveRoute(newRoute)
    setNewRoute('')
  }

  const titleScore = (title: string) => {
    if (!title) return 0
    if (title.length >= 50 && title.length <= 60) return 100
    if (title.length >= 40 && title.length <= 70) return 70
    return 40
  }

  const descScore = (desc: string) => {
    if (!desc) return 0
    if (desc.length >= 150 && desc.length <= 160) return 100
    if (desc.length >= 120 && desc.length <= 180) return 70
    return 40
  }

  const overallScore = (s: SeoSetting) => {
    const scores = [titleScore(s.metaTitle), descScore(s.metaDescription)]
    if (s.keywords.length > 0) scores.push(80)
    if (s.ogImage) scores.push(100)
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }

  const scoreColor = (score: number) =>
    score >= 80 ? '#10B981' : score >= 50 ? '#F59E0B' : '#EF4444'

  return (
    <div className="p-6 max-w-5xl">

      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-2">Admin Paneel</p>
        <h1 className="font-grotesk text-3xl font-700 tracking-tight">SEO Bestuur</h1>
        <p className="text-sm text-[#8C8C8C] mt-1">
          Beheer meta-tags, omleidings, en sitekaart vir alle bladsye.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E2E2] mb-6">
        {(['pages', 'redirects', 'sitemap'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t
                ? 'border-[#0057FF] text-[#0057FF]'
                : 'border-transparent text-[#8C8C8C] hover:text-[#0A0A0A]'
            }`}
          >
            {t === 'pages' ? 'Bladsye' : t === 'redirects' ? 'Omleidings' : 'Sitekaart'}
          </button>
        ))}
      </div>

      {/* PAGES TAB */}
      {tab === 'pages' && (
        <div>
          {/* Search + Add */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8C8C8C]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Soek bladsye..."
                className="ydg-input pl-9 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <input
                value={newRoute}
                onChange={e => setNewRoute(e.target.value)}
                placeholder="/nuwe-bladsy"
                className="ydg-input text-sm w-48"
                onKeyDown={e => e.key === 'Enter' && addRoute()}
              />
              <button onClick={addRoute} className="btn btn-outline px-3">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Settings List */}
          <div className="space-y-2">
            {filtered.map(setting => {
              const score = overallScore(setting)
              const isOpen = activeRoute === setting.route

              return (
                <div key={setting.route} className="border border-[#E2E2E2] bg-white">
                  {/* Row Header */}
                  <button
                    className="w-full flex items-center gap-4 p-4 text-left hover:bg-[#F4F4F4] transition-colors"
                    onClick={() => setActiveRoute(isOpen ? null : setting.route)}
                  >
                    <Globe size={14} className="text-[#8C8C8C] shrink-0" />
                    <span className="font-grotesk text-sm font-600 flex-1 truncate">
                      {setting.route}
                    </span>
                    {setting.metaTitle && (
                      <span className="text-xs text-[#8C8C8C] truncate max-w-xs hidden md:block">
                        {setting.metaTitle}
                      </span>
                    )}
                    {/* SEO Score */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 h-1.5 bg-[#F4F4F4]">
                        <div
                          className="h-full transition-all"
                          style={{ width: `${score}%`, background: scoreColor(score) }}
                        />
                      </div>
                      <span className="text-xs font-medium w-8" style={{ color: scoreColor(score) }}>
                        {score}
                      </span>
                    </div>
                    {isOpen ? <ChevronUp size={14} className="text-[#8C8C8C]" /> : <ChevronDown size={14} className="text-[#8C8C8C]" />}
                  </button>

                  {/* Expanded Editor */}
                  {isOpen && (
                    <div className="border-t border-[#E2E2E2] p-5 space-y-4">
                      {/* AI Generate */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://yourdigitalguy.co.za${setting.route}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-[#0057FF] flex items-center gap-1 hover:underline"
                          >
                            Bekyk Bladsy <ExternalLink size={11} />
                          </a>
                        </div>
                        <button
                          onClick={() => generateAISuggestions(setting.route)}
                          disabled={generating === setting.route}
                          className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                        >
                          <Sparkles size={13} className={generating === setting.route ? 'animate-spin' : ''} />
                          AI Genereer
                        </button>
                      </div>

                      {/* Meta Title */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-600 text-[#0A0A0A] uppercase tracking-wider">
                            Meta Titel
                          </label>
                          <span className={`text-xs ${
                            setting.metaTitle.length > 60 || setting.metaTitle.length < 40
                              ? 'text-[#EF4444]' : 'text-[#10B981]'
                          }`}>
                            {setting.metaTitle.length}/60 karakters
                          </span>
                        </div>
                        <input
                          value={setting.metaTitle}
                          onChange={e => updateSetting(setting.route, 'metaTitle', e.target.value)}
                          className="ydg-input text-sm"
                          placeholder="Titel vir soekenjins (50-60 karakters)"
                        />
                      </div>

                      {/* Meta Description */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-600 text-[#0A0A0A] uppercase tracking-wider">
                            Meta Beskrywing
                          </label>
                          <span className={`text-xs ${
                            setting.metaDescription.length > 160 || setting.metaDescription.length < 120
                              ? 'text-[#EF4444]' : 'text-[#10B981]'
                          }`}>
                            {setting.metaDescription.length}/160 karakters
                          </span>
                        </div>
                        <textarea
                          value={setting.metaDescription}
                          onChange={e => updateSetting(setting.route, 'metaDescription', e.target.value)}
                          className="ydg-input text-sm resize-none"
                          rows={3}
                          placeholder="Beskrywing vir soekenjins (150-160 karakters)"
                        />
                      </div>

                      {/* Canonical URL */}
                      <div>
                        <label className="text-xs font-600 text-[#0A0A0A] uppercase tracking-wider block mb-1.5">
                          Kanonieke URL (opsioneel)
                        </label>
                        <input
                          value={setting.canonicalUrl ?? ''}
                          onChange={e => updateSetting(setting.route, 'canonicalUrl', e.target.value)}
                          className="ydg-input text-sm"
                          placeholder="https://yourdigitalguy.co.za/..."
                        />
                      </div>

                      {/* Keywords */}
                      <div>
                        <label className="text-xs font-600 text-[#0A0A0A] uppercase tracking-wider block mb-1.5">
                          Sleutelwoorde
                        </label>
                        <input
                          value={setting.keywords.join(', ')}
                          onChange={e => updateSetting(setting.route, 'keywords', e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                          className="ydg-input text-sm"
                          placeholder="SEO, Google Ads, digitale bemarking, ..."
                        />
                      </div>

                      {/* Options row */}
                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-sm text-[#8C8C8C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={setting.noIndex}
                            onChange={e => updateSetting(setting.route, 'noIndex', e.target.checked)}
                            className="w-4 h-4"
                          />
                          noindex (verberg van soekenjins)
                        </label>
                        <button
                          onClick={() => saveSetting(setting.route)}
                          disabled={saving}
                          className="btn btn-primary text-xs py-2 px-4"
                        >
                          <Save size={13} />
                          {saving ? 'Stoor...' : 'Stoor'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* REDIRECTS TAB */}
      {tab === 'redirects' && (
        <div>
          <div className="grid grid-cols-[1fr_1fr_80px_40px] gap-3 text-xs font-700 uppercase tracking-wider text-[#8C8C8C] mb-3 px-2">
            <span>Van</span><span>Na</span><span>Kode</span><span></span>
          </div>
          {redirects.map(r => (
            <div key={r.id} className="grid grid-cols-[1fr_1fr_80px_40px] gap-3 items-center border border-[#E2E2E2] p-3 mb-2 bg-white">
              <span className="text-sm font-grotesk font-600">{r.from}</span>
              <span className="text-sm text-[#8C8C8C]">{r.to}</span>
              <span className="ydg-tag">{r.statusCode}</span>
              <button className="text-[#EF4444] text-xs hover:underline">Vee uit</button>
            </div>
          ))}
          {redirects.length === 0 && (
            <p className="text-sm text-[#8C8C8C] py-8 text-center">Geen omleidings nie</p>
          )}
        </div>
      )}

      {/* SITEMAP TAB */}
      {tab === 'sitemap' && (
        <div className="space-y-6">
          <div className="ydg-card">
            <h3 className="font-grotesk text-base font-600 mb-3">Sitekaart Genereer</h3>
            <p className="text-sm text-[#8C8C8C] mb-4">
              Genereer 'n nuwe XML-sitekaart gebaseer op alle gepubliseerde bladsye en dienste.
              Dit word outomaties by Google Search Console ingedien.
            </p>
            <button onClick={generateSitemap} className="btn btn-primary">
              <RefreshCw size={14} />
              Genereer &amp; Indien Sitekaart
            </button>
          </div>
          <div className="ydg-card">
            <h3 className="font-grotesk text-base font-600 mb-2">Huidige Sitekaart</h3>
            <a
              href="/sitemap.xml"
              target="_blank"
              className="text-sm text-[#0057FF] flex items-center gap-1 hover:underline"
            >
              yourdigitalguy.co.za/sitemap.xml <ExternalLink size={13} />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
