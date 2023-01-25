import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Meteor} from 'meteor/meteor';

export const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password);
    };

    return (
        <Form onSubmit={submit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.currentTarget.value)}/>
                {/*<Form.Text className="text-muted">*/}
                {/*    We'll never share your email with anyone else.*/}
                {/*</Form.Text>*/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.currentTarget.value)}/>
            </Form.Group>
            {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
            {/*    <Form.Check type="checkbox" label="Remember me"/>*/}
            {/*</Form.Group>*/}
            <Button variant="primary" type="submit">
                Log In
            </Button>

        </Form>
    );
};
