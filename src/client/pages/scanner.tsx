import Container from "@mui/material/Container";
import {Html5QrcodeScanner} from "html5-qrcode";
import {AppContext, Pages} from "../App";
import {useContext, useEffect} from "react";

const ScannerPage = () => {
    const state = useContext(AppContext)

    useEffect(() => {
        let config = {
            fps: 30,
            qrbox: 450,
            disableFlip: false
        }
        let scn = new Html5QrcodeScanner('qrscan', config, false)
        scn.render((res) => {
            state.setViewItemId(parseInt(res))
            state.setCurrentPage(Pages.ViewItem)
            scn.pause()
        }, errorMessage => {

        })
    },[])

    return <Container>
        <div id='qrscan'/>
    </Container>
}

export default ScannerPage