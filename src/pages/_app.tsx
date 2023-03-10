import '~/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from 'next/head'
import {staticPath} from '~/utils/$path'
import {
    Button,
    Container,
    Form,
    Grid,
    Header,
    Icon,
    Menu,
    Message, Modal,
    Ref,
    Segment,
    Sidebar,
    Sticky
} from 'semantic-ui-react'
import {useRef, useState, createRef, createContext, useEffect} from 'react'
import 'semantic-ui-css/semantic.min.css'
import Link from "next/link";
import 'chart.js/auto'
import dynamic from "next/dynamic";
import {User} from "$prisma/client";
import _ from "lodash";
import {apiClient} from "~/utils/apiClient";
import {Dirs} from "~/utils/types";
import {apiWithHeaders} from "~/utils/apiConfig";
import {Except} from "type-fest";
import {useRouter} from "next/router";

type Usernp = Except<User, 'password'>
export const UserContext = createContext({} as { user: Usernp | undefined, setUser: (user: Usernp | undefined) => void })
export const DirContext = createContext({} as { dirs: Dirs, setDirs: (dir: Dirs) => void })
const MyApp = ({Component, pageProps}: AppProps) => {
    const router = useRouter()

    const [sidebarShown, setSidebarShown] = useState(false)
    const [user, setUser] = useState<Usernp | undefined>(undefined)

    const [loginShown, setLoginShown] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [dirs, setDirs] = useState<Dirs>({
        baseURL: "",
        itemImages: "/uploads/item-images/",
        profileImages: "/uploads/profile-images/",
        dummy: "/static/icons/dummy.svg"
    })

    useEffect(() => {
        if (_.isUndefined(user) && localStorage.getItem('token') !== '') {
            apiClient.try_login.$get(apiWithHeaders({})).then(res => {
                setUser(res)
            })
        }
    },[user])

    useEffect(() => {
        apiClient.dirs.$get().then(res => {
            setDirs(res)
        }).catch(e => console.error(e))
        apiClient.try_login.$get().then(res => {
            setUser(res)
        }).catch(e => console.error(e))
    }, [])

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
            href: '/user-locations',
            text: 'User Locations'
        },
        {
            href: '/warehouses',
            text: 'Warehouses'
        },
        {
            href: '/reports',
            text: 'Reports'
        },
    ].map(v => (
        <Menu.Item
            as={'a'}
            key={v.href}
            onClick={() => {
                router.push(v.href)
                setSidebarShown(false)
            }}>
            <Header size={'medium'}>
                <Link href={v.href}>{v.text}</Link>
            </Header>
        </Menu.Item>
    ))

    const MainComponent = () => {
        if (!_.isUndefined(user)) {
            return <Component className={'yesPrint'} {...pageProps} />
        } else {
            return (
                <Container text style={{padding: '1rem'}} className={'yesPrint'}>
                    <Header>
                        You are not logged in!
                    </Header>
                    <Button onClick={() => {
                        setLoginShown(true)
                    }}>Login</Button>
                </Container>
            )
        }
    }
    return (
        <>
            <Head>
                <link rel="icon" href={staticPath.favicon_png}/>
            </Head>
            <Sidebar.Pushable style={{height: '100vh', width: 'auto'}}>
                <Sidebar as={Menu}
                         className={'noPrint'}
                         animation={'push'}
                         inverted
                         onHide={() => setSidebarShown(false)}
                         vertical
                         visible={sidebarShown}

                >
                    <Menu vertical inverted fluid style={{padding: '1rem'}}>
                        <Header inverted>Main Menu</Header>
                        {SidebarButtons}
                    </Menu>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment
                        inverted
                        textAlign={'center'}
                        style={{minWidth: 350, padding: '1em 0em'}}
                        vertical
                        className={'noPrint'}
                    >
                        <Container fluid>
                            <Menu inverted pointing secondary size={'large'}>
                                <Menu.Item position={'left'} onClick={() => setSidebarShown(!sidebarShown)}>
                                    <Icon name={'sidebar'}/>
                                </Menu.Item>
                                <Menu.Item position={undefined}>
                                    Stocker
                                </Menu.Item>
                                <Menu.Item position={'right'}>
                                    <Button as={'a'} inverted onClick={() => {
                                        if (_.isUndefined(user)) {
                                            setLoginShown(true)
                                        } else {
                                            const answer = window.confirm("Are you sure you want to log out?")
                                            if (answer) {
                                                setUser(undefined)
                                                localStorage.setItem('token', '')
                                            }
                                        }
                                    }}>Log {_.isUndefined(user) ? 'In' : 'Out'}</Button>
                                </Menu.Item>
                            </Menu>
                        </Container>
                    </Segment>
                    <UserContext.Provider value={{user, setUser}}>
                        <DirContext.Provider value={{dirs, setDirs: (d) => {}}}>
                            <MainComponent/>
                        </DirContext.Provider>
                    </UserContext.Provider>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
            <Modal open={loginShown} onClose={() => setLoginShown(false)}>
                <Grid textAlign='center' verticalAlign='middle' style={{padding: '1rem'}}>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <img src='/logo.png'/> Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={(e) => {
                                        e.preventDefault()
                                        setUsername(e.target.value)
                                    }}
                                    value={username}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'

                                    onChange={(e) => {
                                        e.preventDefault()
                                        setPassword(e.target.value)
                                    }}
                                    value={password}
                                />

                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Modal.Actions>
                    <Button onClick={() => setLoginShown(false)}>Close</Button>
                    <Button
                        content="Login"
                        labelPosition='right'
                        icon={username.length === 0 || password.length === 0 ? 'x' : 'checkmark'}
                        positive={!(username.length === 0 || password.length === 0)}
                        negative={username.length === 0 || password.length === 0}
                        disabled={username.length === 0 || password.length === 0}
                        onClick={() => {
                            apiClient.login.$post({ body: { username, password }, config: {withCredentials: true} }).then(res => {
                                setUser(res.user)
                                localStorage.setItem('token', res.token)
                                setLoginShown(false)
                            }).catch(err => {
                                alert('Login failed!\n' + err)
                            })
                        }}
                    />
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default dynamic(() => Promise.resolve(MyApp), {ssr: false})
