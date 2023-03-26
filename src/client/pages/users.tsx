import Container from "@mui/material/Container";
import {
    Button,
    ButtonGroup,
    Paper, Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip
} from "@mui/material";
import PictureIcon from "@mui/icons-material/Wallpaper";
import IDIcon from "@mui/icons-material/Badge";
import AddIcon from "@mui/icons-material/Add";
import {useContext, useState} from "react";
import {AppContext, Pages, socket, Usernp} from "../App";
import EditIcon from "@mui/icons-material/Edit";
import {QrCode} from "@mui/icons-material";
import _ from "lodash";
import {InventoryItemData, Prisma} from "@prisma/client";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import QRIcon from "@mui/icons-material/QrCode";
import CancelIcon from "@mui/icons-material/Cancel";

const UserEditor = (user: Usernp) => {
    const [editMode, setEditMode] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [active, setActive] = useState(user.active)
    const [imageURL, setImageURL] = useState(user.imageURL)

    const state = useContext(AppContext)

    return <TableRow key={user.id} style={{cursor: 'pointer'}} onClick={() => {
        state.setViewProfileId(user.id)
        state.setCurrentPage(Pages.ViewUser)
    }}>
        <TableCell width={64}>
            {editMode ?
                <Button variant={'contained'} onClick={() => {
                    const imginput = document.getElementById(`userimage${user.id}input`) as HTMLInputElement
                    imginput.click()
                    imginput.onchange = () => {
                        const file = _.get(imginput, 'files[0]', undefined)
                        if (_.isUndefined(file)) return
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            socket.on(SocketClientMessages.ReceiveProfileImageURL, url => {
                                setImageURL(url)
                                socket.off(SocketClientMessages.ReceiveProfileImageURL)
                            })
                            socket.emit(SocketServerMessages.UploadProfileImage, reader.result)
                        }
                        reader.readAsDataURL(file)
                    }
                }}>
                    <img width={32} height={32} src={imageURL === '' ? '/vite.svg' : `/profile-images/${imageURL}`} />
                    <input id={`userimage${user.id}input`} hidden accept={'image/*'} multiple={false} type={'file'} />
                </Button>
                : <img width={32} height={32} src={user.imageURL === '' ? '/vite.svg' : `/profile-images/${user.imageURL}`} />}
        </TableCell>
        <TableCell width={64}>{user.id}</TableCell>
        <TableCell>{editMode ? <TextField
            value={username}
            onChange={e => setUsername(e.target.value)}
            label={'Edit Username'}
        /> : user.username}</TableCell>
        <TableCell>{editMode ? <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            label={'Edit Email'}
            type={'email'}
            fullWidth
        /> : user.email}</TableCell>
        <TableCell width={128}>{editMode ? <Tooltip title={user.id === 1 ? 'Cannot deactivate the admin' : 'Deactivating a user will prevent them from being able to sign in'}><Switch
            checked={active}
            onChange={e => setActive(e.target.checked)}
            disabled={user.id === 1}
        /></Tooltip> : active ? 'Yes' : 'No'}</TableCell>
        <TableCell size={'small'} width={180}>
            <ButtonGroup
                variant={'contained'}
            >
                <Tooltip title={editMode ? "Save changes" : "Click to create a QR code and add to your inventory"}>
                    <Button
                        color={'success'}
                        onClick={() => {
                            socket.emit(SocketServerMessages.UserChanged, {
                                data: {
                                    imageURL,
                                    username,
                                    active,
                                    email
                                },
                                where: {
                                    id: user.id
                                }
                            } as Prisma.UserUpdateArgs)
                            setEditMode(false)
                        }}
                    >
                        {editMode ? <SaveIcon /> : <QRIcon/>}
                    </Button>
                </Tooltip>
                <Tooltip title={editMode ? 'Cancel editing' : 'Edit this item\'s information'}>
                    <Button
                        color={editMode ? 'error' : 'primary'}
                        onClick={() => {
                            setEditMode(!editMode)
                        }}
                    >
                        {editMode ? <CancelIcon /> : <EditIcon />}
                    </Button>
                </Tooltip>
            </ButtonGroup>
        </TableCell>
    </TableRow>
}
const UsersPage = () => {
    const state = useContext(AppContext)

    return <Container maxWidth={'xl'} component={Paper}>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5}>Users</TableCell>
                        <TableCell><Button variant={'contained'} color={'success'} onClick={() => {
                            state.setNewUserDialogShown(true)
                        }}>
                            <AddIcon />
                        </Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><PictureIcon/></TableCell>
                        <TableCell><IDIcon/></TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.users
                        .filter(v => {
                            try {
                                return _.get(v.id.toString(10).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.username).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.email).match(state.search), 'length', 0) > 0

                            } catch (e) {
                                return true
                            }
                        })
                        .map(user => <UserEditor
                            email={user.email}
                            active={user.active}
                            imageURL={user.imageURL}
                            id={user.id}
                            username={user.username}
                            key={user.id}
                        />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default UsersPage