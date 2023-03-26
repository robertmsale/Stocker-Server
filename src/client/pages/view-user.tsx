import {useContext, useEffect, useState} from "react";
import {AppContext, Pages, socket} from "../App";
import Container from "@mui/material/Container";
import {
    Button,
    ButtonGroup,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import TextField from "@mui/material/TextField";
import _ from 'lodash'
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from "@prisma/client";
import SaveIcon from "@mui/icons-material/Save";
import {ChevronRight, Delete} from "@mui/icons-material";
import QRIcon from "@mui/icons-material/QrCode";
import AddIcon from "@mui/icons-material/Add";


const ViewUserPage = () => {
    const state = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [imageURL, setImageURL] = useState("")

    const user = _.first(state.users.filter(u => u.id === state.viewProfileId))

    useEffect(() => {
        setUsername(user?.username ?? "")
        setEmail(user?.email ?? "")
        setImageURL(user?.imageURL ?? "")
    }, [state.viewProfileId])

    return <Container component={Paper}>
        <Stack direction={'row'} spacing={2}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Profile Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell style={{alignItems: 'center', display: 'flex'}}><TextField
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            /><Button color={'success'} disabled={username === "" || username === user?.username} onClick={() => {
                                socket.emit(SocketServerMessages.UserChanged, {
                                    data: {
                                        username
                                    }, where: {id: user?.id}
                                } as Prisma.UserUpdateArgs)
                            }}><SaveIcon /></Button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell style={{alignItems: 'center', display: 'flex'}}><TextField
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                type={'email'}
                            /><Button color={'success'} disabled={email === "" || email === user?.email} onClick={() => {
                                socket.emit(SocketServerMessages.UserChanged, {
                                    data: {
                                        email
                                    }, where: {id: user?.id}
                                } as Prisma.UserUpdateArgs)
                            }}><SaveIcon /></Button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Password</TableCell>
                            <TableCell style={{alignItems: 'center', display: 'flex'}}><TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type={'password'}
                            /><Button color={'success'} disabled={password === ""} onClick={() => {
                                socket.emit(SocketServerMessages.UserChanged, {
                                    data: {
                                        password
                                    }, where: {id: user?.id}
                                } as Prisma.UserUpdateArgs)
                            }}><SaveIcon /></Button></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Active</TableCell>
                            <TableCell>{user?.active ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><img width={64} height={64} src={imageURL === '' ? '/vite.svg' : `/profile-images/${user?.imageURL}`} /></TableCell>
                            <TableCell><Button
                                variant={'contained'}
                                onClick={() => {
                                    const imginput = document.getElementById('profileimageupload') as HTMLInputElement
                                    imginput.click()
                                    imginput.onchange = () => {
                                        const file = _.get(imginput, 'files[0]', undefined)
                                        if (_.isUndefined(file)) return
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            socket.once(SocketClientMessages.ReceiveProfileImageURL, url => {
                                                setImageURL(url)
                                                socket.emit(SocketServerMessages.UserChanged, {
                                                    data: {
                                                        imageURL: url
                                                    }, where: { id: user?.id }
                                                } as Prisma.UserUpdateArgs)
                                            })
                                            socket.emit(SocketServerMessages.UploadProfileImage, reader.result)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            >
                                Upload Image
                                <input type={'file'} accept={'image/*'} multiple={false} hidden id={'profileimageupload'} />
                            </Button></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4}>Inventory</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.itemData
                            .filter(data => {
                                try {
                                    return _.get(_.toLower(data.name).match(_.toLower(state.search)), 'length', 0) > 0 ||
                                    _.get(_.toLower(data.description).match(_.toLower(state.search)), 'length', 0) > 0
                                } catch (e) {
                                    return true
                                }
                            })
                            .map(data => <><TableRow>
                            <TableCell><img width={32} height={32} src={data.imageURL === '' ? '/vite.svg' : '/item-images/' + data.imageURL} /></TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell><Button
                                variant={'contained'}
                                color={'success'}
                                onClick={() => {
                                    state.setNewItemDialogDataId(data.id)
                                    state.setLocType('user')
                                    state.setLocId(user?.id ?? -1)
                                    state.setNewItemDialogShown(true)
                                }}
                            ><AddIcon /></Button></TableCell>
                        </TableRow>
                            {state.items
                                .filter(item => item.dataId === data.id && item.userId === user?.id).map(item => <TableRow>
                                <TableCell />
                                <TableCell><ChevronRight /></TableCell>
                                <TableCell>ID: {item.id}</TableCell>
                                <TableCell><ButtonGroup variant={"contained"}>
                                    <Button
                                        onClick={() => {
                                            state.setViewItemId(item.id)
                                            state.setCurrentPage(Pages.ViewItem)
                                        }}
                                    ><QRIcon /></Button>
                                    <Button
                                        onClick={() => {
                                            state.setDeleteItemDialog(item.id)
                                        }}
                                        color={'error'}
                                    ><Delete /></Button>
                                </ButtonGroup></TableCell>
                            </TableRow>)}
                        </>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>
    </Container>
}

export default ViewUserPage