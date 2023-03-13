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
import TableFieldEditor from "~/components/TableFieldEditor";

const WarehousesPage: NextPage = () => {
    const [warehouses, setWarehouses] = useState([] as Warehouse[])
    const [newWarehouseName, setNewWarehouseName] = useState('')
    const [newWarehouseAddress, setNewWarehouseAddress] = useState('')
    const [newWarehouseModalOpen, setNewWarehouseModalOpen] = useState(false)

    const refreshPage = () => {
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouses(res)
        })
    }

    useEffect(() => {
        refreshPage()
    }, [])

    return (<>
        <Container style={{paddingTop: '2rem'}}>
            <Modal
                open={newWarehouseModalOpen}
                onClose={() => setNewWarehouseModalOpen(false)}
            >
                <Modal.Header>New Warehouse</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Name</label>
                            <Input
                                value={newWarehouseName}
                                onChange={(e, {value}) => setNewWarehouseName(value)}
                                />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <Input
                                value={newWarehouseAddress}
                                onChange={(e, {value}) => setNewWarehouseAddress(value)}
                                />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        negative
                        onClick={() => setNewWarehouseModalOpen(false)}
                    >Cancel</Button>
                    <Button
                        positive
                        onClick={() => {
                            apiClient.protected.admin.warehouse.$post(apiWithHeaders({body: {
                                name: newWarehouseName,
                                address: newWarehouseAddress,
                                latitude: '0',
                                longitude: '0'
                            }})).then(() => {
                                refreshPage()
                                setNewWarehouseModalOpen(false)
                            })
                        }}
                    >Create Warehouse</Button>
                </Modal.Actions>
            </Modal>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={3}>Warehouses</Table.HeaderCell>
                        <Table.HeaderCell colSpan={1}>
                            <Button
                                icon={'plus'}
                                positive
                                onClick={() => setNewWarehouseModalOpen(true)}
                                />
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell collapsing>🪪</Table.HeaderCell>
                        <Table.HeaderCell collapsing width={'4'}>Name</Table.HeaderCell>
                        <Table.HeaderCell>Address</Table.HeaderCell>
                        <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {warehouses.map(v => (
                        <Table.Row key={v.id}>
                            <Table.Cell>{v.id}</Table.Cell>
                            <Table.Cell><TableFieldEditor value={v.name} setValue={(name) => {
                                apiClient.protected.admin.warehouse.$patch(apiWithHeaders({body: {id: v.id, name}})).then(res => {
                                    refreshPage()
                                })
                            }} /></Table.Cell>
                            <Table.Cell><TableFieldEditor
                                value={v.address}
                                setValue={(address) => {
                                    apiClient.protected.admin.warehouse.$patch(apiWithHeaders({body: {id: v.id, address}})).then(res => {
                                        refreshPage()
                                    })
                                }}
                            /></Table.Cell>
                            <Table.Cell>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <Button
                                        as={'a'}
                                        href={`/warehouses/${v.id}`}
                                        primary
                                        icon={'forward'}/>
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