'use client';
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import { useRouter } from 'next/navigation';
import "./page.module.css";
import NavBarComponent from "lab1/Components/Shared/NavBar/page";
import { useInputHook } from "lab1/Hooks/use-input-hook";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ProfileDetailPage() {
    const router = useRouter();
    const [documentsTypeList] = useState([
        { id: 1, name: 'Cédula de Ciudadanía (CC)' },
        { id: 2, name: 'Tarjeta de Identidad (TI)' },
        { id: 3, name: 'Registro Civil (RC)' },
        { id: 4, name: 'Cédula de Extranjería (CE)' },
        { id: 5, name: 'Carné de Identidad (CI)' },
        { id: 6, name: 'Documento Nacional de Identidad (DNI)' }
    ]);
    let { value: passwordOldValue, bind: passwordOldBind } = useInputHook('');
    let { value: passwordNewValue, bind: passwordNewBind } = useInputHook('');
    let { value: passwordVerificationNewValue, bind: passwordVerificationNewBind } = useInputHook('');

    const [userLogged, setUserLogged] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formEvent, setFormEvent] = useState(null);

    useEffect(() => {
        const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
        if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
            setUserLogged(loggedUserFromStorage);
        } else {
            setTimeout(() => {
                router.push('/Options');
            }, 1000);
        }
    }, []);

    const handleShowModal = (event) => {
        event.preventDefault();
        setFormEvent(event);
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        if (formEvent) {
            changePasswordUser(formEvent);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setMessage({ text: 'Cambio de contraseña cancelado.', type: 'warning' });
    };

    const changePasswordUser = (event) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setMessage({ text: 'Por favor, diligencia todos los campos', type: 'danger' });
            return;
        }
        if (encodeBase64(passwordOldValue) !== userLogged.password) {
            setMessage({ text: 'La contraseña actual no corresponde con la contraseña anterior.', type: 'danger' });
            return;
        }
        if (passwordNewValue === passwordVerificationNewValue) {
            if (passwordOldValue === passwordNewValue) {
                setMessage({ text: 'La contraseña nueva no puede ser identica a la actual.', type: 'danger' });
                return;
            }
        } else {
            setMessage({ text: 'La confirmación de la contraseña y la nueva contraseña no son iguales.', type: 'danger' });
            return;
        }
        setUserLogged((userLogged) => ({
            ...userLogged,
            password: encodeBase64(passwordNewValue),
        }));
        setMessage({ text: 'Contraseña actualizada con éxito', type: 'success' });
        localStorage.removeItem('loggedUser');
        setTimeout(() => {
            router.push('/Signin');
        }, 1000);
    };

    const encodeBase64 = word => {
        let encodedStringBtoA = undefined;
        if (word !== null && word !== undefined && word.length > 0) {
            encodedStringBtoA = btoa(word);
        }
        return encodedStringBtoA;
    };

    return (
        <Container >
            <Form.Group className="mb-3" >
                <NavBarComponent />
            </Form.Group>
            <Container className="d-flex justify-content-center">
                <Form className="p-3 bg-light rounded ">
                    <h2>Información del usuario</h2>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Email:</Form.Label> <Form.Label>{userLogged.email}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Nombres(s):</Form.Label> <Form.Label>{userLogged.firstName}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Apellido(s):</Form.Label> <Form.Label>{userLogged.lastName}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Tipo de identificación:</Form.Label> <Form.Label>{documentsTypeList.find(documentType => documentType.id == userLogged.documentType)?.name || 'No disponible'}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Número o Id de identifiación:</Form.Label> <Form.Label>{userLogged.documentId}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Télefono:</Form.Label> <Form.Label>{userLogged.phone}</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Dirección:</Form.Label> <Form.Label>{userLogged.address}</Form.Label>
                    </Form.Group>
                </Form>

                <Form className="p-3 bg-light rounded" onSubmit={handleShowModal} noValidate>
                    <h2> Cambio de contraseña</h2>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Contraseña/Password anterior:</Form.Label>
                        <Form.Control type="password" placeholder="Password" required {...passwordOldBind} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Contraseña/Password nueva:</Form.Label>
                        <Form.Control type="password" placeholder="Password" required {...passwordNewBind} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Verificación Contraseña/Password nueva:</Form.Label>
                        <Form.Control type="password" placeholder="Password" required {...passwordVerificationNewBind} />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">
                            Cambiar contraseña
                        </Button>
                    </div>
                </Form>
            </Container>
            <Modal show={showModal} onHide={handleCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de cambio de contraseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea cambiar la contraseña?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-center mt-3">
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            </div>
        </Container>
    );
}