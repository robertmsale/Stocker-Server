import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext, socket} from "../App";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from '@prisma/client'
import _ from 'lodash'


const CreateWarehouseDialog = () => {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const state = useContext(AppContext)

    return <Dialog open={state.newWarehouseDialogShown} onClose={() => state.setNewWarehouseDialogShown(false)}>
        <DialogTitle>
            Create Warehouse
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <DialogContentText>
                    Enter the information below to create a new warehouse
                </DialogContentText>
                <TextField
                    autoFocus
                    label={'Name'}
                    fullWidth
                    variant={'standard'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    label={'Address'}
                    fullWidth
                    variant={'standard'}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button
                color={'error'}
                onClick={() => state.setNewUserDialogShown(false)}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    state.setNewWarehouseDialogShown(false)
                    socket.emit(SocketServerMessages.WarehouseCreated, {
                        data: {
                            active: true,
                            name,
                            address,
                            latitude: '0',
                            longitude: '0',
                        }
                    } as Prisma.WarehouseCreateArgs)
                }}
            >
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}

export default CreateWarehouseDialog