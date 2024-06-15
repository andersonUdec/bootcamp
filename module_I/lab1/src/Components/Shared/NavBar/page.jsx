import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter, usePathname } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function NavBarComponent() {

    const [showModal, setShowModal] = useState(false);
    const [formEvent, setFormEvent] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const handleShowModal = (event) => {
        event.preventDefault();
        setFormEvent(event);
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        if (formEvent) {
            localStorage.removeItem('loggedUser');
            router.push('/Signin');
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>Opciones de usuario</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {pathname !== '/' && (
                            <Nav.Link href="/">Home</Nav.Link>
                        )}
                        {pathname !== '/Products' && (
                            <Nav.Link href="/Products">Productos</Nav.Link>
                        )}
                        <NavDropdown title="Mas acciones" id="basic-nav-dropdown">
                            {pathname !== '/ProfileDetail' && (
                            <NavDropdown.Item href="/ProfileDetail">Perfil usuario</NavDropdown.Item>
                            )}
                            <NavDropdown.Item onClick={handleShowModal}>
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Modal show={showModal} onHide={handleCancel} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Cerrar sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirmar cerrar la sesión
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
            </Container>
        </Navbar>
    );
}
