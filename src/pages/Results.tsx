import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, ShieldAlert, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useApp } from '@/contexts/AppContext';
import BottomNav from '@/components/BottomNav';
import { FitPreference } from '@/i18n/translations';
import { cn } from '@/lib/utils';

interface MeasurementItem {
  key: string;
  cm: number;
  confidence: 'high' | 'medium' | 'low';
  error_range_cm: number;
}

interface SizeEntry {
  category: string;
  US: string;
  EU: string;
  UK: string;
  Asian: string;
  Intl: string;
}

interface AnalysisResult {
  mode: 'normal' | 'professional';
  measurements: MeasurementItem[];
  sizes: Record<FitPreference, SizeEntry[]>;
}

const CONFIDENCE_STYLES: Record<string, string> = {
  high: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  low: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

const CATEGORY_KEY_MAP: Record<string, string> = {
  tops: 'categoryTops',
  bottoms: 'categoryBottoms',
  outerwear: 'categoryOuterwear',
  dresses: 'categoryDresses',
  formal: 'categoryFormal',
  sportswear: 'categorySportswear',
  underwear: 'categoryUnderwear',
};

const Results: React.FC = () => {
  const { t, unit, fitPreference, setFitPreference } = useApp();
  const navigate = useNavigate();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [edited, setEdited] = useState<Record<string, number>>({});
  const [editingKey, setEditingKey] = useState<string | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('mysize_last_result');
    if (raw) {
      try {
        setResult(JSON.parse(raw));
      } catch {
        setResult(null);
      }
    }
  }, []);

  const toDisplayUnit = (cm: number) => {
    if (unit === 'in') return (cm / 2.54).toFixed(1);
    return cm.toFixed(1);
  };

  const unitLabel = unit === 'in' ? t('results.inUnit') : t('results.cmUnit');

  const currentSizes = result?.sizes?.[fitPreference] || [];

  if (!result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-8 text-center">
        <p className="text-muted-foreground">{t('errors.genericError')}</p>
        <Button onClick={() => navigate('/mode')} className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          {t('common.newMeasurement')}
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/40 pb-28">
      <div className="px-6 pt-8">
        <h1 className="text-2xl">{t('results.title')}</h1>

        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <p className="text-xs leading-relaxed">{t('results.disclaimer')}</p>
        </div>
      </div>

      <div className="mt-6 px-6">
        <h2>{t('results.measurementsTitle')}</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {result.measurements.map((m) => {
            const displayVal = edited[m.key] ?? Number(toDisplayUnit(m.cm));
            const isEditing = editingKey === m.key;
            return (
              <div
                key={m.key}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {t(`results.measurementNames.${m.key}`) || m.key}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingKey(isEditing ? null : m.key)}
                    className="text-muted-foreground hover:text-primary cursor-pointer"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </div>
                {isEditing ? (
                  <Input
                    type="number"
                    autoFocus
                    defaultValue={displayVal}
                    onBlur={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!Number.isNaN(val)) {
                        setEdited((prev) => ({ ...prev, [m.key]: val }));
                      }
                      setEditingKey(null);
                    }}
                    className="mt-1 h-9 text-lg font-semibold"
                  />
                ) : (
                  <p className="mt-1 text-2xl font-semibold tabular-nums">
                    {displayVal}
                    <span className="ms-1 text-sm font-normal text-muted-foreground">
                      {unitLabel}
                    </span>
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-medium',
                      CONFIDENCE_STYLES[m.confidence]
                    )}
                  >
                    {t(`results.confidence${m.confidence.charAt(0).toUpperCase()}${m.confidence.slice(1)}`)}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    ± {toDisplayUnit(m.error_range_cm)} {unitLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t('results.resultsFooterNote')}</p>
      </div>

      <div className="mt-8 px-6">
        <div className="flex items-center justify-between">
          <h2>{t('results.sizeChartTitle')}</h2>
          <Select value={fitPreference} onValueChange={(v) => setFitPreference(v as FitPreference)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t('results.fitLabel')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slim">{t('results.fitSlim')}</SelectItem>
              <SelectItem value="regular">{t('results.fitRegular')}</SelectItem>
              <SelectItem value="relaxed">{t('results.fitRelaxed')}</SelectItem>
              <SelectItem value="oversized">{t('results.fitOversized')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {currentSizes.map((entry) => (
            <div key={entry.category} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
              <h3 className="text-sm font-semibold">
                {t(`results.${CATEGORY_KEY_MAP[entry.category] || 'categoryTops'}`)}
              </h3>
              <div className="mt-3 grid grid-cols-5 gap-2 text-center">
                {(['US', 'EU', 'UK', 'Asian', 'Intl'] as const).map((sys) => (
                  <div key={sys} className="rounded-xl bg-secondary p-2">
                    <p className="text-[10px] text-secondary-foreground/70">
                      {t(`results.system${sys}`)}
                    </p>
                    <p className="text-sm font-semibold text-secondary-foreground">{entry[sys]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 px-6">
        <Button
          variant="outline"
          className="w-full gap-2 !bg-transparent"
          onClick={() => navigate('/mode')}
        >
          <RefreshCcw className="h-4 w-4" />
          {t('common.newMeasurement')}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Results;