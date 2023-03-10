import Head from 'next/head'
import {useCallback, useContext, useEffect, useState} from 'react'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import type {Events, Task} from '$prisma/client'
import type { FormEvent, ChangeEvent } from 'react'
import Layout from '~/components/Layout'
import type { NextPage } from 'next'
import {Container, Feed, Header, Icon, Segment} from "semantic-ui-react";
import {UserContext} from "~/pages/_app";
import {apiConfig, apiWithHeaders} from "~/utils/apiConfig";



const Home: NextPage = () => {
    const [events, setEvents] = useState([] as Events[])
    const {user} = useContext(UserContext)
    useEffect(() => {
        apiClient.protected.events.$get(apiWithHeaders({})).then(res => {
            setEvents(res)
        })
    }, [])

    let eventElements = events.map(v => (
        <Feed.Event key={v.id}>
            <Feed.Content>
                <Feed.Summary>
                    {v.description}
                </Feed.Summary>
                <Feed.Meta>
                    <Feed.Date>{v.time.toLocaleString()}</Feed.Date>
                </Feed.Meta>
            </Feed.Content>
        </Feed.Event>
    ))

    return (<>
        <Container text>
            <Header>Welcome back, {user?.username ?? '{username}'}!</Header>
            <Segment textAlign={"center"}>
                <Header size={'small'}>Events</Header>
                <Feed >
                    {eventElements}
                </Feed>
            </Segment>
        </Container>
    </>)
}

export default Home
