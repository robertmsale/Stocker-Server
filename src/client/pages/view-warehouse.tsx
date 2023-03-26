import {useContext} from "react";
import {AppContext, Pages} from "../App";
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
    TableRow
} from "@mui/material";
import _ from 'lodash'
import AddIcon from "@mui/icons-material/Add";
import {ChevronRight, Delete} from "@mui/icons-material";
import QRIcon from "@mui/icons-material/QrCode";

const ViewWarehousePage = () => {
    const state = useContext(AppContext)

    const warehouse = _.first(state.warehouses.filter(w => w.id === state.viewWarehouseId))

    return <Container component={Paper}>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={4}>Inventory</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                 {state.itemData.filter(data => {
                                try {
                                    return _.get(_.toLower(data.name).match(_.toLower(state.search)), 'length', 0) > 0 ||
                                    _.get(_.toLower(data.description).match(_.toLower(state.search)), 'length', 0) > 0
                                } catch (e) {
                                    return true
                                }
                            }).map(data => <><TableRow>
                            <TableCell><img width={32} height={32} src={data.imageURL === '' ? '/vite.svg' : '/item-images/' + data.imageURL} /></TableCell>
                            <TableCell>{data.name}</TableCell>
                            <TableCell>{data.description}</TableCell>
                            <TableCell><Button
                                variant={'contained'}
                                color={'success'}
                                onClick={() => {
                                    state.setNewItemDialogDataId(data.id)
                                    state.setLocType('warehouse')
                                    state.setLocId(warehouse?.id ?? -1)
                                    state.setNewItemDataDialogShown(true)
                                }}
                            ><AddIcon /></Button></TableCell>
                        </TableRow>
                            {state.items.filter(item => item.dataId === data.id && item.warehouseId === warehouse?.id).map(item => <TableRow>
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
    </Container>
}

export default ViewWarehousePage