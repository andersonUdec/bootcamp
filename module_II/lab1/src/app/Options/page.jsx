import Link from 'next/link';

export default function OptionsPage() {
    return (
        <div className="hero min-h-screen bg-base-200 d-flex flex-column align-items-center">
            <div className="card w-[40%] bg-base-100 shadow-xl text-center text-4xl">
                <h1 className='my-4'>Hola!</h1>
                <h1>Si no tienes una cuenta, puedes registrarte.</h1>
                <h1>O si ya cuentas con una puedes iniciar sesión.</h1>
                <div className='my-4'>
                    <Link href="/Signup" className='mx-2'>
                        <button className="btn btn-outline">Registrarse</button>
                    </Link>
                    <Link href="/Signin" className='mx-2'>
                        <button className="btn btn-outline">Iniciar Sesión</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}