import {
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  listsPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  linkDialogPlugin,
  linkPlugin,
  BlockTypeSelect,
  InsertThematicBreak,
  markdownShortcutPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface EditorProps {
  content: string;
  editorRef: React.RefObject<MDXEditorMethods>;
}

export const Editor = ({content, editorRef}: EditorProps) => {
  return (
    <MDXEditor
    ref={editorRef}
    className='editor-container'
    markdown={content}
    plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        markdownShortcutPlugin(),
        toolbarPlugin({
        toolbarContents: () => (
            <>
            <BlockTypeSelect />
            <BoldItalicUnderlineToggles />
            <CodeToggle />
            <CreateLink />
            <InsertThematicBreak />
            <UndoRedo />
            </>
        )
        })
    ]}
    />
  )
}