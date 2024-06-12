'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useInputHook } from "lab1/Hooks/use-input-hook";
import styles from "./page.module.css";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';
import { Container, Form } from "react-bootstrap";

export default function SigninPage(){
    let { value: emailValue, bind: emailBind } = useInputHook('');
    let { value: passwordValue, bind: passwordBind } = useInputHook('');

    const [message, setMessage] = useState({ text: '', type: '' });
    
    return(
        <Container>
            <h1>Registro de usuarios:</h1>
            <Form noValidate>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electronico:</Form.Label>
                    <Form.Control  name="email" type="email" placeholder="Ingresa tu email" required {...emailBind}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña/Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" required {...passwordBind}/>
                </Form.Group>
                <br />
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                </div>
            </Form>
            <div className="d-flex justify-content-center">
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            </div>
        </Container>
    );
}