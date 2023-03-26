import Container from "@mui/material/Container";
import {useContext, useEffect} from "react";
import {AppContext} from "../App";
import Grid from "@mui/material/Grid";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import type {} from '@mui/x-data-grid/themeAugmentation'
import {createTheme} from "@mui/material/styles";
import {
    Button,
    Icon,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import IDIcon from '@mui/icons-material/Badge'
import PictureIcon from '@mui/icons-material/Wallpaper'
import EditIcon from '@mui/icons-material/Edit'
import QRIcon from '@mui/icons-material/QrCode'
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import _ from 'lodash'



const DashboardPage = () => {
    const state = useContext(AppContext)

    const eventCols: GridColDef[] = [
        {field:'time', headerName: 'time', width: 150, sortable: true},
        {field:'description', headerName: 'Description', width: 400}
    ]

    return <>
        <Container maxWidth={'xl'}>

            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Paper style={{height: 'calc(100vh - 64px)'}}>
                        <DataGrid
                            columns={eventCols}
                            rows={state.events}
                            // initialState={{
                            //     pagination: {
                            //         paginationModel: {
                            //             pageSize: 10
                            //         }
                            //     }
                            // }}
                            // pageSizeOptions={[10]}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer component={Paper} style={{height: 'calc(100vh - 64px'}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <Typography
                                            variant={'h5'}
                                            width={'100%'}
                                            textAlign={'center'}
                                        >Your Inventory</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><PictureIcon /></TableCell>
                                    <TableCell><IDIcon /></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
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
                                    .map(idata => <TableRow key={idata.id}>
                                    <TableCell>
                                        <img width={32} height={32} src={idata.imageURL === '' ? '/vite.svg' : `/item-images/${idata.imageURL}`} />
                                    </TableCell>
                                    <TableCell>{idata.id}</TableCell>
                                    <TableCell>{idata.name}</TableCell>
                                    <TableCell>{idata.description}</TableCell>
                                    <TableCell>
                                        <Tooltip title={"Click to create a QR code and add to your inventory"}>
                                            <Button
                                                variant={'contained'}
                                                color={'success'}
                                                onClick={() => {}}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container>
    </>
}
export default DashboardPage