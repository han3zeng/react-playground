import { Editor, Transforms, Text } from "slate";

const CustomEditor = {

  insertDefaultNode(editor) {
    Transforms.insertNodes(
      editor,
      {
        children: [{ text: '' }],
        type: 'paragraph',
      }
    )
  },

  insertLineBreak(editor) {
    editor.insertText('\n')
  },

  insertLink({
    editor,
    url
  }) {
    const { selection } = editor;
    const link = {
      type: 'link',
      url,
      children: [],
    }
    console.log('selection: ', selection)
    Transforms.wrapNodes(
      editor,
      link,
      {
        split: true,
      }
    )
  },

  toggleCodeText(editor) {
    const isActive = (() => {
      const [match] = Editor.nodes(editor, {
        match: n => n.code === true,
        universal: true,
      })
      return !!match
    })();
    Transforms.setNodes(
      editor,
      { code: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleBoldMark(editor) {
    const isActive = (() => {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
      return !!match
    })();
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleItalicMark(editor) {
    const isActive = (() => {
      const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true,
      })
      return !!match
    })();
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = (() => {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
      return !!match
    })()
    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}

export default CustomEditor;
