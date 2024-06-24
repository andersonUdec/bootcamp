'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import NavBarComponent from "lab1/Components/Shared/NavBar/page";
export default function Home() {

  let [registeredUsers, setRegisteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
    if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
      const usersFromStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      setRegisteredUsers(usersFromStorage.filter(users => !users.isDelete));
    } else {
      setTimeout(() => {
        router.push('/Options');
      }, 1000);
    }
  }, []);

  return (
    <>
      <NavBarComponent />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="card w-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Correo</th>
                      <th>Nombre(s)</th>
                      <th>Apellido(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.length > 0 ? (
                      registeredUsers.map((user) => (
                        <tr key={user.email}>
                          <td>{user.email}</td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No existen usuarios registrados</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

