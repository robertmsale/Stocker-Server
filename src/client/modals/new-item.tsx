import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormLabel,
    Input,
    InputAdornment,
    ListItemIcon,
    ListItemText,
    Radio,
    RadioGroup,
    Skeleton,
    Stack
} from "@mui/material";
import {useContext, useState} from "react";
import {AppContext, Pages, socket} from "../App";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from '@prisma/client'
import _ from 'lodash'
import QRCode from "react-qr-code";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from "@mui/icons-material/Search";


const CreateItemDialog = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [id, setId] = useState(-1)
    const state = useContext(AppContext)
    const [search, setSearch] = useState("")

    const data = _.first(state.itemData.filter(v => v.id === state.newItemDialogDataId))

    const selectedUser = _.first(state.users.filter(v => v.id === state.locId))
    const selectedWarehouse = _.first(state.warehouses.filter(v => v.id === state.locId))

    const skeleton = <div style={{width: 256, height: 256, position: 'relative'}}>
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute'}} />
                    <Skeleton variant={'rectangular'} width={32} height={32} style={{position: 'absolute', left: '32px', top: '32px'}} />
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute', left: '80px'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', left: '16px'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', left: '16px', top: '80px'}} />
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute', right: '0'}} />
                    <Skeleton variant={'rectangular'} width={32} height={32} style={{position: 'absolute', right: '32px', top: '32px'}} />
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute', right: '80px'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', right: '16px'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', right: '16px', top: '80px'}} />
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute', bottom: '0'}} />
                    <Skeleton variant={'rectangular'} width={32} height={32} style={{position: 'absolute', left: '32px', bottom: '32px'}} />
                    <Skeleton variant={'rectangular'} width={16} height={96} style={{position: 'absolute', left: '80px', bottom: '0'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', left: '16px', bottom: '0'}} />
                    <Skeleton variant={'rectangular'} width={64} height={16} style={{position: 'absolute', left: '16px', bottom: '80px'}} />
                </div>

    const qr = <div style={{display: "flex", justifyContent: 'center', width: '100%'}}>
        <div style={{backgroundColor: "white", padding: '16px'}}>
            <QRCode size={224} value={`${id}`} level={'H'} />
        </div>
    </div>

    const userList = state.users.filter(user => {
            try {
                return _.get(_.toLower(user.username).match(_.toLower(search)), 'length', 0) > 0 ||
                    _.get(_.toLower(user.email).match(_.toLower(search)), 'length', 0) > 0
            } catch(e) {
                return true
            }
        }).map(user => <ListItem disablePadding>
        <ListItemButton onClick={() => {
            state.setLocId(user.id)
        }}>
            <ListItemIcon>
                <img width={32} height={32} src={user.imageURL === '' ? '/vite.svg' : `/profile-images/${user.imageURL}`} />
            </ListItemIcon>
            <ListItemText primary={user.username} />
        </ListItemButton>
    </ListItem>)

    const warehouseList = state.warehouses.filter(wh => {
        try {
            return _.get(_.toLower(wh.name).match(_.toLower(search)), 'length', 0) > 0 ||
                _.get(_.toLower(wh.address).match(_.toLower(search)), 'length', 0) > 0
        } catch (e) { return true}
    }).map(wh => <ListItem disablePadding>
        <ListItemButton onClick={() => {
            state.setLocId(wh.id)
        }}>
            <ListItemText primary={wh.name} />
        </ListItemButton>
    </ListItem>)

    return <Dialog maxWidth={'xl'} open={state.newItemDialogShown} onClose={() => state.setNewItemDialogShown(false)}>
        <DialogTitle>
            Create New Item
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <DialogContentText>
                    Create a QR Code for <b><i>{data?.name}</i></b>
                </DialogContentText>
                <Stack spacing={2} direction={'row'}>
                    {id < 0 ? skeleton : qr}
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Select a location type</FormLabel>
                            <RadioGroup
                                value={state.locType}
                                onChange={(e) => {
                                    state.setLocId(-1)
                                    state.setLocType(e.target.value as any)
                                }}
                                row
                            >
                                <FormControlLabel value={'user'} control={<Radio />} label={'User'} />
                                <FormControlLabel value={'warehouse'} control={<Radio />} label={'Warehouse'} />
                            </RadioGroup>
                        </FormControl>
                        <Input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            startAdornment={<InputAdornment position={'start'}><SearchIcon /></InputAdornment>}
                            placeholder={'Search...'}
                        />
                        <div style={{height: '200px', overflowY: 'scroll'}}>
                            <List>
                                {state.locType === 'user' ? userList : warehouseList}
                            </List>
                        </div>
                    </Stack>
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button
                color={'error'}
                onClick={() => state.setNewItemDialogShown(false)}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    const tmpitems = state.items
                    socket.once(SocketClientMessages.ReceiveItems, (items) => {
                        setId(_.get(_.difference(tmpitems, items), '[0]', -1))
                        state.setLocId(-1)
                    })
                    socket.emit(SocketServerMessages.ItemCreated, {
                        data: {
                            dataId: data?.id,
                            userId: state.locType === 'user' ? selectedUser?.id : undefined,
                            warehouseId: state.locType === 'warehouse' ? selectedWarehouse?.id : undefined
                        }
                    } as Prisma.InventoryItemCreateArgs)
                }}
                disabled={state.locId < 0}
                color={'success'}
            >
                {state.locId < 0 ? 'Create QR' : `Create QR and add to ${state.locType === "user" ? selectedUser?.username : selectedWarehouse?.name}`}
            </Button>
            <Button
                onClick={() => {
                    state.setViewItemId(id)
                    state.setCurrentPage(Pages.ViewItem)
                }}
                disabled={id < 0}
            >
                Go to item page
            </Button>
        </DialogActions>
    </Dialog>
}

export default CreateItemDialog