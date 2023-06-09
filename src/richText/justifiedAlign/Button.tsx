import React, {useCallback} from 'react';
import { ElementButton } from 'payload/components/rich-text';
import Icon from "../justifiedAlign/Icon";
import {useSlate} from "slate-react";
import handleAlignCallback from "../common/handleAlignCallback";

const ToolbarButton: React.FC<{ path: string }> = ({path}) => {
    const editor = useSlate();
    const handleAlign = useCallback(handleAlignCallback(editor, 'justify'), [editor]);

    return (
        <ElementButton format={'justify'} onClick={handleAlign}>
            <Icon />
        </ElementButton>
    );
}

export default ToolbarButton;
