import {useState} from "react";
import {Input} from "semantic-ui-react";

export type TableFieldEditorProps = {
    value: string;
    setValue: (value: string) => void;
    currency?: boolean
}

const TableFieldEditor = (props: TableFieldEditorProps) => {
    const [value, setValue] = useState(props.currency ? props.value.substring(1) : props.value)
    const [isEditing, setIsEditing] = useState(false)

    const keyDown = (e: {key: 'Enter' | 'Escape'}) => {
        if (e.key === 'Enter') {
            setIsEditing(false)
            props.setValue(value)
        }
        if (e.key === 'Escape') {
            setValue(props.currency ? props.value.substring(1) : props.value)
            setIsEditing(false)
        }
    }

    const change = (e: {target: {value: string}}) => {
        setValue(e.target.value)
    }

    if (isEditing) {
        if(props.currency) {
            return (
                <Input
                    value={value}
                    onKeyDown={keyDown}
                    onChange={change}
                    label={{basic: true, content: '$'}}
                    labelPosition='left'
                />
            )
        }
        return (
            <Input
                value={value}
                onKeyDown={keyDown}
                onChange={change}
            />
        )
    }
    return (
        <span
            style={{cursor: 'pointer'}}
            onClick={() => {
                setIsEditing(true)
            }}
        >
            {props.value}
        </span>
    );
}

export default TableFieldEditor;