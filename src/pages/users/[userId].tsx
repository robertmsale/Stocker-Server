import {useRouter} from "next/router";
import {InventoryItem, InventoryItemData, User} from "$prisma/client";
import {useContext, useEffect, useState} from "react";
import {apiClient} from "~/utils/apiClient";
import _ from 'lodash'
import {Except, Merge} from "type-fest";
import {Button, Checkbox, Container, Dropdown, Grid, Header, Icon, Image, Input, Table} from "semantic-ui-react";
import {DirContext} from '../_app'
import {apiWithHeaders} from "~/utils/apiConfig";
import TableFieldEditor from "~/components/TableFieldEditor";
import {UserRole, Prisma} from "$prisma/client";
import warehouses from "~/pages/warehouses";
import {Warehouse} from "@prisma/client";
import Link from "next/link";

const UserSpecificPage = () => {
    const {dirs} = useContext(DirContext)
    const router = useRouter();
    const userId = router.query.userId;
    const [user, setUser] = useState<Merge<Except<User, 'password'>, {roles: UserRole[]}> | undefined>(undefined);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [active, setActive] = useState(false)
    const [roles, setRoles] = useState<UserRole[]>([])
    const [activeRoles, setActiveRoles] = useState<Set<UserRole>>(new Set())

    const [itemData, setItemData] = useState<InventoryItemData[]>([])
    const [userItems, setUserItems] = useState<InventoryItem[]>([])

    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [users, setUsers] = useState<Except<User, 'password'>[]>([])
    const [search, setSearch] = useState("")

    const filteredItemData = () => {
        const dataIds = new Set<number>()
        for (const item of userItems) {
            dataIds.add(item.dataId)
        }
        return itemData.filter(item => !dataIds.has(item.id))
    }
    const refreshPage = () => {
        const query = {query: {id: _.toNumber(userId)}}
        apiClient.protected.admin.roles.$get(apiWithHeaders({query: {}})).then(res => {
            setRoles(res)
        })
        apiClient.protected.admin.warehouse.$get(apiWithHeaders({query: {}})).then(res => {
            setWarehouses(res)
        })
        apiClient.protected.user.$get(apiWithHeaders({query: {}})).then(res => {
            setUsers(res)
        })
        apiClient.protected.admin.user.$get(apiWithHeaders(query)).then(res => {
            setUser(res)
            setUsername(res.username)
            setEmail(res.email)
            setPassword('')
            setImageUrl(res.imageURL)
            setActiveRoles(new Set(res.roles))
            setActive(res.active)
        })
    }

    useEffect(() => {
        refreshPage()
        apiClient.protected.inventory_item.data.$get(apiWithHeaders({query: {}})).then(res => {
            setItemData(res)
        })
        apiClient.protected.inventory_item.$get(apiWithHeaders({query: {}})).then(res => {
            setUserItems(res.filter(item => item.userId === _.toNumber(userId)))
        })
    }, [])

    const dummy = () => `${dirs.baseURL}${dirs.dummy}`
    const avatar = () => `${dirs.baseURL}${dirs.profileImages}${user?.imageURL ?? ''}`
    const noUser = () => _.isUndefined(user)
    const noImage = () => noUser() || user!.imageURL === ''

    const itemImage = (item: InventoryItemData) => item.imageURL === '' ?
        `${dirs.baseURL}${dirs.dummy}` :
        `${dirs.baseURL}${dirs.itemImages}${item.imageURL}`

    const userImage = (user: Except<User, 'password'>) => user.imageURL === '' ?
        `${dirs.baseURL}${dirs.dummy}` :
        `${dirs.baseURL}${dirs.profileImages}${user.imageURL}`

    return (
        <>
            <Container style={{paddingTop: '1rem'}}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={2}>
                                            User Information
                                        </Table.HeaderCell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.HeaderCell collapsing>Property</Table.HeaderCell>
                                        <Table.HeaderCell>Value</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>Username</Table.Cell>
                                        <Table.Cell><Input
                                            value={username}
                                            onChange={(e, {value}) => {
                                                setUsername(value)
                                                refreshPage()
                                            }}
                                        /></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Email</Table.Cell>
                                        <Table.Cell><Input
                                            value={email}
                                            onChange={(e, {value}) => {
                                                setEmail(value)
                                                refreshPage()
                                            }}
                                        /></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Password</Table.Cell>
                                        <Table.Cell><Input
                                            type={'password'}
                                            value={password}
                                            onChange={(e, {value}) => setPassword(value)}
                                        /></Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Image</Table.Cell>
                                        <Table.Cell>
                                            <Image
                                                src={noImage() ? dummy() : avatar()}
                                                avatar
                                                />
                                            <input
                                                type={'file'}
                                                onChange={(e) => {
                                                    const confirmation = window.confirm("Are you sure you want to change the user's image?")
                                                    if (confirmation) {
                                                        const file = e.target.files?.[0]
                                                        if (_.isUndefined(file)) return
                                                        apiClient.protected.admin.user.img.$post(apiWithHeaders({query: {id: user!.id}, body: {icon: file}})).then(res => {
                                                            setImageUrl(res)
                                                            refreshPage()
                                                        })
                                                    }
                                                }}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Roles</Table.Cell>
                                        <Table.Cell>
                                            {roles.map(role => (
                                                <Checkbox
                                                    style={{display: 'block', paddingBottom: '0.3rem'}}
                                                    key={role.id}
                                                    label={role.value}
                                                    checked={activeRoles.has(role)}
                                                    disabled={noUser() || user!.id === 1}
                                                    onChange={(e, {checked}) => {
                                                        if (checked) {
                                                            const newRoles = new Set(activeRoles)
                                                            newRoles.add(role)
                                                            setActiveRoles(newRoles)
                                                        } else {
                                                            const newRoles = new Set(activeRoles)
                                                            newRoles.delete(role)
                                                            setActiveRoles(newRoles)
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>Active</Table.Cell>
                                        <Table.Cell>
                                            <Checkbox
                                                disabled={noUser() || user!.id === 1}
                                                checked={active}
                                                onChange={(e, {checked}) => {
                                                    const confirmation = window.confirm("Are you sure you want to change the user's status?")
                                                    if (confirmation) setActive(checked ?? false)
                                                    apiClient.protected.admin.user.$patch(apiWithHeaders({body: {id: user!.id, active: checked}})).then(() => {
                                                        refreshPage()
                                                    })
                                                }}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell colspan={2}>
                                            <Button
                                                positive
                                                disabled={
                                                    noUser() ||
                                                    username === user!.username &&
                                                    email === user!.email &&
                                                    password === '' &&
                                                    imageUrl === user!.imageURL &&
                                                    _.isEqual(roles, user!.roles)
                                                }

                                            >Confirm Changes</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input
                                icon={'search'}
                                placeholder={'Search...'}
                                onChange={e => {
                                    e.preventDefault()
                                    setSearch(e.target.value)
                                }}
                                value={search}
                                />
                            <Table celled compact>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan={4}>User Inventory</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {itemData
                                        .filter((v: InventoryItemData) => {
                                            try {
                                                return search === '' ||
                                                    v.id.toString(10) === search ||
                                                    _.get(v.cost.toString(10).match(search), 'length', 0) > 0 ||
                                                    _.get(_.toLower(v.description).match(_.toLower(search)), 'length', 0) > 0 ||
                                                    _.get(_.toLower(v.name).match(_.toLower(search)), 'length', 0) > 0
                                            } catch (e) {
                                                return true
                                            }
                                        })
                                        .map(item => ( <>
                                        <Table.Row key={item.id}>
                                            <Table.Cell>
                                                <Image src={itemImage(item)} avatar/>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {item.description}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    icon={'plus'}
                                                    positive
                                                    as={Link}
                                                    href={`/create-inventory-item/${item.id}?userId=${user?.id}`}
                                                    />
                                            </Table.Cell>
                                        </Table.Row>
                                        {userItems.filter(i => i.dataId === item.id).map(v => (
                                            <Table.Row key={v.id} style={{backgroundColor: '#f6f7f8'}}>
                                                <Table.Cell style={{backgroundColor: '#ece5e5'}}><Icon name={'arrow right'}/> </Table.Cell>
                                                <Table.Cell>item ID {v.id}</Table.Cell>
                                                <Table.Cell>
                                                    <Dropdown text={'Move To location'}>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Header>Warehouses</Dropdown.Header>
                                                            {warehouses.map(warehouse => (
                                                                <Dropdown.Item
                                                                    key={warehouse.id}
                                                                    text={warehouse.name}
                                                                    onClick={() => {
                                                                        const confirmation = window.confirm(`Are you sure you want to move this item to warehouse: ${warehouse.name}?`)
                                                                        if (confirmation) {
                                                                            apiClient.protected.inventory_item.$patch(apiWithHeaders({body: {id: v.id, userId: null, warehouseId: warehouse.id}})).then(() => {
                                                                                refreshPage()
                                                                            })
                                                                        }
                                                                    }}
                                                                />
                                                            ))}
                                                            <Dropdown.Divider/>
                                                            <Dropdown.Header>Users</Dropdown.Header>
                                                            {users.filter(u => u.id !== user?.id).map(user => (
                                                                <Dropdown.Item
                                                                    key={user.id}
                                                                    onClick={() => {
                                                                        const confirmation = window.confirm(`Are you sure you want to move this item to ${user.username}'s inventory?`)
                                                                        if (confirmation) {
                                                                            apiClient.protected.inventory_item.$patch(apiWithHeaders({body: {id: v.id, userId: user.id, warehouseId: null}})).then(() => {
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
                                                        as={Link}
                                                        primary
                                                        href={`/view-inventory-item/${v.id}`}
                                                        />
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </>))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </>
    );
}

export default UserSpecificPage;