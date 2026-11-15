import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const HEADLINE = 'Muneeb Moosa initializing...';
const TYPING_SPEED = 90;

const Loader = ({ backendReady = false, exiting = false, onExited }) => {
  const rootRef = useRef(null);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setTypedText(HEADLINE.slice(0, index));

      if (index >= HEADLINE.length) {
        clearInterval(interval);
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(rootRef.current, { opacity: 0, duration: 0.45 })
        .from('.loader__emblem', { scale: 0.75, opacity: 0, duration: 0.7 }, '-=0.15')
        .from('.loader__title', { y: 26, opacity: 0, duration: 0.6 }, '-=0.35')
        .from('.loader__meta > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.12 }, '-=0.3');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!exiting) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.in' },
        onComplete: () => onExited?.(),
      });

      tl.to('.loader__content', { y: -18, opacity: 0, duration: 0.35 })
        .to(rootRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.1');
    }, rootRef);

    return () => ctx.revert();
  }, [exiting, onExited]);

  return (
    <div
      ref={rootRef}
      className="loader"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
        background: '#0b0a0d',
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loader__backdrop" aria-hidden="true" />

      <div className="loader__content">
        <div className="loader__emblem" aria-hidden="true">
          <span className="loader__ring loader__ring--outer" />
          <span className="loader__ring loader__ring--inner" />
          <span className="loader__orbit" />
          <span className="loader__core">MM</span>
        </div>

        <h1 className="loader__title">
          <span className="loader__typed">{typedText}</span>
          <span className="loader__cursor" aria-hidden="true">
            _
          </span>
        </h1>

        <div className="loader__meta">
          <div className={`loader__status ${backendReady ? 'is-ready' : ''}`}>
            <span className="loader__dot" />
            <span>{backendReady ? 'Server ready' : 'Connecting to server'}</span>
          </div>

          <div className="loader__progress" aria-hidden="true">
            <span className={`loader__progress-bar ${backendReady ? 'is-ready' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
