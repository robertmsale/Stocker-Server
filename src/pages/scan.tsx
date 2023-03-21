import {Html5QrcodeScanner} from 'html5-qrcode'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {Html5QrcodeConfigs, Html5QrcodeFullConfig} from "html5-qrcode/html5-qrcode";

const ScanPage = () => {
    const router = useRouter()

    useEffect(() => {
        let config = {
            fps: 30,
            qrbox: 550,
            disableFlip: false
        }
        let scn = new Html5QrcodeScanner('qrscan', config, false)
        scn.render((res) => {
            window.location.href = res
        }, (err) => {
        })
    })

    return (
        <div id='qrscan'/>
    )
}

export default ScanPage