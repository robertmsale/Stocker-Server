import {NextPage} from "next";
import {
    Button,
    Container,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon, Input,
    Loader,
    Modal,
    Search,
    Segment,
    Table
} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {InventoryItem, InventoryItemData} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'
import {apiWithHeaders} from "~/utils/apiConfig";
import {Warehouse} from "@prisma/client";

const WarehousesPage: NextPage = () => {
    const [warehouses, setWarehouses] = useState([] as Warehouse[])

    useEffect(() => {
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouses(res)
        })
    }, [])

    return (<>
        <Container>
            <Header>Warehouses Page</Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>🪪</Table.HeaderCell>
                        <Table.HeaderCell collapsing>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {warehouses.map(v => (
                        <Table.Row key={v.id}>
                            <Table.Cell>{v.id}</Table.Cell>
                            <Table.Cell>{v.name}</Table.Cell>
                            <Table.Cell>{v.address}</Table.Cell>
                            <Table.Cell>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <Button
                                        primary
                                        icon={'edit'}/>
                                    <Button
                                        negative
                                        icon={'delete'}/>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    </>)
}

export default WarehousesPage