import {Editor, Transforms} from "slate";
import {areElementsActive, isElementActive} from "./isElementActive";

const elementTypes = ['left', 'right', 'center', 'justify']
const alignableElements = ['h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'link']

const handleAlignCallback = (editor, align) => {
    return (e) => {
        e.preventDefault();
        const element: any = { type: align, children: [] }

        if (isElementActive(editor, align)) {
            Transforms.unwrapNodes(
                editor,
                {
                    match: n =>
                        !Editor.isEditor(n) &&
                        n.type === align
                }
            )
        } else if(areElementsActive(editor, elementTypes)) {
            Transforms.unwrapNodes(
                editor,
                {
                    match: n =>
                        !Editor.isEditor(n) &&
                        elementTypes.includes(n.type)
                }
            )

            Transforms.wrapNodes(
                editor,
                element
            )
        } else if (areElementsActive(editor, alignableElements)) {
            Transforms.wrapNodes(
                editor,
                element
            )
        }
    }
}

export default handleAlignCallback;
