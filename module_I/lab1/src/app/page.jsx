'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import styles from "./page.module.css";

import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from "react-bootstrap";
export default function Home() {

  let [registeredUsers, setRegisteredUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const loggedUserFromStorage = JSON.parse(localStorage.getItem('loggedUser')) || [];
    if (loggedUserFromStorage) {
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
      <h1 className="d-flex justify-content-center"> Usuarios registrados activos </h1>
      <ListGroup >
        {registeredUsers.map((user, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-center">
            {user.email}, {user.firstName} {user.lastName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>

  );
}
