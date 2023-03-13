import React from "react";
import {Button} from "semantic-ui-react";

export type ModalEditorContent = {
    type: 'text' | 'number' | 'select' | 'checkbox' | 'radio' | 'textarea';
    value: string | number | boolean;
    label: string;
    key: string;
}

export type ModalEditorActions = {
    key: string;
    button: Button
}

export type ModalEditorProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    header: string;
    content: ModalEditorContent[];
    actions: ModalEditorActions[];
}

const ModalEditor: React.FC<ModalEditorProps> = (props) => {

    return (
        <div>
            <h1>Modal Editor</h1>
        </div>
    );
};

export default ModalEditor;