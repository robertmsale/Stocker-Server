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
import {InventoryItem, InventoryItemData, User} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Except, Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'
import {apiWithHeaders} from "~/utils/apiConfig";
import {DirContext} from "~/pages/_app";

const UserPage: NextPage = () => {
    const [users, setUsers] = useState([] as Except<User, 'password'>[])
    const [addUserShown, setAddUserShown] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState([] as string[])
    const [roles, setRoles] = useState([] as string[])

    const {dirs} = useContext(DirContext)

    useEffect(() => {
        apiClient.protected.user.$get(apiWithHeaders({query: {}})).then(res => {
            setUsers(res)
            console.log(res)
        })
        apiClient.protected.admin.roles.$get(apiWithHeaders({})).then(res => {
            setRoles(res.map(v => v.value))
        })
    }, [])

    return (<>
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
                        <input placeholder='Password' value={password} onChange={(e) => {
                            e.preventDefault()
                            setPassword(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' value={firstName} onChange={(e) => {
                            e.preventDefault()
                            setFirstName(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' value={lastName} onChange={(e) => {
                            e.preventDefault()
                            setLastName(e.target.value)
                        }}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Roles</label>
                        <select>
                            {roles.map(v => <option value={v}>{v}</option>)}
                        </select>
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={(e) => {
                    e.preventDefault()
                    setAddUserShown(false)
                }}>Cancel</Button>
                <Button onClick={(e) => {
                    e.preventDefault()
                    setAddUserShown(false)
                }}>Add</Button>
            </Modal.Actions>
        </Modal>
        <Container fluid style={{padding: '1rem'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Header>
                    Users Page
                </Header>
                <Button primary icon={'plus'} onClick={(e)=> {
                    e.preventDefault()
                    setAddUserShown(true)
                }}/>
            </div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell collapsing>📸</Table.HeaderCell>
                        <Table.HeaderCell collapsing>🪪</Table.HeaderCell>
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
                            <Table.Cell>{u.username}</Table.Cell>
                            <Table.Cell>{u.email}</Table.Cell>
                            <Table.Cell>{u.active ? 'Yes' : 'No'}</Table.Cell>
                            <Table.Cell>
                                <div style={{display: "flex", flexDirection: 'row'}}>
                                    <Button icon primary>
                                        <Icon name='edit'/>
                                    </Button>
                                    <Button icon negative>
                                        <Icon name='trash'/>
                                    </Button>
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