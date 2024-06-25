import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import Link from "next/link";
export default function NavBarComponent() {
    const [formEvent, setFormEvent] = useState(null);
    const router = useRouter();
    const pathname = usePathname();


    const handleShowModal = (event) => {
        event.preventDefault();
        setFormEvent(event);
        document.getElementById('modal_logout').showModal();
    };

    const handleConfirm = () => {
        document.getElementById('modal_logout').close();
        if (formEvent) {
            localStorage.removeItem('loggedUser');
            router.push('/Signin');
        }
    };

    const handleCancel = () => {
        document.getElementById('modal_logout').close();
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="text-xl">Opciones de usuario</a>
            </div>
            <div className="flex-none ml-auto">
                <ul className="menu menu-horizontal px-1">
                    {pathname !== '/' && (
                        <li><Link href="/">Home</Link></li>
                    )}
                    {pathname !== '/Products' && (
                        <li><Link href="/Products">Productos</Link></li>
                    )}
                    <li>
                        <details>
                            <summary>
                                Más acciones
                            </summary>
                            <ul className="p-2 bg-base-100 rounded-t-none">
                                {pathname !== '/ProfileDetail' && (
                                    <li><Link href="/ProfileDetail">Perfil usuario</Link></li>
                                )}
                                <li>
                                    <button onClick={handleShowModal}>
                                        Cerrar sesión
                                    </button>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <dialog id="modal_logout" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Cerrar sesión</h3>
                    <p className="py-4">Confirmar cerrar la sesión</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline mb-4 mr-2" onClick={handleConfirm}>Confirmar</button>
                            <button className="btn btn-error mb-4 ml-2" onClick={handleCancel}>Cancelar</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
