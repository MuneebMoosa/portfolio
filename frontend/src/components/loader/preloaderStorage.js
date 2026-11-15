const SEEN_KEY = 'portfolio:preloader-seen';

export const hasSeenPreloader = () => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};

export const markPreloaderSeen = () => {
  try {
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    // Ignore storage access errors (private mode, disabled storage).
  }
};
