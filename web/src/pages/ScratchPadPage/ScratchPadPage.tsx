import { useEffect, useState } from 'react';

import MarkdownEditor from '@uiw/react-markdown-editor';

import { toolbars } from 'src/shared';

const key = 'scratch-pad';
const get = () => localStorage.getItem(key) ?? '';
const set = (value: string) => localStorage.setItem(key, value);

const ScratchPadPage = () => {
  const [value, setMarkdown] = useState(get());

  useEffect(() => {
    const interval = setInterval(() => {
      if (value === get()) return;

      set(value);
    }, 2000);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="scratch-pad ml-3 mr-3 bg-gray-100 pt-0 md:ml-6 md:mr-6 md:min-h-screen">
      <div className="mb-6 h-[90vh] bg-white p-6 shadow-lg md:grid md:h-[95vh]">
        <MarkdownEditor
          value={value}
          onChange={(value) => setMarkdown(value)}
          enableScroll={true}
          toolbars={toolbars}
        />
      </div>
    </div>
  );
};

export default ScratchPadPage;
