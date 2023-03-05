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

const Inventory: NextPage = () => {
    const [searchLoading, setSearchLoading] = useState(false)
    const [tableLoading, setTableLoading] = useState(true)
    const [inventoryItems, setInventoryItems] = useState<InventoryItemData[]>([])
    const [addItemModalShown, setAddItemModalShown] = useState(false)

    const [newItemName, setNewItemName] = useState("")
    const [newItemCost, setNewItemCost] = useState(0)
    const [newItemDescription, setNewItemDescription] = useState("")
    const [newItemImage, setNewItemImage] = useState('')

    const [defaultItemImage, setDefaultItemImage] = useState('')
    const [imgurl, setImgurl] = useState("")

    const [loadingImage, setLoadingImage] = useState(false)
    const [reloadList, setReloadList] = useState(0)

    useEffect(() => {
        apiClient.protected.inventory_item.data.$get().then(res => {
            setInventoryItems(res as unknown as InventoryItemData[])
            setTableLoading(false)
            console.log(res)
        })
        setNewItemImage(defaultItemImage)
    }, [reloadList])

    useEffect(() => {
        apiClient.protected.inventory_item.data.imgurl.$get({query: {}}).then(res => {
            setDefaultItemImage(res)
            setNewItemImage(res)
        })
        apiClient.protected.inventory_item.data.imgurl.$get({query: {fileName: ""}}).then(res => {
            setImgurl(res)
        })
    }, [])

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
                                (inventoryItems.map(v => (
                                    <Table.Row key={v.id}>
                                        <Table.Cell><img src={`${imgurl}${v.imageURL}`} width={50} height={50}/></Table.Cell>
                                        <Table.Cell>{v.id}</Table.Cell>
                                        <Table.Cell>{v.name}</Table.Cell>
                                        <Table.Cell>{v.description}</Table.Cell>
                                        <Table.Cell>${v.cost.toFixed(2)}</Table.Cell>
                                    </Table.Row>
                                )))

    return (<>
        <Container>
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
                                        <img src={newItemImage} width={64} height={64}/>
                                        <Input id={'new-file-input'} type={'file'} onChange={e => {
                                            setLoadingImage(true)
                                            e.preventDefault()
                                            const el = document.getElementById('new-file-input') as HTMLInputElement
                                            apiClient.protected.inventory_item.data.image.$post({body: {icon: (el.files as FileList)[0]}}).then(res => {
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
                        setNewItemImage(defaultItemImage)
                        setAddItemModalShown(false)
                    }}>
                        Cancel
                    </Button>
                    <Button
                        content={'Add'}
                        labelPosition={'right'}
                        icon={'checkmark'}
                        onClick={async ()=> {
                            await apiClient.protected.inventory_item.data.$post({
                                body: {
                                    name: newItemName,
                                    description: newItemDescription,
                                    cost: newItemCost,
                                    active: true,
                                    imageURL: _.last(newItemImage.split('/')) ?? ""
                                }
                            })

                            setReloadList(reloadList + 1)
                            setAddItemModalShown(false)
                        }}
                        positive
                    />
                </Modal.Actions>
            </Modal>
            <Grid centered columns={1} padded={'vertically'}>
                <Grid.Row>
                    <Search
                        fluid
                        loading={searchLoading}
                        position={'center'}
                        size={'huge'}
                    />
                </Grid.Row>
                <Grid.Row>
                    <Table celled striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan={'4'}>
                                    Inventory Items
                                </Table.HeaderCell>
                                <Table.HeaderCell textAlign={'center'}>
                                    <Button
                                            onClick={() => {
                                                setAddItemModalShown(true)
                                            }}
                                    >
                                        <Icon
                                            name={'add'} />
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                            <Table.Row textAlign={'center'}>
                                <Table.HeaderCell>
                                    <Icon name={'picture'}/>
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    ID #
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