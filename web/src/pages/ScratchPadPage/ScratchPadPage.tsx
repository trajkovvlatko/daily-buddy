import { toast } from '@redwoodjs/web/dist/toast';
import { useEffect, useRef } from 'react';

const key = 'scratch-pad';
const get = () => localStorage.getItem(key);
const set = (value: string) => localStorage.setItem(key, value);

const ScratchPadPage = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (!textAreaRef.current) return;

    const value = get();
    if (!value) return;

    textAreaRef.current.value = value;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!textAreaRef.current) return;

      const value = textAreaRef.current.value.trim();
      if (!value || value === get()) return;

      set(value);
      toast.success('Saved.');
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scratch-pad ml-6 mr-6 min-h-screen bg-gray-100 pt-0 md:pt-6">
      <div className="mb-6 min-h-[95vh] bg-white p-6 shadow-lg md:grid">
        <textarea className="w-90vw h-full" ref={textAreaRef}></textarea>
      </div>
    </div>
  );
};

export default ScratchPadPage;
