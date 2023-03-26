import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import React, {useState, createContext, useEffect, useReducer, useContext} from "react";

import reactLogo from "./assets/react.svg";
import {Button, CssBaseline, Drawer, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {Events, InventoryItem, InventoryItemData, User, Warehouse} from "@prisma/client";
import {Except, Merge} from "type-fest";
import _ from 'lodash'
import LoginPage from "./pages/login";
import {io} from 'socket.io-client'

import {createTheme, ThemeProvider} from '@mui/material/styles';
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import HomeIcon from '@mui/icons-material/Home'
import ScannerIcon from '@mui/icons-material/Scanner'
import InventoryIcon from '@mui/icons-material/Inventory2'
import UsersIcon from '@mui/icons-material/VerifiedUserSharp'
import WarehouseIcon from '@mui/icons-material/Warehouse'
import Container from "@mui/material/Container";
import {SocketClientMessages, SocketServerMessages} from "../server/types/socket";
import Dashboard from "./pages/dashboard";
import InventoryDataPage from "./pages/inventorydata";
import CreateItemTemplateDialog from "./modals/new-item-template";
import UsersPage from "./pages/users";
import WarehousesPage from "./pages/warehouses";
import CreateUserDialog from "./modals/new-user";
import CreateWarehouseDialog from "./modals/new-warehouse";
import PrimarySearchAppBar from "./components/appbar";
import CreateItemDialog from "./modals/new-item";
import ViewUserPage from "./pages/view-user";
import DeleteItemDialog from "./modals/delete-item";
import ViewItemPage from "./pages/viewitem";
import ViewWarehousePage from "./pages/view-warehouse";
import ScannerPage from "./pages/scanner";

export type Usernp = Except<User, 'password'>
export type EventsSerial = Merge<Except<Events, 'time'>, {time: string}>

const theme = createTheme({
    palette: {
        mode: 'dark'
    }
})


export enum Pages {
    Dashboard,
    Login,
    InventoryData,
    InventoryItem,
    Users,
    Profile,
    Warehouses,
    Scanner,
    ViewItem,
    ViewWarehouse,
    ViewUser,
}

function DrawerList() {
    const state = useContext(AppContext)

    const list = [
        {
            icon: <HomeIcon />,
            label: 'Dashboard',
            action: () => {
                state.setCurrentPage(Pages.Dashboard)
                state.setDrawerOpen(false)
            },
            tooltip: "Your home page"
        },
        {
            icon: <ScannerIcon />,
            label: 'Scan Item',
            action: () => {
                state.setCurrentPage(Pages.Scanner)
                state.setDrawerOpen(false)
            },
            tooltip: "Use the camera to scan items in and out of inventory"
        },
        {
            icon: <InventoryIcon />,
            label: 'Inventory Templates',
            action: () => {
                state.setCurrentPage(Pages.InventoryData)
                state.setDrawerOpen(false)
            },
            tooltip: "Manage the templates used to generate QR codes"
        },
        {
            icon: <UsersIcon />,
            label: 'Users',
            action: () => {
                state.setCurrentPage(Pages.Users)
                state.setDrawerOpen(false)
            },
            tooltip: "Manage users and their inventory"
        },
        {
            icon: <WarehouseIcon />,
            label: 'Warehouses',
            action: () => {
                state.setCurrentPage(Pages.Warehouses)
                state.setDrawerOpen(false)
            },
            tooltip: "Manage warehouses and their inventory"
        },
    ]

    return (
        <List>
            {list.map(value => <ListItem disablePadding key={value.label}>
                <Tooltip title={value.tooltip} placement={'right'}>
                    <ListItemButton onClick={value.action}>
                        <ListItemIcon>
                            {value.icon}
                        </ListItemIcon>
                        <ListItemText>{value.label}</ListItemText>
                    </ListItemButton>
                </Tooltip>
            </ListItem>)}
        </List>
    )
}

const memorablePages = new Set([
    Pages.Warehouses,
    Pages.Users,
    Pages.InventoryData,
    Pages.Dashboard,
    Pages.Scanner,
    Pages.Profile
])
interface AppState {
    // Object States
    currentUser: Usernp | undefined
    setCurrentUser: (user: Usernp | undefined) => void
    events: EventsSerial[]
    setEvents: (e: EventsSerial[]) => void
    users: Usernp[]
    setUsers: (users: Usernp[]) => void
    items: InventoryItem[]
    setItems: (items: InventoryItem[]) => void
    itemData: InventoryItemData[]
    setItemData: (items: InventoryItemData[]) => void
    warehouses: Warehouse[]
    setWarehouses: (w: Warehouse[]) => void

    // Page States
    search: string
    setSearch: (v: string) => void
    currentPage: Pages
    setCurrentPage: (p: Pages) => void
    drawerOpen: boolean
    setDrawerOpen: (b: boolean) => void
    viewItemId: number
    setViewItemId: (n: number) => void
    viewWarehouseId: number
    setViewWarehouseId: (n: number) => void
    viewProfileId: number
    setViewProfileId: (n: number) => void

    // Dialog States
    newItemDataDialogShown: boolean
    setNewItemDataDialogShown: (b: boolean) => void
    newItemDialogShown: boolean
    setNewItemDialogShown: (b: boolean) => void
    newItemDialogDataId: number
    setNewItemDialogDataId: (n: number) => void
    newUserDialogShown: boolean
    setNewUserDialogShown: (b: boolean) => void
    newWarehouseDialogShown: boolean
    setNewWarehouseDialogShown: (b: boolean) => void
    deleteItemDialog: number
    setDeleteItemDialog: (n: number) => void

    locType: 'user' | 'warehouse'
    setLocType: (v: 'user'|'warehouse') => void
    locId: number
    setLocId: (v: number) => void
}

export const AppContext = createContext<AppState>({} as AppState)


export const socket = io({autoConnect: false})
function App() {
    const [currentUser, setCurrentUser] = useState<Usernp | undefined>((() => {
        let usr = localStorage.getItem("currentUser")
        if (_.isNull(usr)) return undefined
        else return JSON.parse(usr)
    })())
    const [users, setUsers] = useState<Usernp[]>([])
    const [items, setItems] = useState<InventoryItem[]>([])
    const [itemData, setItemData] = useState<InventoryItemData[]>([])
    const [warehouses, setWarehouses] = useState<Warehouse[]>([])
    const [events, setEvents] = useState<EventsSerial[]>([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState((() => {
        if (_.isUndefined(currentUser)) {
            return Pages.Login
        } else {
            const page = localStorage.getItem('rememberedPage')
            if (!_.isNull(page)) return _.toNumber(page)
            return Pages.Dashboard
        }
    })())

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [newItemDialogShown, setNewItemDialogShown] = useState(false)
    const [newItemDataDialogShown, setNewItemDataDialogShown] = useState(false)
    const [newUserDialogShown, setNewUserDialogShown] = useState(false)
    const [newWarehouseDialogShown, setNewWarehouseDialogShown] = useState(false)

    const [viewItemId, setViewItemId] = useState(-1)
    const [viewWarehouseId, setViewWarehouseId] = useState(-1)
    const [viewProfileId, setViewProfileId] = useState(-1)
    const [newItemDialogDataId, setNewItemDialogDataId] = useState(-1)
    const [deleteItemDialog, setDeleteItemDialog] = useState(-1)
    const [locType, setLocType] = useState<'user'|'warehouse'>('warehouse')
    const [locId, setLocId] = useState(-1)

    // remember current page
    useEffect(() => {
        if (memorablePages.has(currentPage)) localStorage.setItem('rememberedPage', `${currentPage}`)
    }, [currentPage])

    useEffect(() => {
        if (_.isUndefined(currentUser)) {
            if (socket.connected) socket.disconnect()
            socket.removeAllListeners()
        } else {
            if (!socket.connected) {
                socket.on(SocketClientMessages.ReceiveItems, v => setItems(v))
                socket.on(SocketClientMessages.ReceiveItemData, v => setItemData(v))
                socket.on(SocketClientMessages.ReceiveUsers, v => setUsers(v))
                socket.on(SocketClientMessages.ReceiveWarehouses, v => setWarehouses(v))
                socket.on(SocketClientMessages.ReceiveEvents, v => setEvents(v))
                socket.connect()
            }
        }
    }, [currentUser])

    return (
        <AppContext.Provider value={{
            currentUser, setCurrentUser,
            users, setUsers,
            items, setItems,
            itemData, setItemData,
            warehouses, setWarehouses,
            search, setSearch,
            currentPage, setCurrentPage,
            events, setEvents,
            drawerOpen, setDrawerOpen,
            newItemDataDialogShown, setNewItemDataDialogShown,
            newItemDialogShown, setNewItemDialogShown,
            newUserDialogShown, setNewUserDialogShown,
            newWarehouseDialogShown, setNewWarehouseDialogShown,
            viewItemId, setViewItemId,
            viewWarehouseId, setViewWarehouseId,
            viewProfileId, setViewProfileId,
            newItemDialogDataId, setNewItemDialogDataId,
            deleteItemDialog, setDeleteItemDialog,
            locType, setLocType,
            locId, setLocId
        }}>
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                {_.isUndefined(currentUser) ? <LoginPage/> : <PrimarySearchAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
                <Container style={{height: 'calc(100vh - 64px)', overflowY: 'scroll'}}>
                    {currentPage === Pages.Dashboard ? <Dashboard /> : <></>}
                    {currentPage === Pages.InventoryData ? <InventoryDataPage /> : <></>}
                    {currentPage === Pages.Users ? <UsersPage /> : <></>}
                    {currentPage === Pages.Warehouses ? <WarehousesPage /> : <></>}
                    {currentPage === Pages.ViewUser ? <ViewUserPage /> : <></>}
                    {currentPage === Pages.ViewItem ? <ViewItemPage /> : <></>}
                    {currentPage === Pages.ViewWarehouse ? <ViewWarehousePage /> : <></>}
                    {currentPage === Pages.Scanner ? <ScannerPage /> : <></>}
                </Container>
                <Drawer
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                >
                    <DrawerList />
                </Drawer>
                <CreateItemTemplateDialog />
                <CreateUserDialog />
                <CreateWarehouseDialog />
                <CreateItemDialog />
                <DeleteItemDialog />
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
