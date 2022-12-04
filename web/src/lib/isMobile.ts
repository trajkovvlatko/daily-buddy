export const isMobile = () => {
  return typeof window !== 'undefined' && /Android|iPhone/i.test(window.navigator.userAgent);
};
