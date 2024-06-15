'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from "react-bootstrap";
import NavBarComponent from "lab1/Components/Shared/NavBar/page";
export default function Home() {

  let [registeredUsers, setRegisteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
    if (loggedUserFromStorage.length > 0 || loggedUserFromStorage.email) {
      const usersFromStorage = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      setRegisteredUsers(usersFromStorage);
    } else {
      setTimeout(() => {
        router.push('/Options');
      }, 1000);
    }
  }, []);

  return (
    <Container>
    <NavBarComponent/>
      <h1 className="d-flex justify-content-center">Usuarios registrados activos</h1>
      {registeredUsers.length > 0 ? (
        <ListGroup>
          {registeredUsers.map((user, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-center">
              {user.email}, {user.firstName} {user.lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="d-flex justify-content-center text" >No existen usuarios registrados</p>
      )}
    </Container>
  );
}
