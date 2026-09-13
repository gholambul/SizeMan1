import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Ruler, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/contexts/AppContext';
import { MeasureMode } from '@/i18n/translations';
import { cn } from '@/lib/utils';

const ModeSelect: React.FC = () => {
  const { t, mode, setMode, heightCm, setHeightCm } = useApp();
  const navigate = useNavigate();
  const [heightInput, setHeightInput] = useState<string>(heightCm ? String(heightCm) : '');
  const [touched, setTouched] = useState(false);

  const height = parseFloat(heightInput);
  const heightValid = !Number.isNaN(height) && height >= 100 && height <= 230;

  const handleSelectMode = (m: MeasureMode) => {
    setMode(m);
  };

  const handleStart = () => {
    setTouched(true);
    if (!heightValid) return;
    setHeightCm(height);
    navigate('/capture');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/40 px-6 py-10">
      <h1 className="text-2xl">{t('mode.chooseTitle')}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t('mode.chooseSubtitle')}</p>

      <div className="mt-6 flex flex-col gap-4">
        <button
          type="button"
          onClick={() => handleSelectMode('normal')}
          className={cn(
            'relative flex flex-col gap-2 rounded-2xl border-2 p-5 text-start transition-all duration-200 cursor-pointer',
            mode === 'normal' ? 'border-primary bg-primary/5' : 'border-border bg-card hover:border-primary/30'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2.5 text-primary">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="text-lg">{t('mode.normalTitle')}</h3>
            </div>
            {mode === 'normal' && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{t('mode.normalDesc')}</p>
          <span className="mt-1 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {t('mode.normalBadge')}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleSelectMode('professional')}
          className={cn(
            'relative flex flex-col gap-2 rounded-2xl border-2 p-5 text-start transition-all duration-200 cursor-pointer',
            mode === 'professional'
              ? 'border-primary bg-primary/5'
              : 'border-border bg-card hover:border-primary/30'
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent p-2.5 text-accent-foreground">
                <Ruler className="h-5 w-5" />
              </div>
              <h3 className="text-lg">{t('mode.proTitle')}</h3>
            </div>
            {mode === 'professional' && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{t('mode.proDesc')}</p>
          <span className="mt-1 inline-flex w-fit rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            {t('mode.proBadge')}
          </span>
        </button>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-5">
        <Label htmlFor="height" className="text-base font-semibold">
          {t('mode.heightTitle')}
        </Label>
        <p className="mt-1 text-xs text-muted-foreground">{t('mode.heightSubtitle')}</p>
        <div className="mt-4 flex items-center gap-3">
          <Input
            id="height"
            type="number"
            inputMode="numeric"
            placeholder={t('mode.heightPlaceholder')}
            value={heightInput}
            onChange={(e) => setHeightInput(e.target.value)}
            className="text-lg"
          />
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {t('mode.heightUnitCm')}
          </span>
        </div>
        {touched && !heightValid && (
          <p className="mt-2 text-xs text-destructive">{t('common.required')}</p>
        )}
      </div>

      <div className="mt-8">
        <Button size="lg" className="w-full text-base" onClick={handleStart}>
          {t('mode.startCapture')}
        </Button>
      </div>
    </div>
  );
};

export default ModeSelect;