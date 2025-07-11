import { MDXEditorMethods } from '@mdxeditor/editor';
import { useEffect, useRef } from 'react';
import { Editor } from 'src/components/Editor/Editor';

const key = 'scratch-pad';
const get = () => localStorage.getItem(key) ?? '';
const set = (value: string) => localStorage.setItem(key, value);

const ScratchPadPage = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const value = editorRef.current?.getMarkdown();
      if (value === get()) return;

      set(value);
    }, 2000);

    return () => clearInterval(interval);
  }, [editorRef]);

  return (
    <div className="ml-3 mr-3 bg-gray-100 pt-0 md:ml-6 md:mr-6 md:min-h-screen">
      <div className="mb-6 h-[90vh] bg-white p-6 shadow-lg md:grid md:h-[95vh]">
        <Editor content={get()} editorRef={editorRef} />
      </div>
    </div>
  );
};

export default ScratchPadPage;
