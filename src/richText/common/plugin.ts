const elementTypes = ['left', 'right', 'center', 'justify']

const withAlign = (incomingEditor) => {
    const editor = incomingEditor;
    const { shouldBreakOutOnEnter } = editor;

    editor.shouldBreakOutOnEnter = (element) => (elementTypes.includes(element.type) ? true : shouldBreakOutOnEnter(element));

    return editor;
};

export default withAlign;
