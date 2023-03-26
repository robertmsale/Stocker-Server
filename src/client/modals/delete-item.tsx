import {useContext} from "react";
import {AppContext, socket} from "../App";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {SocketServerMessages} from "../../server/types/socket";
import {Prisma} from "@prisma/client";


const DeleteItemDialog = () => {
    const state = useContext(AppContext)

    return <Dialog open={state.deleteItemDialog > 0} onClose={() => state.setDeleteItemDialog(-1)}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
            <DialogActions>
                <Button
                    onClick={() => state.setDeleteItemDialog(-1)}
                >Cancel</Button>
                <Button
                    color={'error'}
                    onClick={() => {
                        socket.emit(SocketServerMessages.ItemDeleted, {
                            where: {id: state.deleteItemDialog}
                        } as Prisma.InventoryItemDeleteArgs)
                        state.setDeleteItemDialog(-1)
                    }}
                ><Delete /></Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
}

export default DeleteItemDialog