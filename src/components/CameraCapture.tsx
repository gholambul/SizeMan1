import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, RotateCcw, Check, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

interface CameraCaptureProps {
  title: string;
  instructionBody: string;
  onCaptured: (dataUri: string) => void;
  onCancel?: () => void;
}

/**
 * Full-screen guided camera capture component.
 * Provides a live camera preview with a body-framing guide overlay,
 * a 3-2-1 countdown, retake option, and a gallery-upload fallback
 * when camera access is unavailable.
 */
const CameraCapture: React.FC<CameraCaptureProps> = ({
  title,
  instructionBody,
  onCaptured,
  onCancel,
}) => {
  const { t } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [framingOk, setFramingOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1440 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((tr) => tr.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setCameraReady(true);
      } catch {
        setCameraError(true);
      }
    }
    startCamera();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
    };
  }, []);

  // Simulated real-time framing feedback (green/red guide state) toggling
  // to encourage the user to hold steady inside the guide frame.
  useEffect(() => {
    if (!cameraReady) return;
    const interval = setInterval(() => {
      setFramingOk((prev) => (Math.random() > 0.3 ? true : prev));
    }, 700);
    return () => clearInterval(interval);
  }, [cameraReady]);

  const takeSnapshot = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 960;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/jpeg', 0.9);
    setCapturedImage(dataUri);
  }, []);

  const startCountdown = useCallback(() => {
    setCountdown(3);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      takeSnapshot();
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 800);
    return () => clearTimeout(timer);
  }, [countdown, takeSnapshot]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCapturedImage(String(reader.result));
    reader.readAsDataURL(file);
  }, []);

  const handleRetake = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (capturedImage) onCaptured(capturedImage);
  }, [capturedImage, onCaptured]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 safe-bottom">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-black/40 p-2 text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <div />
        )}
        <div className="rounded-full bg-black/40 px-4 py-1.5 text-sm font-medium text-white">
          {title}
        </div>
        <div className="w-9" />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {!capturedImage ? (
        <>
          <div className="relative flex-1 overflow-hidden">
            {cameraError ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center text-white">
                <Camera className="h-12 w-12 opacity-60" />
                <p className="text-sm opacity-80">{t('capture.cameraNotAvailable')}</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                style={{ transform: 'scaleX(-1)' }}
                muted
                playsInline
              />
            )}

            {/* Body framing guide overlay */}
            {!cameraError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className="h-[78%] w-[46%] rounded-[40%] border-[3px] transition-colors duration-300"
                  style={{
                    borderColor: framingOk ? 'rgba(34,197,94,0.9)' : 'rgba(248,113,113,0.9)',
                  }}
                />
              </div>
            )}

            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="text-8xl font-bold text-white drop-shadow-lg">{countdown}</span>
              </div>
            )}

            {!cameraError && (
              <div className="absolute top-20 left-0 right-0 flex justify-center">
                <span
                  className={
                    'rounded-full px-4 py-1.5 text-xs font-medium text-white ' +
                    (framingOk ? 'bg-green-500/80' : 'bg-red-500/80')
                  }
                >
                  {framingOk ? t('capture.frameGood') : t('capture.frameAdjust')}
                </span>
              </div>
            )}
          </div>

          <div className="z-20 bg-gradient-to-t from-black/90 to-transparent p-6 pb-10 text-center safe-bottom">
            <p className="mb-4 text-sm text-white/90">{instructionBody}</p>
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-white/15 p-3 text-white cursor-pointer"
              >
                <Upload className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={startCountdown}
                disabled={cameraError || countdown !== null}
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-white/20 text-white disabled:opacity-40 cursor-pointer"
              >
                <div className="h-12 w-12 rounded-full bg-white" />
              </button>
              <div className="w-11" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 overflow-hidden">
            <img src={capturedImage} alt="captured" className="h-full w-full object-cover" />
          </div>
          <div className="z-20 flex items-center justify-center gap-4 bg-black/90 p-6 pb-10 safe-bottom">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="!bg-transparent gap-2 border-white/40 text-white hover:!bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              {t('capture.retakePhoto')}
            </Button>
            <Button onClick={handleConfirm} className="gap-2">
              <Check className="h-4 w-4" />
              {t('capture.usePhoto')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;