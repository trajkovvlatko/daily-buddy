import { useEffect } from 'react';

import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

const key = 'scratch-pad';
const get = () => localStorage.getItem(key) ?? '';
const set = (value: string) => localStorage.setItem(key, value);

const ScratchPadPage = () => {
  const editor = useCreateBlockNote({ initialContent: [{ id: 'scratchPad' }] });

  useEffect(() => {
    editor.tryParseMarkdownToBlocks(get()).then((parsed) => {
      editor.insertBlocks(parsed, { id: 'scratchPad' });
    });
  }, [editor]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const value = await editor.blocksToMarkdownLossy(editor.document);
      if (value === get()) return;

      set(value);
    }, 2000);

    return () => clearInterval(interval);
  }, [editor]);

  return (
    <div className="ml-3 mr-3 bg-gray-100 pt-0 md:ml-6 md:mr-6 md:min-h-screen">
      <div className="mb-6 h-[90vh] bg-white p-6 shadow-lg md:grid md:h-[95vh]">
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
};

export default ScratchPadPage;
