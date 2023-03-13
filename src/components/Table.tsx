import React, {ReactComponentElement, useState} from 'react'
import {Table, TableHeaderProps} from 'semantic-ui-react'

export type TableGeneratorProps = {
    header: Array<{
        text?: string,
        component?: ReactComponentElement<any>,

    }>
    headerProps: TableHeaderProps
    data: Array<Array<React.FC | string>>
}

const TableGenerator = ({data, header, headerProps}: TableGeneratorProps) => {

    return (
        <Table celled>
            <Table.Header headerProps>
                <Table.Row>
                    {header.map((h, i) => {
                        return <Table.HeaderCell key={i}>{h.text}{h.component}</Table.HeaderCell>
                    }
                    )}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((d, i) => {
                    return <Table.Row key={i}>
                        {d.map((C, j) => {
                            return <Table.Cell key={j}><C/></Table.Cell>
                        })}
                    </Table.Row>
                })}
            </Table.Body>
        </Table>


    )
}