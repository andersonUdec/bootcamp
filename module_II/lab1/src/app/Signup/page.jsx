'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInputHook } from "lab1/Hooks/use-input-hook";

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

    const [formEvent, setFormEvent] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
        if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
        const usersFromStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        setRegisteredUsers(usersFromStorage);
    }, []);

    const handleShowModal = (event) => {
        event.preventDefault();
        setFormEvent(event);
        document.getElementById('modal_register').showModal();
    };

    const handleConfirm = () => {
        document.getElementById('modal_register').close();
        if (formEvent) {
            getDataFormMyForm(formEvent);
        }
    };

    const handleCancel = () => {
        document.getElementById('modal_register').close();
        setMessage({ text: 'Registro cancelado.', type: 'alert alert-warning' });
    };

    const getDataFormMyForm = (event) => {
        const form = event.target;

        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
            return;
        }
        if (emailValue && firstNameValue && lastNameValue && documentTypeValue && documentIdValue && phoneValue && addressValue && passwordValue) {
            const duplicateEmail = registeredUsers.some(user => user.email === emailValue && user.isDelete !== true);
            const duplicateDocumentId = registeredUsers.some(user => user.documentId === documentIdValue && user.isDelete !== true);
            const duplicatePhone = registeredUsers.some(user => user.phone === phoneValue && user.isDelete !== true);

            if (duplicateEmail) {
                setMessage({ text: 'El email ya se encuentra registrado.', type: 'alert alert-error' });
                return;
            }
            if (duplicateDocumentId) {
                setMessage({ text: 'Número o ID de identificación ya se encuentra registrado.', type: 'alert alert-error' });
                return;
            }
            if (duplicatePhone) {
                setMessage({ text: 'El teléfono ya se encuentra registrado.', type: 'alert alert-error' });
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

            setMessage({ text: 'Usuario registrado con éxito', type: 'alert alert-success' });

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
        <div className="hero min-h-screen bg-base-200 d-flex flex-column align-items-center text-center">
            <div className="card  w-[40%] bg-base-100 shadow-xl my-4">
                <h1 className="d-flex justify-content-center text-2xl mt-4">Registro de usuarios:</h1>
                <form onSubmit={handleShowModal} noValidate>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Correo electronico:</span>
                        </label>
                        <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Nombre(s):</span>
                        </label>
                        <input type="text" id="firstName" name="firstName" placeholder="Ingresa tus nombres" required className="input input-bordered w-full" {...firstNameBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Apellido(s):</span>
                        </label>
                        <input name="lastName" type="text" placeholder="Ingresa tus apellidos" required className="input input-bordered w-full" {...lastNameBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Tipo de identificación:</span>
                        </label>
                        <select id="documentType" name="documentType" className="select select-bordered w-full" required value={documentTypeValue} {...documentTypeBind}>
                            <option disabled value="">Seleccione un tipo de identificación</option>
                            {documentsTypeList.map((doc) => (
                                <option key={doc.id} value={doc.id}>{doc.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span>Número o ID de identificación:</span>
                        </label>
                        <input name="documentId" type="number" placeholder="Ingresa tu numero de documento" className="input input-bordered w-full" required {...documentIdBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Teléfono:</span>
                        </label>
                        <input name="phone" type="number" placeholder="Ingresa tu numero telefonico" className="input input-bordered w-full" required {...phoneBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Dirección:</span>
                        </label>
                        <input name="address" type="text" placeholder="Ingresa tu dirección de residencia" className="input input-bordered w-full" required {...addressBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Contraseña/Password:</span>
                        </label>
                        <input type="password" placeholder="Ingresa tu contraseña" className="input input-bordered w-full" required {...passwordBind} />
                    </div>
                    <button className="btn btn-outline mb-4" type="submit">
                        Registrarme
                    </button>
                    {message.text && (
                        <div className="w-[60%] mx-auto my-2">
                            <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
                        </div>)}
                    <div className=" mt-4 mb-4 ">
                        <Link href="/">
                            <button className="btn btn-outline">
                                Volver al inicio
                            </button>
                        </Link>
                    </div>

                </form>
            </div>
            <dialog id="modal_register" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirmación de Registro</h3>
                    <p className="py-4">¿Está seguro de que desea registrarse con la información proporcionada?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline mb-4 mr-2" onClick={handleConfirm}>Confirmar</button>
                            <button className="btn btn-outline mb-4 ml-2" onClick={handleCancel}>Cancelar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
