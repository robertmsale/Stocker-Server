import {useRouter} from "next/router";
import QRCode from 'react-qr-code'
import {useContext, useEffect, useState} from "react";
import {InventoryItem, InventoryItemData, User, Warehouse} from "$prisma/client";
import {
    Button, Checkbox,
    Container,
    Dimmer,
    Dropdown,
    Form,
    Grid,
    Header,
    Image,
    List,
    Radio,
    Segment,
    Select
} from "semantic-ui-react";
import _ from 'lodash'
import {apiClient} from "~/utils/apiClient";
import {apiWithHeaders} from "~/utils/apiConfig";
import {Except, Merge} from "type-fest";
import {DirContext} from "~/pages/_app";

const InventoryItemGenPage = () => {
    const router = useRouter()
    const {dirs} = useContext(DirContext)
    const { itemId } = router.query
    const [itemData, setItemData] = useState<InventoryItemData | undefined>(undefined)
    const [dimmer, setDimmer] = useState(true)
    const [radioValue, setRadioValue] = useState<'warehouse' | 'user'>('warehouse')
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [users, setUsers] = useState<Except<User, 'password'>[]>([])
    const [selectedWarehouse, setSelectedWarehouse] = useState<number>(-1)
    const [selectedUser, setSelectedUser] = useState<number>(-1)
    const [showNameInQR, setShowNameInQR] = useState(false)
    const [QRValue, setQRValue] = useState("placeholder")


    useEffect(() => {
        apiClient.protected.inventory_item.data.$get(apiWithHeaders({query: {id: _.toNumber(itemId)}})).then(res => {
            setItemData(res[0])
        })
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouses(res)
        })
        apiClient.protected.user.$get(apiWithHeaders({query: {}})).then(res => {
            setUsers(res)
        })
    }, [])

    const noUser = () => selectedUser === -1
    const noWarehouse = () => selectedWarehouse === -1
    const noSelection = () => noUser() && noWarehouse()

    return (
        <>
        <QRCode value={QRValue} className={'yesPrint'} />
        <Container textAlign={'center'} style={{paddingTop: '1rem'}} className={'noPrint'}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Header className={showNameInQR ? '' : 'noPrint'}>{_.isUndefined(itemData) ? '' : itemData.name}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <span className={'noPrint'}>{itemData?.description ?? ''}</span>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Dimmer.Dimmable blurring dimmed={dimmer}>
                            <Dimmer active={dimmer} inverted />
                            <QRCode value={QRValue} />
                        </Dimmer.Dimmable>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row textAlign={'center'}>
                    <Grid.Column>
                        <Button
                            className={'noPrint'}
                            as={'a'}
                            disabled={QRValue === 'placeholder'}
                            href={QRValue}>Go to item page</Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Segment className={'noPrint'}>
                            <Form>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={8}>
                                            <Form.Field>
                                                <Radio
                                                    label={'Warehouse'}
                                                    value={'warehouse'}
                                                    checked={radioValue === 'warehouse'}
                                                    onChange={() => {
                                                        setSelectedUser(-1)
                                                        setSelectedWarehouse(-1)
                                                        setRadioValue('warehouse')
                                                    }}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Form.Field>
                                                <Radio
                                                    label={'User Location'}
                                                    value={'user'}
                                                    checked={radioValue === 'user'}
                                                    onChange={() => {
                                                        setSelectedUser(-1)
                                                        setSelectedWarehouse(-1)
                                                        setRadioValue('user')
                                                    }}
                                                />
                                            </Form.Field>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={16} textAlign={'left'}>
                                            <List
                                                divided
                                                selection
                                                verticalAlign={'middle'}>
                                                {
                                                    radioValue === 'warehouse' ?
                                                        warehouses.map(v => (
                                                            <List.Item
                                                                key={v.id}
                                                                active={selectedWarehouse === v.id}
                                                                onClick={() => setSelectedWarehouse(v.id)}
                                                            >
                                                                <List.Content>
                                                                    <List.Header as={'a'}>{v.name}</List.Header>
                                                                </List.Content>
                                                            </List.Item>
                                                        )) : users.map(v => (
                                                            <List.Item
                                                                key={v.id}
                                                                active={selectedUser === v.id}
                                                                onClick={() => setSelectedUser(v.id)}
                                                            >
                                                                <Image avatar src={v.imageURL === '' ? `${dirs.baseURL}${dirs.dummy}` : `${dirs.baseURL}${dirs.profileImages}${v.imageURL}`} />
                                                                <List.Content>
                                                                    <List.Header as={'a'}>{v.username}</List.Header>
                                                                </List.Content>
                                                            </List.Item>
                                                        ))
                                                }
                                            </List>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8} className={'noPrint'}>
                        <Grid textAlign={"center"}>
                            <Grid.Row>
                                <Button
                                    positive
                                    disabled={noSelection()}
                                    onClick={() => {
                                        apiClient.protected.inventory_item.$post(
                                            apiWithHeaders({
                                                body: {
                                                    dataId: _.toNumber(itemId),
                                                    userId: selectedUser === -1 ? null : selectedUser,
                                                    warehouseId: selectedWarehouse === -1 ? null : selectedWarehouse
                                                } as Except<InventoryItem, 'id'>
                                            })
                                        ).then(res => {
                                            setQRValue(`/view-inventory-item/${res.id}`)
                                            setDimmer(false)
                                        })
                                    }}
                                >
                                    Generate QR Code {
                                        noSelection() ? '' :
                                            ' and add to ' + (noUser() ?
                                                warehouses.find(v => v.id === selectedWarehouse)?.name ?? '' :
                                                users.find(v => v.id === selectedUser)?.username ?? '')
                                    }
                                </Button>
                            </Grid.Row>
                            <Grid.Row>
                                <Button
                                    primary
                                    disabled={dimmer}
                                >
                                    Print QR Code
                                </Button>
                            </Grid.Row>
                            <Grid.Row>
                                Show name in print view&nbsp;&nbsp;
                                <Checkbox toggle checked={showNameInQR} onChange={(e, {checked}) => setShowNameInQR(checked as boolean)} />
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        </>
    )
}

export default InventoryItemGenPage