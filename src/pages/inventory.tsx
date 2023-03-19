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
import {useContext, useEffect, useState} from "react";
import {InventoryItem, InventoryItemData} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'
import {apiConfig, apiWithHeaders} from "~/utils/apiConfig";
import {DirContext} from "~/pages/_app";
import TableFieldEditor from "~/components/TableFieldEditor";
import Link from "next/link";

const Inventory: NextPage = () => {
    const {dirs} = useContext(DirContext)
    const [search, setSearch] = useState("")
    const [tableLoading, setTableLoading] = useState(true)
    const [inventoryItems, setInventoryItems] = useState<InventoryItemData[]>([])
    const [addItemModalShown, setAddItemModalShown] = useState(false)

    const [newItemName, setNewItemName] = useState("")
    const [newItemCost, setNewItemCost] = useState(0)
    const [newItemDescription, setNewItemDescription] = useState("")
    const [newItemImage, setNewItemImage] = useState<string>(dirs.dummy)

    const [loadingImage, setLoadingImage] = useState(false)

    const [editItemImage, setEditItemImage] = useState(dirs.dummy as string)
    const [editItemModal, setEditItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(-1)

    const reloadList = () => {
        apiClient.protected.inventory_item.data.$get(apiWithHeaders({})).then(res => {
            setInventoryItems(res)
            setTableLoading(false)
        })
    }

    useEffect(() => {
        reloadList()
    }, [])

    const tableFilter = (v: InventoryItemData) => {
        try {
            return search === '' ||
                v.id.toString(10) === search ||
                _.get(v.cost.toString(10).match(search), 'length', 0) > 0 ||
                _.get(_.toLower(v.description).match(_.toLower(search)), 'length', 0) > 0 ||
                _.get(_.toLower(v.name).match(_.toLower(search)), 'length', 0) > 0
        } catch (e) {
            return true
        }
    }

    const tableBody = tableLoading ?
                                (<Table.Row>
                                    <Table.Cell rowSpan={3} colSpan={5}>
                                        <Dimmer.Dimmable as={Segment} style={{height: '100px'}} blurring dimmed={tableLoading}>
                                            <Dimmer inverted active={tableLoading}>
                                                <Loader>Loading</Loader>
                                            </Dimmer>
                                        </Dimmer.Dimmable>
                                    </Table.Cell>
                                </Table.Row>) :
                                (inventoryItems.filter(tableFilter).map((v, i) => (
                                    <Table.Row
                                        key={v.id}
                                    >
                                        <Table.Cell collapsing><img style={{cursor: 'pointer'}} onClick={() => {
                                            setSelectedItem(v.id)
                                            setEditItemImage(_.isEmpty(v.imageURL) ? dirs.dummy : v.imageURL)
                                            setEditItemModal(true)
                                        }} src={`${dirs.baseURL}${v.imageURL === '' ? dirs.dummy : dirs.itemImages + v.imageURL}`} width={50} height={50}/></Table.Cell>
                                        <Table.Cell collapsing>{v.id}</Table.Cell>
                                        <Table.Cell><TableFieldEditor value={v.name} setValue={w => {
                                            apiClient.protected.inventory_item.data.$patch(apiWithHeaders({body: {id: v.id, name: w}})).then(res => {
                                                reloadList()
                                            })
                                        }} /></Table.Cell>
                                        <Table.Cell><TableFieldEditor value={v.description} setValue={w => {
                                            apiClient.protected.inventory_item.data.$patch(apiWithHeaders({body: {id: v.id, description: w}})).then(res => {
                                                reloadList()
                                            })
                                        }} /></Table.Cell>
                                        <Table.Cell collapsing><TableFieldEditor currency={true} value={`$${v.cost.toFixed(2)}`} setValue={w => {
                                            apiClient.protected.inventory_item.data.$patch(apiWithHeaders({body: {id: v.id, cost: _.toNumber(w.replace('$', ''))}})).then(res => {
                                                reloadList()
                                            })
                                        }} /></Table.Cell>
                                        <Table.Cell collapsing style={{justifyContent: 'center'}}>
                                            <Button
                                                as={Link}
                                                href={`/create-inventory-item/${v.id}`}
                                                target={'_blank'}
                                                rel={'noopener noreferrer'}
                                                primary
                                                fluid={true}
                                                icon={'qrcode'}
                                                onClick={() => {

                                                }} />
                                        </Table.Cell>
                                    </Table.Row>
                                )))

    return (<>
        <Container>
            <Modal
                onClose={() => setEditItemModal(false)}
                onOpen={() => setEditItemModal(true)}
                open={editItemModal}
                >
                <Modal.Header>Edit Item Image</Modal.Header>
                <Modal.Content>
                    <img src={`${dirs.baseURL}${editItemImage}`} width={64} height={64}/>
                    <Input id={'edit-file-input'} type={'file'} onChange={e => {
                        e.preventDefault()
                        const el = document.getElementById('edit-file-input') as HTMLInputElement
                        apiClient.protected.inventory_item.data.image.$post(apiWithHeaders({query: {id: selectedItem}, body: {icon: (el.files as FileList)[0]}})).then(res => {
                            setEditItemModal(false)
                            reloadList()
                        })
                    }} />
                </Modal.Content>
            </Modal>
            <Modal
                onClose={()=>setAddItemModalShown(false)}
                onOpen={()=>setAddItemModalShown(true)}
                open={addItemModalShown}
                >
                <Modal.Header>Add New Item</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Grid celled={'internally'}>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Form.Field>
                                        <label>Item Name</label>
                                        <Input value={newItemName} onChange={e => {
                                            e.preventDefault();
                                            setNewItemName(e.target.value)
                                        }} />
                                    </Form.Field>

                                    <Form.Field>
                                        <label>Item Cost</label>
                                        <Input
                                            value={newItemCost}
                                            type={'number'}
                                            multiple={true}
                                            onChange={e => {
                                            e.preventDefault();
                                            setNewItemCost(_.toNumber(e.target.value))
                                        }} />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Form.Field>
                                        <label>Item Description</label>
                                        <textarea value={newItemDescription} onChange={e => {
                                            e.preventDefault();
                                            setNewItemDescription(e.target.value)
                                        }} />
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={16}>
                                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: 'auto'}}>
                                        <Dimmer active={loadingImage}>
                                            <Loader>Loading...</Loader>
                                        </Dimmer>
                                        <img src={`${dirs.baseURL}${newItemImage}`} width={64} height={64}/>
                                        <Input id={'new-file-input'} type={'file'} onChange={e => {
                                            setLoadingImage(true)
                                            e.preventDefault()
                                            const el = document.getElementById('new-file-input') as HTMLInputElement
                                            apiClient.protected.inventory_item.data.image.$post(apiWithHeaders({body: {icon: (el.files as FileList)[0]}})).then(res => {
                                                setNewItemImage(res)
                                                setLoadingImage(false)
                                            })
                                        }} />
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color={'black'} onClick={()=> {
                        setNewItemName("")
                        setNewItemDescription("")
                        setNewItemCost(0)
                        setNewItemImage(`${dirs.baseURL}${dirs.dummy}`)
                        setAddItemModalShown(false)
                    }}>
                        Cancel
                    </Button>
                    <Button
                        content={'Add'}
                        labelPosition={'right'}
                        icon={'checkmark'}
                        onClick={async ()=> {
                            await apiClient.protected.inventory_item.data.$post(apiWithHeaders({
                                body: {
                                    name: newItemName,
                                    description: newItemDescription,
                                    cost: newItemCost,
                                    active: true,
                                    imageURL: _.last(newItemImage.split('/')) ?? ""
                                }
                            }))

                            reloadList()
                            setAddItemModalShown(false)
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
            <Grid centered columns={1} padded={'vertically'}>
                <Grid.Row>
                    <Input
                        icon={'search'}
                        placeholder={'Search...'}
                        onChange={e => {
                            e.preventDefault()
                            setSearch(e.target.value)
                        }}
                        value={search}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan={'5'}>
                                    Inventory Items
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>
                                    <Button
                                        positive
                                        fluid
                                        icon={'add'}
                                        onClick={() => {
                                            setAddItemModalShown(true)
                                        }}
                                    />
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row textAlign={'center'}>
                                <Table.HeaderCell>
                                    <Icon name={'picture'}/>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <Icon name={'id badge'} />
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Name
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Description
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    <Icon name={'money'}/>
                                </Table.HeaderCell>
                                <Table.HeaderCell collapsing>
                                    <Icon name={'qrcode'}/>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {tableBody}
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>

        </Container>
    </>)
}

export default Inventory