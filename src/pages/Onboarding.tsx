import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ShieldCheck, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LANGUAGES, Language } from '@/i18n/translations';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const WELCOME_IMG =
  'https://mgx-backend-cdn.metadl.com/generate/images/1477509/2026-08-17/uufirwiaaj7q/onboarding-welcome-figure-abstract.png';
const CAMERA_IMG =
  'https://mgx-backend-cdn.metadl.com/generate/images/1477509/2026-08-17/uufisricakbq/onboarding-camera-guide-abstract.png';
const PRIVACY_IMG =
  'https://mgx-backend-cdn.metadl.com/generate/images/1477509/2026-08-17/uufis6acakaq/onboarding-privacy-shield-abstract.png';

type Step = 'language' | 'welcome' | 'howItWorks' | 'privacy';

const Onboarding: React.FC = () => {
  const { language, setLanguage, t, setHasOnboarded } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('language');

  const steps: Step[] = ['language', 'welcome', 'howItWorks', 'privacy'];
  const stepIndex = steps.indexOf(step);

  const goNext = () => {
    const idx = steps.indexOf(step);
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1]);
    } else {
      setHasOnboarded(true);
      navigate('/mode');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-secondary/40">
      {/* progress dots */}
      <div className="flex justify-center gap-1.5 pt-8">
        {steps.map((s, i) => (
          <div
            key={s}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === stepIndex ? 'w-8 bg-primary' : 'w-4 bg-border'
            )}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        {step === 'language' && (
          <div className="w-full max-w-sm animate-in fade-in duration-500">
            <h1 className="text-center text-2xl">{t('language.selectTitle')}</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t('language.selectSubtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code as Language)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl border-2 px-5 py-4 text-lg font-medium transition-all duration-200 cursor-pointer',
                    language === l.code
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                  dir={l.dir}
                >
                  <span>{l.nativeName}</span>
                  {language === l.code && (
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'welcome' && (
          <div className="w-full max-w-sm animate-in fade-in duration-500 text-center">
            <img
              src={WELCOME_IMG}
              alt=""
              className="mx-auto h-56 w-56 object-contain drop-shadow-sm"
            />
            <h1 className="mt-6 text-2xl">{t('onboarding.welcomeTitle')}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('onboarding.welcomeSubtitle')}
            </p>
          </div>
        )}

        {step === 'howItWorks' && (
          <div className="w-full max-w-sm animate-in fade-in duration-500 text-center">
            <img
              src={CAMERA_IMG}
              alt=""
              className="mx-auto h-56 w-56 object-contain drop-shadow-sm"
            />
            <h1 className="mt-6 text-2xl">{t('onboarding.modesTitle')}</h1>
            <div className="mt-6 flex flex-col gap-3 text-start">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{t('mode.normalTitle')}</p>
                  <p className="text-xs text-muted-foreground">{t('onboarding.normalHint')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                <div className="rounded-full bg-accent p-2 text-accent-foreground">
                  <Ruler className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{t('mode.proTitle')}</p>
                  <p className="text-xs text-muted-foreground">{t('onboarding.proHint')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'privacy' && (
          <div className="w-full max-w-sm animate-in fade-in duration-500 text-center">
            <img
              src={PRIVACY_IMG}
              alt=""
              className="mx-auto h-56 w-56 object-contain drop-shadow-sm"
            />
            <h1 className="mt-6 flex items-center justify-center gap-2 text-2xl">
              <ShieldCheck className="h-6 w-6 text-primary" />
              {t('privacy.title')}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t('capture.privacyNotice')}
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pb-10 safe-bottom">
        <Button size="lg" className="w-full text-base" onClick={goNext}>
          {step === 'privacy' ? t('onboarding.getStarted') : t('common.next')}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;