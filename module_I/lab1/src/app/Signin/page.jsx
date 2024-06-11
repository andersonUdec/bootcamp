'use client';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useInputHook } from "lab1/Hooks/use-input-hook";
import styles from "./page.module.css";
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';

export default function SigninPage(){
    let { value: emailValue, bind: emailBind } = useInputHook('');
    let { value: passwordValue, bind: passwordBind } = useInputHook('');

    const [message, setMessage] = useState({ text: '', type: '' });
    return(
        <div className={styles.container}>
            <h1>Registro de usuarios:</h1>
            <form  noValidate>
                <label className={styles.label}>Email:</label>
                <input id="email" name="email" type="email" className={styles.input} required
                    {...emailBind}
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
        </div>
    );
}