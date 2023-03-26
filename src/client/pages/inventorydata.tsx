import {useContext, useState} from "react";
import {AppContext, socket} from "../App";
import Container from "@mui/material/Container";
import {
    Button,
    ButtonGroup,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import _ from "lodash";
import AddIcon from "@mui/icons-material/Add";
import PictureIcon from "@mui/icons-material/Wallpaper";
import EditIcon from '@mui/icons-material/Edit'
import IDIcon from "@mui/icons-material/Badge";
import QRIcon from "@mui/icons-material/QrCode";
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import {InventoryItemData} from "@prisma/client";
import TextField from "@mui/material/TextField";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from '@prisma/client'


const InventoryItemDataEditor = (item: InventoryItemData) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [cost, setCost] = useState(item.cost.toString(10))
    const [imageURL, setImageURL] = useState(item.imageURL)

    const state = useContext(AppContext)

    return <TableRow key={item.id}>
        <TableCell width={64}>
            {editMode ?
                <Button variant={'contained'} onClick={() => {
                    const imginput = document.getElementById(`image${item.id}input`) as HTMLInputElement
                    imginput.click()
                    imginput.onchange = () => {
                        const file = _.get(imginput, 'files[0]', undefined)
                        if (_.isUndefined(file)) return
                        const reader = new FileReader()
                        reader.onloadend = () => {
                            socket.on(SocketClientMessages.ReceiveItemImageURL, url => {
                                setImageURL(url)
                                socket.off(SocketClientMessages.ReceiveItemImageURL)
                            })
                            socket.emit(SocketServerMessages.UploadItemImage, reader.result)
                        }
                        reader.readAsDataURL(file)
                    }
                }}>
                    <img width={32} height={32} src={imageURL === '' ? '/vite.svg' : `/item-images/${imageURL}`} />
                    <input id={`image${item.id}input`} hidden accept={'image/*'} multiple={false} type={'file'} />
                </Button>
                : <img width={32} height={32} src={item.imageURL === '' ? '/vite.svg' : `/item-images/${item.imageURL}`} />}
        </TableCell>
        <TableCell width={64}>{item.id}</TableCell>
        <TableCell>{editMode ? <TextField
            value={name}
            onChange={e => setName(e.target.value)}
            label={'Edit Name'}
        /> : item.name}</TableCell>
        <TableCell>{editMode ? <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            label={'Edit Description'}
            fullWidth
        /> : item.description}</TableCell>
        <TableCell width={128}>{editMode ? <Tooltip title={'Enter a plain number without commas, currency symbols, etc.'}><TextField
            value={cost}
            onChange={e => setCost(e.target.value)}
            label={'Edit Cost'}
        /></Tooltip> : `$${item.cost}`}</TableCell>
        <TableCell size={'small'} width={180}>
            <ButtonGroup
                variant={'contained'}
            >
                <Tooltip title={editMode ? "Save changes" : "Click to create a QR code and add to your inventory"}>
                    <Button
                        color={'success'}
                        onClick={() => {
                            if (editMode) {
                                socket.emit(SocketServerMessages.ItemDataChanged, {
                                    data: {
                                        imageURL,
                                        cost: _.toNumber(cost),
                                        description,
                                        name
                                    },
                                    where: {
                                        id: item.id
                                    }
                                } as Prisma.InventoryItemDataUpdateArgs)
                                setEditMode(false)
                            } else {
                                state.setNewItemDialogDataId(item.id)
                                state.setNewItemDialogShown(true)
                            }
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

const InventoryDataPage = () => {
    const state = useContext(AppContext)

    return <Container maxWidth={'xl'}>
        <TableContainer>
            <Table component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5}>Inventory Templates</TableCell>
                        <TableCell>
                            <Tooltip title={"Click to create a new template"}>
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => {
                                        state.setNewItemDataDialogShown(true)
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><PictureIcon /></TableCell>
                        <TableCell><IDIcon /></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Cost</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.itemData
                        .filter(v => {
                            try {
                                return _.get(v.id.toString(10).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.name).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.description).match(state.search), 'length', 0) > 0

                            } catch (e) {
                                return true
                            }
                        })
                        .map(idata => <InventoryItemDataEditor
                            id={idata.id}
                            active={idata.active}
                            description={idata.description}
                            imageURL={idata.imageURL}
                            cost={idata.cost}
                            name={idata.name} />)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default InventoryDataPage