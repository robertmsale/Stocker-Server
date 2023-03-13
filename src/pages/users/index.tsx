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
    Table,
    Select, Dropdown
} from "semantic-ui-react";
import {ReactPropTypes, useContext, useEffect, useState} from "react";
import {InventoryItem, InventoryItemData, User} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Except, Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'
import {apiWithHeaders} from "~/utils/apiConfig";
import {DirContext} from "~/pages/_app";
import {UserRole} from "@prisma/client";
import TableFieldEditor from "~/components/TableFieldEditor";


type UserEditModalProps = {
    user: User
    roles: UserRole[]
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    callbackRefresh: () => void
}
const UserEditModal: React.FC<UserEditModalProps> = (props) => {
    const [username, setUsername] = useState(props.user.username)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(props.user.email)
    const [selectedRole, setSelectedRole] = useState(props.roles[0])
    const [active, setActive] = useState(props.user.active)
    return (<Modal
        onClose={() => props.setIsOpen(false)}
        onOpen={() => props.setIsOpen(true)}
        open={props.isOpen}
    >
        <Modal.Header>
            Edit User
        </Modal.Header>
        <Modal.Content>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input placeholder='Username' value={username} onChange={(e) => {
                        e.preventDefault()
                        setUsername(e.target.value)
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type={'password'} value={password} onChange={(e) => {
                        e.preventDefault()
                        setPassword(e.target.value)
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={email} onChange={(e) => {
                        e.preventDefault()
                        setEmail(e.target.value)
                    }}/>
                </Form.Field>
                <Form.Field>
                    <label>Role</label>
                    <Dropdown
                        placeholder='Select Role'
                        fluid
                        selection
                        options={props.roles.map(v => ({key: v.id, text: v.value, value: v.id}))}
                        // value={selectedRole}
                        // onChange={(e, data) => {
                        //     e.preventDefault()
                        //     setSelectedRole({
                        //         value: data.value as string,
                        //         id: data. as number
                        //     } as UserRole)
                        // }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Active</label>
                    <input type={'checkbox'} checked={active}
                       onChange={(e) => {
                           e.preventDefault()
                           setActive(e.target.checked)
                    }}
                    />
                </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button secondary onClick={(e) => {
                e.preventDefault()
                props.setIsOpen(false)
            }}>Cancel</Button>
            <Button positive onClick={(e) => {
                e.preventDefault()
                apiClient.protected.admin.user.$patch(apiWithHeaders({body: {
                    id: props.user.id,
                    username,
                    password,
                    email,
                    active,
                    role: selectedRole
                }})).then(res => {
                    props.setIsOpen(false)
                })
            }}>Save</Button>
        </Modal.Actions>
    </Modal>)
}

const UserPage: NextPage = () => {
    const [users, setUsers] = useState([] as Except<User, 'password'>[])
    const [addUserShown, setAddUserShown] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [roles, setRoles] = useState([] as UserRole[])

    const [selectedRole, setSelectedRole] = useState(undefined as UserRole | undefined)

    const {dirs} = useContext(DirContext)

    const refreshUsers = () => {
        setUsername('')
        setPassword('')
        setEmail('')
        apiClient.protected.user.$get(apiWithHeaders({query: {}})).then(res => {
            setUsers(res)
            console.log(res)
        })
        apiClient.protected.admin.roles.$get(apiWithHeaders({}) as unknown as any).then(res => {
            setRoles(res)
        })
    }

    useEffect(() => {
        refreshUsers()
    }, [])

    const [userEditModalShown, setUserEditModalShown] = useState(false)
    const [userToEdit, setUserToEdit] = useState({} as User)
    const [userToEditRoles, setUserToEditRoles] = useState([] as UserRole[])

    return (<>
        <UserEditModal
            user={userToEdit}
            roles={userToEditRoles}
            isOpen={userEditModalShown}
            setIsOpen={(value) => setUserEditModalShown(value)}
            callbackRefresh={refreshUsers}
            />
        <Modal
            onClose={() => setAddUserShown(false)}
            onOpen={() => setAddUserShown(true)}
            open={addUserShown}
        >
            <Modal.Header>Add User</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='Username' value={username} onChange={(e) => {
                            e.preventDefault()
                            setUsername(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input placeholder='Password' type={'password'} value={password} onChange={(e) => {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input placeholder='Email' value={email} onChange={(e) => {
                            e.preventDefault()
                            setEmail(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Roles</label>
                        <Dropdown
                            options={roles.map(v => ({
                                key: v.id,
                                value: v.value,
                                text: v.value
                            }))}
                            onChange={(e, {value}) => {
                                setSelectedRole(roles.find(v => v.id === (value as any).key))
                            }}

                            selection/>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={(e) => {
                    e.preventDefault()
                    setAddUserShown(false)
                }}>Cancel</Button>
                <Button positive disabled={!(username !== '' && password !== '' && email !== '')} onClick={(e) => {
                    e.preventDefault()
                    apiClient.protected.admin.user.$post(apiWithHeaders({body: {username, password, active: true, imageURL: '', email, userLocationId: null, roles: _.isUndefined(selectedRole) ? [] : [selectedRole]}})).then(res => {
                        refreshUsers()
                    })

                    setAddUserShown(false)
                }}>Add</Button>
            </Modal.Actions>
        </Modal>
        <Container fluid style={{padding: '1rem'}}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan={5}>
                            Users
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            <Button positive icon={'plus'} onClick={(e)=> {
                                e.preventDefault()
                                setAddUserShown(true)
                            }}/>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell collapsing><Icon name={'picture'}/></Table.HeaderCell>
                        <Table.HeaderCell collapsing><Icon name={'id card'}/></Table.HeaderCell>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Active</Table.HeaderCell>
                        <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users.map(u => (
                        <Table.Row key={u.id}>
                            <Table.Cell><img width={'32'} height={'32'} src={u.imageURL !== '' ? `${dirs.baseURL}${dirs.profileImages}${u.imageURL}` : `${dirs.baseURL}${dirs.dummy}`} /></Table.Cell>
                            <Table.Cell>{u.id}</Table.Cell>
                            <Table.Cell><TableFieldEditor
                                value={u.username}
                                setValue={(value) => {
                                    apiClient.protected.admin.user.$patch(apiWithHeaders({body: {id: u.id, username: value}})).then(res => {
                                        refreshUsers()
                                    })
                                }}
                            /></Table.Cell>
                            <Table.Cell><TableFieldEditor
                                value={u.email}
                                setValue={(value) => {
                                    apiClient.protected.admin.user.$patch(apiWithHeaders({body: {id: u.id, email: value}})).then(res => {
                                        refreshUsers()
                                    })
                                }}
                            /></Table.Cell>
                            <Table.Cell>{u.active ? 'Yes' : 'No'}</Table.Cell>
                            <Table.Cell>
                                <div style={{display: "flex", flexDirection: 'row'}}>
                                    <Button
                                        as={'a'}
                                        icon={'forward'}
                                        href={'/users/' + u.id}
                                        primary
                                    />
                                    <Button
                                        icon={u.active ? 'ban' : 'check'}
                                        negative={u.active}
                                        positive={!u.active}
                                        disabled={u.id === 1}
                                        onClick={() => {
                                            if (u.active) {
                                                const confirmation = window.confirm("Are you sure you want to deactivate this user?")
                                                if (confirmation) {
                                                    apiClient.protected.admin.user.$patch(apiWithHeaders({
                                                        body: {
                                                            id: u.id,
                                                            active: false
                                                        }
                                                    })).then(res => {
                                                        refreshUsers()
                                                    })
                                                }
                                            } else {
                                                const confirmation = window.confirm("Are you sure you want to activate this user?")
                                                if (confirmation) {
                                                    apiClient.protected.admin.user.$patch(apiWithHeaders({
                                                        body: {
                                                            id: u.id,
                                                            active: true
                                                        }
                                                    })).then(res => {
                                                        refreshUsers()
                                                    })
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    </>)
}

export default UserPage