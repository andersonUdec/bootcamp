import Link from 'next/link';
import styles from "./page.module.css";

//Modulo de opciones para el inicio de sesión o registro de usuarios
export default function OptionsPage (){
    return ( 
        <div className={styles.container}>
            <h1>Hola.</h1>
            <h1>Si no tienes una cuenta puedes registrarte.</h1>
            <h1>Si ya cuentas con una puedes iniciar sesión.</h1>
            <div className={styles.marginBottom}>
                <Link href="/Signup">
                <button className={styles.buttonOptions}>Registrarse</button>
                </Link>
                <Link href="/Signin">
                <button className={styles.buttonOptions}>Iniciar Sesión</button>
                </Link>
            </div>
        </div>
  );
}