import Link from 'next/link';
import styles from "./page.module.css";
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

//Modulo de opciones para el inicio de sesión o registro de usuarios
export default function OptionsPage() {
    return (
        <Container className="d-flex flex-column align-items-center">
            <Form className="text-center">
                <h1>Hola.</h1>
                <h1>Si no tienes una cuenta puedes registrarte.</h1>
                <h1>Si ya cuentas con una puedes iniciar sesión.</h1>
                <br />
                <Link href="/Signup">
                    <Button>Registrarse</Button>
                </Link>
                <br />
                <br />
                <Link href="/Signin">
                    <Button>Iniciar Sesión</Button>
                </Link>
            </Form>
        </Container>
    );
}