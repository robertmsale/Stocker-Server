import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from "expo-barcode-scanner";
import {useEffect, useState, createContext} from "react";
import {AsyncLocalStorage} from "async_hooks";
import {styles} from "./styles";
import {Except} from "type-fest";

import {InventoryItem, InventoryItemData, User} from './types/prisma/client'
import {Dirs} from './types'
import ItemPage from "./pages/item";
import LoginPage from "./pages/login";
import Scanner from "./pages/scanner";

type Usernp = Except<User, 'password'>
export enum Pages {
    Item,
    Login,
    Scanner,
    Loading
}
interface AppContextProps {
    page: Pages
    setPage: (page: Pages) => void
    user: Usernp
    setUser: (user: Usernp) => void
    dirs: Dirs
    setDirs: (dirs: Dirs) => void
    item: InventoryItem
    setItem: (item: InventoryItem) => void
    itemData: InventoryItemData
    setItemData: (data: InventoryItemData) => void
}
export const AppContext = createContext({} as AppContextProps)

export default function App() {
    const [user, setUser] = useState<Usernp>({} as Usernp)
    const [page, setPage] = useState<Pages>(Pages.Loading)
    const [dirs, setDirs] = useState<Dirs>({} as Dirs)
    const [item, setItem] = useState<InventoryItem>({} as InventoryItem)
    const [itemData, setItemData] = useState<InventoryItemData>({} as InventoryItemData)

    useEffect(() => {
    }, [])

    let CurrentPage = () => {
        switch (page) {
            case Pages.Item: return <ItemPage />
            case Pages.Login: return <LoginPage />
            case Pages.Scanner: return <Scanner />
            case Pages.Loading: return (
                <Text>Initializing...</Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <AppContext.Provider value={{
                user,
                setUser,
                dirs,
                setDirs,
                page,
                setPage,
                item,
                setItem,
                itemData,
                setItemData
            }}>

            </AppContext.Provider>
        </View>
    );
}
