import {NextPage} from "next";
import {
    Button,
    Container,
    Dimmer,
    Form,
    Grid,
    Header,
    Icon, Input,
    Loader,
    Modal,
    Search,
    Segment,
    Table
} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {InventoryItem, InventoryItemData} from "$prisma/client";
import useAspidaSWR from "@aspida/swr";
import {apiClient} from "~/utils/apiClient";
import {Merge} from "type-fest";
import dynamic from "next/dynamic";
import _ from 'lodash'

const ReportsPage: NextPage = () => {

    return (<>
        <Header>
            Reports Page
        </Header>
    </>)
}

export default ReportsPage