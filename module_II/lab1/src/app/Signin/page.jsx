'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useInputHook } from "lab1/Hooks/use-input-hook";

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
            setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
            return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const user = registeredUsers.find(user => user.email === emailValue && user.password === encodeBase64(passwordValue) && user.isDelete !== true);
        if (user) {
            localStorage.setItem('loggedUser', JSON.stringify(user));
            setMessage({ text: 'Inicio de sesión exitoso', type: 'alert alert-success' });
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            localStorage.removeItem('loggedUser');
            setMessage({ text: 'Correo electrónico o contraseña incorrectos', type: 'alert alert-warning' });
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 d-flex flex-column align-items-center text-center">
            <div className="card w-[40%] bg-base-100 shadow-xl">
                <h1 className="d-flex justify-content-center text-2xl mt-4">Inicio de sesión de usuarios:</h1>
                <form onSubmit={getDataFormMyForm} noValidate>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Correo electronico:</span>
                        </label>
                        <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
                    </div>
                    <div className="form-control m-8">
                        <label className="label">
                            <span className="label-text">Contraseña/Password:</span>
                        </label>
                        <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required className="input input-bordered w-full"  {...passwordBind}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline mb-4">
                            Iniciar sesión
                        </button>
                    </div>
                    {message.text && (
                        <div className="w-[50%] mx-auto my-2">
                            <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
                        </div>)}
                </form>
                o
                <div className=" mt-4 mb-4 ">
                    <Link href="/Signup">
                        <button className="btn btn-outline">
                            Registrarse
                        </button>
                    </Link>
                </div>
            </div>

        </div>


    );
}