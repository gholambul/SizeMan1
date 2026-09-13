import React from 'react';
import { Globe, Ruler, Moon, Sun, Mail, ShieldCheck, HelpCircle, Info } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import { LANGUAGES, Language, UnitSystem } from '@/i18n/translations';
import BottomNav from '@/components/BottomNav';
import { cn } from '@/lib/utils';

const Settings: React.FC = () => {
  const { t, language, setLanguage, unit, setUnit, theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/40 px-6 pb-28 pt-8">
      <h1 className="text-2xl">{t('settings.title')}</h1>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">{t('settings.tabGeneral')}</TabsTrigger>
          <TabsTrigger value="about">{t('settings.tabAbout')}</TabsTrigger>
          <TabsTrigger value="privacy">{t('settings.tabPrivacy')}</TabsTrigger>
          <TabsTrigger value="help">{t('settings.tabHelp')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-5 flex flex-col gap-4">
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Globe className="h-4 w-4 text-primary" />
              {t('settings.languageLabel')}
            </div>
            <div className="flex flex-col gap-2">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code as Language)}
                  dir={l.dir}
                  className={cn(
                    'flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition-colors cursor-pointer',
                    language === l.code
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/40'
                  )}
                >
                  <span>{l.nativeName}</span>
                  {language === l.code && <span className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Ruler className="h-4 w-4 text-primary" />
              {t('settings.unitsLabel')}
            </div>
            <div className="flex gap-2">
              {(['cm', 'in'] as UnitSystem[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={cn(
                    'flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer',
                    unit === u
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/40'
                  )}
                >
                  {u === 'cm' ? t('results.cmUnit') : t('results.inUnit')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 text-primary" />
              ) : (
                <Sun className="h-4 w-4 text-primary" />
              )}
              {t('settings.themeLabel')}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {theme === 'dark' ? t('settings.themeDark') : t('settings.themeLight')}
              </span>
              <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Info className="h-5 w-5 text-primary" />
              {t('about.title')}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t('about.body')}</p>
            <div className="mt-5 rounded-xl bg-secondary p-4">
              <p className="text-xs font-semibold text-secondary-foreground">
                {t('about.contactTitle')}
              </p>
              <p className="mt-1 text-xs text-secondary-foreground/80">{t('about.contactBody')}</p>
              <a
                href={`mailto:${t('about.email')}`}
                className="mt-2 flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Mail className="h-4 w-4" />
                {t('about.email')}
              </a>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" />
              {t('privacy.title')}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t('privacy.intro')}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {(t('privacy.points') as string[]).map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="help" className="mt-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <HelpCircle className="h-5 w-5 text-primary" />
              {t('help.title')}
            </div>
            <Accordion type="single" collapsible className="mt-4">
              {(t('help.faq') as { q: string; a: string }[]).map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-start text-sm">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  );
};

export default Settings;