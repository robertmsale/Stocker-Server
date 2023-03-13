import {useRouter} from "next/router";
import {CSSProperties, useContext, useEffect, useState} from "react";
import {DirContext} from "~/pages/_app";
import _ from "lodash";
import {Button, Container, Grid, Header, Image, List, Radio, Segment} from "semantic-ui-react";
import {InventoryItem, InventoryItemData, User, Warehouse} from "$prisma/client";
import {apiClient} from "~/utils/apiClient";
import {apiWithHeaders} from "~/utils/apiConfig";
import {Except} from "type-fest";
import QRCode from "react-qr-code";

const ViewInventoryItemPage = () => {
    const router = useRouter()
    const {dirs} = useContext(DirContext)
    const itemId = _.toNumber(router.query.itemId)
    const [itemData, setItemData] = useState<InventoryItemData | undefined>(undefined)
    const [item, setItem] = useState<InventoryItem | undefined>(undefined)
    const [currWarehouse, setCurrWarehouse] = useState<Warehouse | undefined>(undefined)
    const [currUser, setCurrUser] = useState<Except<User, 'password'> | undefined>(undefined)
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [users, setUsers] = useState<Except<User, 'password'>[]>([])
    const [moveTo, setMoveTo] = useState<'warehouse' | 'user'>('warehouse')
    const [moveToId, setMoveToId] = useState<number>(-1)

    console.log(dirs.baseURL)

    const refreshPage = () => {
        apiClient.protected.inventory_item.$get(apiWithHeaders({query: {id: itemId}})).then(res => {
            setItem(res[0])
            apiClient.protected.inventory_item.data.$get(apiWithHeaders({query: {id: res[0].dataId}})).then(resd => {
                setItemData(resd[0])
                if (res[0].warehouseId !== null) {
                    apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {id: res[0].warehouseId}})).then(resw => {
                        setCurrWarehouse(resw[0])
                    })
                }
                if (res[0].userId !== null) {
                    apiClient.protected.user.$get(apiWithHeaders({query: {id: res[0].userId}})).then(resu => {
                        setCurrUser(resu[0])
                    })
                }
            })
        })
        apiClient.protected.user.$get(apiWithHeaders({query: {}})).then(res => {
            setUsers(res)
        })
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouses(res)
        })
    }

    useEffect(() => {
        refreshPage()
    },[])

    return (
        <>
            <QRCode className={'yesPrint'} value={_.isUndefined(item) ? '' : `/view-inventory-item/${item.id}`} />
            <Container style={{paddingTop: '1rem'}} className={'noPrint'}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Image avatar circular={true} src={_.isUndefined(itemData) || itemData.imageURL === '' ? `${dirs.baseURL}${dirs.dummy}` : `${dirs.baseURL}${dirs.itemImages}${itemData?.imageURL ?? ''}`} />
                            <Header>{itemData?.name ?? ''}</Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Segment>
                                <Header>Current Location</Header>
                                {_.isUndefined(currWarehouse) ? '' : `Warehouse: ${currWarehouse.name}`}
                                {_.isUndefined(currUser) ? '' : `User: ${currUser.username}`}
                                <Segment>
                                    <Grid>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Header>Move To</Header>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={8}>
                                                <Radio
                                                    label='Warehouse'
                                                    name='radioGroup'
                                                    value='warehouse'
                                                    checked={moveTo === 'warehouse'}
                                                    onChange={(e, {value}) => {
                                                        setMoveToId(-1)
                                                        setMoveTo(value as 'warehouse' | 'user')
                                                    }}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Radio
                                                    label='User'
                                                    name='radioGroup'
                                                    value='user'
                                                    checked={moveTo === 'user'}
                                                    onChange={(e, {value}) => {
                                                        setMoveToId(-1)
                                                        setMoveTo(value as 'warehouse' | 'user')
                                                    }}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <List selection verticalAlign={'middle'}>
                                                    {moveTo === 'warehouse' ? warehouses.map(warehouse => (
                                                        <List.Item
                                                            active={moveToId === warehouse.id}
                                                            disabled={!_.isUndefined(currWarehouse) && warehouse.id === currWarehouse.id && moveTo === 'warehouse'}
                                                            onClick={() => setMoveToId(warehouse.id)}
                                                        >
                                                            <List.Header as={'a'}>{warehouse.name}</List.Header>
                                                        </List.Item>
                                                    )) : users.map(user => (
                                                        <List.Item
                                                            active={moveToId === user.id}
                                                            disabled={!_.isUndefined(currUser) && user.id === currUser.id && moveTo === 'user'}

                                                            onClick={() => setMoveToId(user.id)}
                                                        >
                                                            <Image avatar src={user.imageURL !== '' ? `${dirs.baseURL}${dirs.profileImages}${user.imageURL}` : `${dirs.baseURL}${dirs.dummy}`} />
                                                            <List.Content>
                                                                <List.Header as={'a'}>{user.username}</List.Header>
                                                            </List.Content>
                                                        </List.Item>
                                                    ))
                                                    }
                                                </List>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={16}>
                                                <Button
                                                    positive
                                                    disabled={moveToId === -1 || (!_.isUndefined(currWarehouse) && moveTo === 'warehouse' && moveToId === currWarehouse.id) || (!_.isUndefined(currUser) && moveTo === 'user' && moveToId === currUser.id)}
                                                    onClick={() => {

                                                        apiClient.protected.inventory_item.$patch(apiWithHeaders({body: {
                                                            id: item?.id ?? -1,
                                                            warehouseId: moveTo === 'warehouse' ? moveToId : null,
                                                            userId: moveTo === 'user' ? moveToId : null
                                                            }})).then(res => {
                                                            refreshPage()
                                                        })
                                                    }}
                                                >Confirm Move</Button>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>

                                </Segment>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment textAlign={'center'} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'} as CSSProperties}>
                                <QRCode value={_.isUndefined(item) ? '' : `/view-inventory-item/${item.id}`} />
                                <div style={{height: '1rem'}}></div>
                                <Button
                                    primary
                                    onClick={() => {
                                        window.print()
                                    }}

                                >Print QR Code</Button>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    )
}

export default ViewInventoryItemPage