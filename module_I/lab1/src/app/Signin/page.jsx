'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useInputHook } from "lab1/Hooks/use-input-hook";
import styles from "./page.module.css";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container, Form } from "react-bootstrap";


export default function SigninPage() {
    let { value: emailValue, bind: emailBind } = useInputHook('');
    let { value: passwordValue, bind: passwordBind } = useInputHook('');

    const [message, setMessage] = useState({ text: '', type: '' });

    const router = useRouter();

    useEffect(() => {
        const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
        if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }, []);

    const encodeBase64 = word => {
        let encodedStringBtoA = undefined;
        if (word !== null && word !== undefined && word.length > 0) {
            encodedStringBtoA = btoa(word);
        }
        return encodedStringBtoA;
    };

    const getDataFormMyForm = (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setMessage({ text: 'Por favor, diligencia todos los campos', type: 'danger' });
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(user => user.email === emailValue && user.password === encodeBase64(passwordValue));
        if (user) {
            localStorage.setItem('loggedUser', JSON.stringify(user));
            setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            localStorage.removeItem('loggedUser');
            setMessage({ text: 'Correo electrónico o contraseña incorrectos', type: 'danger' });
        }
    };

    return (
        <Container className="p-5">
            <h1 className="d-flex justify-content-center">Inicio de sesión de usuarios:</h1>
            <Form onSubmit={getDataFormMyForm} noValidate>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electronico:</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Ingresa tu email" required {...emailBind} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña/Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" required {...passwordBind} />
                </Form.Group>
                <br />
                <div className="d-flex justify-content-center">
                    <Button variant="primary" type="submit">
                        Iniciar sesión
                    </Button>
                </div>
            </Form>
            <div className="d-flex justify-content-center">o</div>
            <div className="d-flex justify-content-center">
                <Link href="/Signup">
                    <Button>Registrarse</Button>
                </Link>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            </div>
        </Container>
    );
}