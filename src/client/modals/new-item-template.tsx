import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext, socket} from "../App";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from '@prisma/client'
import _ from 'lodash'


const CreateItemTemplateDialog = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [cost, setCost] = useState("")
    const [image, setImage] = useState("")
    const state = useContext(AppContext)

    return <Dialog open={state.newItemDataDialogShown} onClose={() => state.setNewItemDataDialogShown(false)}>
        <DialogTitle>
            Create Inventory Item Template
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <DialogContentText>
                    Enter the information below to create a new template
                </DialogContentText>
                <TextField
                    autoFocus
                    label={'Item Name'}
                    fullWidth
                    variant={'standard'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    label={'Item Description'}
                    fullWidth
                    variant={'standard'}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <TextField
                    label={'Item Cost'}
                    fullWidth
                    variant={'standard'}
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                />
                <Stack direction={'row'} justifyContent={'space-around'}>
                    <img src={image === '' ? '/vite.svg' : '/item-images/'+image} width={64} height={64} />
                    <Button
                        onClick={() => {
                            const imginput = document.getElementById('imageInput') as HTMLInputElement
                            imginput.click()
                            imginput.onchange = () => {
                                const file = _.get(imginput, 'files[0]', undefined)
                                if (_.isUndefined(file)) return
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    socket.on(SocketClientMessages.ReceiveItemImageURL, url => {
                                        setImage(url)
                                        socket.off(SocketClientMessages.ReceiveItemImageURL)
                                    })
                                    socket.emit(SocketServerMessages.UploadItemImage, reader.result)
                                }
                                reader.readAsDataURL(file)
                            }
                        }}
                    >
                        ⬅ Upload Image
                        <input id={'imageInput'} hidden accept={'image/*'} multiple={false} type={'file'} />
                    </Button>
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button
                color={'error'}
                onClick={() => state.setNewItemDataDialogShown(false)}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    state.setNewItemDataDialogShown(false)
                    socket.emit(SocketServerMessages.ItemDataCreated, {
                        data: {
                            active: true,
                            name,
                            description,
                            cost: _.toNumber(cost),
                            imageURL: image
                        }
                    } as Prisma.InventoryItemDataCreateArgs)
                }}
            >
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}

export default CreateItemTemplateDialog