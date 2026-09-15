import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@metagptx/web-sdk';
import { Loader2, ShieldCheck } from 'lucide-react';
import CameraCapture from '@/components/CameraCapture';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const client = createClient();

type PhotoKey = 'front' | 'side' | 'back';

const Capture: React.FC = () => {
  const { t, mode, heightCm, setMode } = useApp();
  const navigate = useNavigate();

  const requiredSteps: PhotoKey[] = useMemo(
    () => (mode === 'professional' ? ['front', 'side', 'back'] : ['front']),
    [mode]
  );

  const [stepIdx, setStepIdx] = useState(0);
  const [photos, setPhotos] = useState<Partial<Record<PhotoKey, string>>>({});
  const [analyzing, setAnalyzing] = useState(false);

  const currentKey = requiredSteps[stepIdx];

  const stepMeta: Record<PhotoKey, { title: string; body: string }> = {
    front: { title: t('capture.front'), body: t('capture.frontInstructionBody') },
    side: { title: t('capture.side'), body: t('capture.sideInstructionBody') },
    back: { title: t('capture.back'), body: t('capture.backInstructionBody') },
  };

  const runAnalysis = useCallback(
    async (finalPhotos: Partial<Record<PhotoKey, string>>) => {
      setAnalyzing(true);
      try {
        const response = await client.apiCall.invoke({
          url: 'https://sizemanbackend-production.up.railway.app/api/v1/measurement/analyze',
          method: 'POST',
          data: {
            mode,
            height_cm: heightCm,
            front_image: finalPhotos.front,
            side_image: finalPhotos.side || null,
            back_image: finalPhotos.back || null,
          },
          options: { timeout: 600_000 },
        });
        sessionStorage.setItem('mysize_last_result', JSON.stringify(response.data));
        navigate('/results');
      } catch (e: any) {
        const detail =
          e?.data?.detail || e?.response?.data?.detail || e?.message || t('capture.analysisFailed');
        toast.error(detail);
        setAnalyzing(false);
      }
    },
    [mode, heightCm, navigate, t]
  );

  const handleCaptured = useCallback(
    (dataUri: string) => {
      const nextPhotos = { ...photos, [currentKey]: dataUri };
      setPhotos(nextPhotos);
      if (stepIdx < requiredSteps.length - 1) {
        setStepIdx((i) => i + 1);
      } else {
        runAnalysis(nextPhotos);
      }
    },
    [photos, currentKey, stepIdx, requiredSteps.length, runAnalysis]
  );

  const handleCancel = useCallback(() => {
    navigate('/mode');
  }, [navigate]);

  if (!heightCm) {
    // Height is mandatory for calibration; send back to mode/height step.
    navigate('/mode');
    return null;
  }

  if (analyzing) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-background px-8 text-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        <h2 className="text-xl">{t('capture.analyzingTitle')}</h2>
        <p className="max-w-xs text-sm text-muted-foreground">{t('capture.analyzingHint')}</p>
        <div className="mt-2 flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs text-secondary-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          {t('capture.privacyNotice')}
        </div>
      </div>
    );
  }

  return (
    <CameraCapture
      title={`${t('capture.stepOf', { current: stepIdx + 1, total: requiredSteps.length })} · ${stepMeta[currentKey].title}`}
      instructionBody={stepMeta[currentKey].body}
      onCaptured={handleCaptured}
      onCancel={handleCancel}
    />
  );
};

export default Capture;
