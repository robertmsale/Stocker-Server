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
import {InventoryItem, InventoryItemData, User} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'

const UserPage: NextPage = () => {
    const [users, setUsers] = useState([] as User[])
    const [addUserShown, setAddUserShown] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState([] as string[])
    const [roles, setRoles] = useState([] as string[])

    useEffect(() => {
        apiClient.protected.user.$get().then(res => {
            setUsers(res)
        })
        apiClient.protected.roles.$get().then(res => {
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
                <Button icon={'plus'} onClick={(e)=> {
                    e.preventDefault()
                    setAddUserShown(true)
                }}/>
            </div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Username</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Role</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>John</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>
                            <Button icon>
                                <Icon name='edit'/>
                            </Button>
                            <Button icon>
                                <Icon name='trash'/>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jamie</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>Requires call</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>
                            <Button icon>
                                <Icon name='edit'/>
                            </Button>
                            <Button icon>
                                <Icon name='trash'/>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jill</Table.Cell>
                        <Table.Cell>Denied</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>
                            <Button icon>
                                <Icon name='edit'/>
                            </Button>
                            <Button icon>
                                <Icon name='trash'/>
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Container>
    </>)
}

export default UserPage