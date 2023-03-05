import '~/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {staticPath} from '~/utils/$path'
import {Button, Container, Header, Icon, Menu, Ref, Segment, Sidebar, Sticky} from 'semantic-ui-react'
import {useRef, useState, createRef} from 'react'
import 'semantic-ui-css/semantic.min.css'
import Link from "next/link";
import 'chart.js/auto'
import dynamic from "next/dynamic";

const MyApp = ({Component, pageProps}: AppProps) => {
    const [sidebarShown, setSidebarShown] = useState(false)
    const SidebarButtons = [
        {
            href: '/',
            text: 'Dashboard'
        },
        {
            href: '/inventory',
            text: 'Inventory'
        },
        {
            href: '/automations',
            text: 'Automations'
        },
        {
            href: '/users',
            text: 'Users'
        },
        {
            href: '/warehouses',
            text: 'Warehouses'
        },
        {
            href: '/reports',
            text: 'Reports'
        },
        {
            href: '/etc',
            text: 'Etc'
        },
    ].map(v => (
        <Menu.Item
            as={'a'}
            key={v.href}
            onClick={() => setSidebarShown(false)}>
            <Header size={'medium'}>
                <Link href={v.href}>{v.text}</Link>
            </Header>
        </Menu.Item>
    ))
    return (
        <>
            <Head>
                <link rel="icon" href={staticPath.favicon_png}/>
            </Head>
            <Sidebar.Pushable style={{height: '100vh', width: 'auto'}}>
                <Sidebar as={Menu}
                         animation={'push'}
                         inverted
                         onHide={() => setSidebarShown(false)}
                         vertical
                         visible={sidebarShown}

                >
                    <Menu vertical inverted fluid>
                        {SidebarButtons}
                    </Menu>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment
                        inverted
                        textAlign={'center'}
                        style={{minWidth: 350, padding: '1em 0em'}}
                        vertical
                    >
                        <Container fluid>
                            <Menu inverted pointing secondary size={'large'}>
                                <Menu.Item position={'left'} onClick={() => setSidebarShown(!sidebarShown)}>
                                    <Icon name={'sidebar'} />
                                </Menu.Item>
                                <Menu.Item position={undefined}>
                                    Stocker
                                </Menu.Item>
                                <Menu.Item position={'right'}>
                                    <Button as={'a'} inverted>Log In</Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                <Component {...pageProps} />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </>
    )
}

export default dynamic(() => Promise.resolve(MyApp), {ssr: false})
