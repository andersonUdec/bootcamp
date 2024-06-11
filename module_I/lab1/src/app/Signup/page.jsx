'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useInputHook } from "lab1/Hooks/use-input-hook";
import styles from "./page.module.css";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [documentsTypeList] = useState([
        { id: 1, name: 'Cédula de Ciudadanía (CC)' },
        { id: 2, name: 'Tarjeta de Identidad (TI)' },
        { id: 3, name: 'Registro Civil (RC)' },
        { id: 4, name: 'Cédula de Extranjería (CE)' },
        { id: 5, name: 'Carné de Identidad (CI)' },
        { id: 6, name: 'Documento Nacional de Identidad (DNI)' }
    ]);

    let { value: emailValue, bind: emailBind } = useInputHook('');
    let { value: firstNameValue, bind: firstNameBind } = useInputHook('');
    let { value: lastNameValue, bind: lastNameBind } = useInputHook('');
    let { value: documentTypeValue, bind: documentTypeBind } = useInputHook('');
    let { value: documentIdValue, bind: documentIdBind } = useInputHook('');
    let { value: phoneValue, bind: phoneBind } = useInputHook('');
    let { value: addressValue, bind: addressBind } = useInputHook('');
    let { value: passwordValue, bind: passwordBind } = useInputHook('');

    const [message, setMessage] = useState({ text: '', type: '' });

    let [user, setUser] = useState({});

    let [registeredUsers, setRegisteredUsers] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [formEvent, setFormEvent] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const usersFromStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        setRegisteredUsers(usersFromStorage);
    }, []);

    const handleShowModal = (event) => {
        event.preventDefault();
        setFormEvent(event);
        setShowModal(true);
    };

    const handleConfirm = () => {
        setShowModal(false);
        getDataFormMyForm(formEvent);
    };

    const handleCancel = () => {
        setShowModal(false);
        setMessage({ text: 'Registro cancelado.', type: 'warning' });
    };

    const getDataFormMyForm = (event) => {
        const form = event.target;

        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setMessage({ text: 'Por favor, diligencia todos los campos', type: 'danger' });
            return;
        }

        if (emailValue && firstNameValue && lastNameValue && documentTypeValue && documentIdValue && phoneValue && addressValue && passwordValue) {
            const duplicateEmail = registeredUsers.some(user => user.email === emailValue);
            const duplicateDocumentId = registeredUsers.some(user => user.documentId === documentIdValue);
            const duplicatePhone = registeredUsers.some(user => user.phone === phoneValue);

            if (duplicateEmail ) {
                setMessage({ text: 'El email ya se encuentra registrado.', type: 'danger' });
                return;
            }
            if(duplicateDocumentId){
                setMessage({ text: 'Número o ID de identificación ya se encuentra registrado.', type: 'danger' });
                return;
            }
            if(duplicatePhone){
                setMessage({ text: 'El teléfono ya se encuentra registrado.', type: 'danger' });
                return;
            }

            const newUser = {
                email: emailValue,
                firstName: wordToCapitalize(firstNameValue),
                lastName: wordToCapitalize(lastNameValue),
                documentType: documentTypeValue,
                documentId: documentIdValue,
                phone: phoneValue,
                address: addressValue,
                password: encodeBase64(passwordValue)
            };

            setUser(newUser);
            const updatedUsers = [...registeredUsers, newUser];
            setRegisteredUsers(updatedUsers);

            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

            setMessage({ text: 'Usuario registrado con éxito', type: 'success' });

            setTimeout(() => {
                router.push('/Signin');
            }, 1000);
        }
    };

    const wordToCapitalize = words => {
        if (words !== null && words !== undefined && words.length > 0) {
            return words.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        }
        return words;
    };

    const encodeBase64 = word => {
        let encodedStringBtoA = undefined;
        if (word !== null && word !== undefined && word.length > 0) {
            encodedStringBtoA = btoa(word);
        }
        return encodedStringBtoA;
    };

    return (
        <div className={styles.container}>
            <h1>Registro de usuarios:</h1>
            <form onSubmit={handleShowModal} noValidate>
                <label className={styles.label}>Email:</label>
                <input id="email" name="email" type="email" className={styles.input} required
                    {...emailBind}
                />
                <br />
                <label className={styles.label}>Nombre(s):</label>
                <input id="firstName" name="firstName" type="text" className={styles.input} required
                    {...firstNameBind}
                />
                <br />
                <label className={styles.label}>Apellido(s):</label>
                <input id="lastName" name="lastName" type="text" className={styles.input} required
                    {...lastNameBind}
                />
                <br />
                <label className={styles.label}>Tipo de identificación:</label>
                <select id="documentType" name="documentType" value={documentTypeValue} {...documentTypeBind} className={styles.input} required>
                    <option value="">Seleccione un tipo de identificación</option>
                    {documentsTypeList.map((doc) => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                </select>
                <br />
                <label className={styles.label}>Número o ID de identificación:</label>
                <input id="documentId" name="documentId" type="text" className={styles.input} required
                    {...documentIdBind}
                />
                <br />
                <label className={styles.label}>Teléfono:</label>
                <input id="phone" name="phone" type="text" className={styles.input} required
                    {...phoneBind}
                />
                <br />
                <label className={styles.label}>Dirección:</label>
                <input id="address" name="address" type="text" className={styles.input} required
                    {...addressBind}
                />
                <br />
                <label className={styles.label}>Contraseña/Password:</label>
                <input id="password" name="password" type="password" className={styles.input} required
                    {...passwordBind}
                />
                <button className={styles.button} type="submit">Registrarme</button>
            </form>
            <br />
            {message.text && <Alert variant={message.type}>{message.text}</Alert>}
            <br />
            <Link href="/">
                <button className={styles.button}>Volver al inicio</button>
            </Link>

            <Modal show={showModal} onHide={handleCancel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmación de Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Está seguro de que desea registrarse con la información proporcionada?
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
        </div>
    );
}
