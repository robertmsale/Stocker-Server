import Container from "@mui/material/Container";
import {AppContext, Pages} from "../App";
import {useContext} from "react";
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
import IDIcon from "@mui/icons-material/Badge";
import AddIcon from "@mui/icons-material/Add";
import {QrCode} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import _ from "lodash";


const WarehousesPage = () => {
    const state = useContext(AppContext)
    return <Container component={Paper}>
        <TableContainer>
            <Table style={{height: 'calc(100vh - 64px)'}}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3}>Warehouses</TableCell>
                        <TableCell>
                            <Tooltip title={"Create a warehouse"}>
                                <Button
                                    onClick={() => {

                                    }}
                                    variant={'contained'}
                                >
                                    <AddIcon />
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><IDIcon /></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.warehouses
                        .filter(v => {
                            try {
                                return _.get(v.id.toString(10).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.name).match(state.search), 'length', 0) > 0 ||
                                _.get(_.toLower(v.address).match(state.search), 'length', 0) > 0
                            } catch (e) {
                                return true
                            }
                        })
                        .map(wh => <TableRow key={wh.id}>
                        <TableCell width={64}>{wh.id}</TableCell>
                        <TableCell>{wh.name}</TableCell>
                        <TableCell>{wh.address}</TableCell>
                        <TableCell width={180}>
                            <ButtonGroup variant={'contained'}>
                                <Button color={"success"} onClick={() => {
                                    state.setViewWarehouseId(wh.id)
                                    state.setCurrentPage(Pages.ViewWarehouse)
                                }}>
                                    View
                                </Button>
                                <Button onClick={() =>{

                                }}>
                                    <EditIcon />
                                </Button>
                            </ButtonGroup>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
}

export default WarehousesPage