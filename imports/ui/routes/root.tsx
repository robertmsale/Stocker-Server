import React, {useEffect, useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import _ from 'lodash';
import {Tasks} from '/imports/api/tasks';
import {LoginForm} from '../LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Navbar, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import HamburgerMenuButton from "../components/hamburger-menu-button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faWarehouse} from "@fortawesome/free-solid-svg-icons/faWarehouse";
import {faChartLine} from "@fortawesome/free-solid-svg-icons/faChartLine";
import {faRobot} from "@fortawesome/free-solid-svg-icons/faRobot";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

import {createBrowserRouter, RouterProvider, Link, Outlet, useHref, useLocation, useNavigate} from "react-router-dom";

export default function RootElement({content}: {content: JSX.Element}) {
    const [currentRoute, setCurrentRoute] = useState(window.location.href)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const href = useLocation()
    const navigate = useNavigate()

    const {incompleteTasksCount, user} = useTracker(() => {
        Meteor.subscribe('tasks');

        return ({
            incompleteTasksCount: Tasks.find({checked: {$ne: true}}).count(),
            user: Meteor.user(),
        });
    });

    if (!user) {
        return (
            <Container>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={"/images/box-outline-filled.png"}/>
                </div>
                <LoginForm/>
            </Container>
        );
    }

    const SideBarItems = [
        {
            icon: faHouse,
            path: '/',
            description: 'Home'
        },
        {
            icon: faWarehouse,
            path: '/inventory',
            description: 'Inventory'
        },
        {
            icon: faChartLine,
            path: '/statistics',
            description: 'Statistics'
        },
        {
            icon: faRobot,
            path: '/automations',
            description: 'Automations'
        },
        {
            icon: faGear,
            path: '/settings',
            description: 'Settings'
        },
    ].map((v => (
        <ListGroup.Item key={v.path}
                        action
                        active={(v.path !== '/' || (v.path === '/' && href.pathname === '/')) && _.startsWith(href.pathname, v.path)}
                        onClick={() => {
                            // ['nav-icon1','nav-icon2','nav-icon3','nav-icon4','sidebar'].forEach((v) => {
                            //     const btn = document.getElementById(v)
                            //     btn.className = ''
                            // })
                            setSidebarOpen(false)
                            navigate(v.path)
                        }}
        >
            <FontAwesomeIcon style={{width: '24px', marginRight: '8px'}} icon={v.icon}/>{v.description}
        </ListGroup.Item>
    )))

    return (
        <>
            <Navbar bg={'light'}>
                <div onClick={() => {setSidebarOpen(!sidebarOpen)}}>
                    <HamburgerMenuButton buttonType={1} open={sidebarOpen} />
                </div>
                <span>Stocker Pro</span>
                <OverlayTrigger trigger={'click'} placement={'bottom-start'} overlay={(
                    <Popover id={'popover-basic'}>
                        <Popover.Header as={'h3'}>{user.username}</Popover.Header>
                        <Popover.Body className={'d-grid gap-2'}>
                            <Button className={'d-block'}  variant={'primary'}>User Preferences</Button>
                            <Button className={'d-block'}  variant={'danger'}>Sign Out</Button>
                        </Popover.Body>
                    </Popover>
                )}>
                    <FontAwesomeIcon icon={faUser} className={'ms-auto me-4'} />
                </OverlayTrigger>
            </Navbar>
            <div id={'sidebar'} className={sidebarOpen ? 'open' : ''}>
                <Container>
                    <ListGroup>
                        {SideBarItems}
                    </ListGroup>
                </Container>
            </div>
            <Container>
                <Outlet />
            </Container>
        </>
    );
}