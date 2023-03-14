import {useRouter} from "next/router";
import {Button, Container, Dropdown, Icon, Image, Table} from "semantic-ui-react";
import {InventoryItem, InventoryItemData, User, Warehouse} from "$prisma/client";
import {useContext, useEffect, useState} from "react";
import {apiWithHeaders} from "~/utils/apiConfig";
import {apiClient} from "~/utils/apiClient";
import {Except} from "type-fest";
import _ from 'lodash'
import {DirContext} from "../_app";
import Link from "next/link";

const SpecificWarehouse = () => {
    const {dirs} = useContext(DirContext)
    const router = useRouter()
    const { id } = router.query
    const [warehouse, setWarehouse] = useState<undefined | Warehouse>(undefined)

    const [itemData, setItemData] = useState<InventoryItemData[]>([])
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [users, setUsers] = useState<Except<User, 'password'>[]>([])
    const [warehouseInventory, setWarehouseInventory] = useState<InventoryItem[]>([])

    const itemImage = (item: InventoryItemData) => item.imageURL === '' ?
        `${dirs.baseURL}${dirs.dummy}` :
        `${dirs.baseURL}${dirs.itemImages}${item.imageURL}`

    const userImage = (user: Except<User, 'password'>) => user.imageURL === '' ?
        `${dirs.baseURL}${dirs.dummy}` :
        `${dirs.baseURL}${dirs.profileImages}${user.imageURL}`

    const refreshPage = () => {
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {id: _.toNumber(id)}})).then(res => {
            setWarehouse(res[0])
        })
        apiClient.protected.inventory_item.data.$get(apiWithHeaders({query: {}})).then(res => {
            setItemData(res)
        })
        apiClient.protected.inventory_item.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouseInventory(res.filter(item => item.warehouseId === _.toNumber(id)))
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
    }, [])

    return (
        <Container style={{paddingTop: '1rem'}}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={4}>Warehouse Inventory</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {itemData.map(iData => (<>
                        <Table.Row>
                            <Table.Cell collapsing><Image avatar src={itemImage(iData)} /></Table.Cell>
                            <Table.Cell collapsing>{iData.name}</Table.Cell>
                            <Table.Cell>{iData.description}</Table.Cell>
                            <Table.Cell collapsing>
                                <Button
                                    icon={'plus'}
                                    positive
                                    as={Link}
                                    href={`/create-inventory-item/${iData.id}?warehouseId=${id}`}
                                    />
                            </Table.Cell>
                        </Table.Row>
                        {warehouseInventory.filter(item => item.dataId === iData.id).map(item => (<>
                            <Table.Row style={{backgroundColor: '#f6f7f8'}}>
                                <Table.Cell style={{backgroundColor: '#ece5e5'}}><Icon name={'arrow right'} /> </Table.Cell>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>
                                    <Dropdown text={'Move To location'}>
                                        <Dropdown.Menu>
                                            <Dropdown.Header>Warehouses</Dropdown.Header>
                                            {warehouses.filter(w => w.id !== warehouse?.id).map(warehouse => (
                                                <Dropdown.Item
                                                    key={warehouse.id}
                                                    text={warehouse.name}
                                                    disabled={warehouse.id === _.toNumber(id)}
                                                    onClick={() => {
                                                        const confirmation = window.confirm(`Are you sure you want to move this item to warehouse: ${warehouse.name}?`)
                                                        if (confirmation) {
                                                            apiClient.protected.inventory_item.$patch(apiWithHeaders({body: {id: item.id, userId: null, warehouseId: warehouse.id}})).then(() => {
                                                                refreshPage()
                                                            })
                                                        }
                                                    }}
                                                />
                                            ))}
                                            <Dropdown.Divider/>
                                            <Dropdown.Header>Users</Dropdown.Header>
                                            {users.map(user => (
                                                <Dropdown.Item
                                                    key={user.id}
                                                    onClick={() => {
                                                        const confirmation = window.confirm(`Are you sure you want to move this item to ${user.username}'s inventory?`)
                                                        if (confirmation) {
                                                            apiClient.protected.inventory_item.$patch(apiWithHeaders({body: {id: item.id, userId: user.id, warehouseId: null}})).then(() => {
                                                                refreshPage()
                                                            })
                                                        }
                                                    }}
                                                >
                                                    <Image avatar src={userImage(user)}/>
                                                    {user.username}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        icon={'qrcode'}
                                        primary
                                        as={Link}
                                        href={`/view-inventory-item/${item.id}`}
                                    />
                                </Table.Cell>

                            </Table.Row>
                        </>))}
                    </>))}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default SpecificWarehouse