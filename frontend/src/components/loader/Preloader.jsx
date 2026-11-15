import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from './Loader';
import { hasSeenPreloader, markPreloaderSeen } from './preloaderStorage';
import { API_BASE_URL } from '../../services/portfolioApi';

const MIN_DISPLAY_MS = 3000;
const HEALTH_RETRY_MS = 1500;
const HEALTH_URL = `${API_BASE_URL.replace(/\/$/, '')}/health`;

const Preloader = ({ onDone }) => {
  const [phase, setPhase] = useState(() =>
    hasSeenPreloader() ? 'idle' : 'loading'
  );
  const [backendReady, setBackendReady] = useState(false);
  const startedAtRef = useRef(0);

  useEffect(() => {
    if (phase === 'loading') {
      startedAtRef.current = Date.now();
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== 'loading') return undefined;

    let cancelled = false;
    const controller = new AbortController();

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const checkHealth = async () => {
      while (!cancelled) {
        try {
          const response = await fetch(HEALTH_URL, {
            signal: controller.signal,
            cache: 'no-store',
          });

          if (response.ok) {
            if (!cancelled) setBackendReady(true);
            return;
          }
        } catch {
          // Backend is unreachable; keep retrying.
        }

        if (cancelled) return;
        await wait(HEALTH_RETRY_MS);
      }
    };

    checkHealth();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'loading' || !backendReady) return undefined;

    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
    const timeout = setTimeout(() => setPhase('exiting'), remaining);

    return () => clearTimeout(timeout);
  }, [phase, backendReady]);

  useEffect(() => {
    if (phase !== 'loading' && phase !== 'exiting') return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [phase]);

  const handleExited = useCallback(() => {
    markPreloaderSeen();
    onDone?.();
    setPhase('done');
  }, [onDone]);

  if (phase === 'idle' || phase === 'done') return null;

  return (
    <Loader
      backendReady={backendReady}
      exiting={phase === 'exiting'}
      onExited={handleExited}
    />
  );
};

export default Preloader;
