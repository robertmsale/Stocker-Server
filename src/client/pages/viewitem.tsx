import {useContext} from "react";
import {AppContext} from "../App";
import {Container} from '@mui/material';
import QRCode from 'react-qr-code'
import _ from 'lodash'
import Grid from "@mui/material/Grid";


const ViewItemPage = () => {
    const state = useContext(AppContext)

    const item = _.first(state.items.filter(i => i.id === state.viewItemId))
    const data = _.first(state.itemData.filter(d => d.id === item?.dataId))

    return <Container>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div style={{padding: '24px', backgroundColor: 'white'}}>
                    <QRCode value={`${state.viewItemId}`} />
                </div>
            </Grid>
            <Grid item xs={6}>

            </Grid>
            <Grid item xs={6}>
            </Grid>
        </Grid>
    </Container>
}

export default ViewItemPage