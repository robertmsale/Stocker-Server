import React, {useEffect, useState} from 'react';
import {useTracker} from 'meteor/react-meteor-data';
import _ from 'lodash';
import {Tasks} from '/imports/api/tasks';
import {LoginForm} from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Button, Navbar, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import HamburgerMenuButton from "./components/hamburger-menu-button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons/faHouse";
import {faWarehouse} from "@fortawesome/free-solid-svg-icons/faWarehouse";
import {faChartLine} from "@fortawesome/free-solid-svg-icons/faChartLine";
import {faRobot} from "@fortawesome/free-solid-svg-icons/faRobot";
import {faGear} from "@fortawesome/free-solid-svg-icons/faGear";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";

import {createBrowserRouter, RouterProvider, Link, useHref} from "react-router-dom";
import RootElement from "/imports/ui/routes/root";

const toggleChecked = ({_id, isChecked}) => {
    Meteor.call('tasks.setChecked', _id, !isChecked);
};

const togglePrivate = ({_id, isPrivate}) => {
    Meteor.call('tasks.setPrivate', _id, !isPrivate);
};

const deleteTask = ({_id}) => Meteor.call('tasks.remove', _id);

export const App = () => {
    const [currentRoute, setCurrentRoute] = useState(window.location.href)

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
        <ListGroup.Item key={v.path} action active={_.startsWith(v.path, currentRoute)}>
            <FontAwesomeIcon style={{width: '24px', marginRight: '8px'}} icon={v.icon}/>{v.description}
        </ListGroup.Item>
    )))

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootElement content={<span>Home</span>}/>,
            errorElement: <span>Route Not Found</span>,
            children: [
                {
                    path: '/inventory',
                    element: <span>Inventory</span>
                },
                {
                    path: '/statistics',
                    element: <span>Statistics</span>
                },
                {
                    path: '/automations',
                    element: <span>Automations</span>
                },
                {
                    path: '/settings',
                    element: <span>Settings</span>
                }
            ]
        },
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};
