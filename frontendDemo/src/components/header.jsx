import { Button, Nav, Navbar, Container, Offcanvas, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../config/routes";
import { observer } from "mobx-react";
import { userStore } from "../stores/UserStore";
import "../assets/css/header.css";
import {motion} from 'framer-motion';

const Header = observer(() => {
    const expand = "md";
    const navigate = useNavigate();
    const logout = ()=>{
        userStore.logout();
            navigate('/login');
    }
    return (
        <Navbar key={expand} expand={expand} fixed="top" bg="light" data-bs-theme="light" className="p-2 mb-2">
            <Container fluid="md">
                <Navbar.Brand>
                    <img className="logo__img" src="/src/assets/img/logo.png" alt="" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    OnlineShop
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        { console.log(authRoutes) }
                        { console.log(userStore.accessToken.length) }
                        {
                            userStore.accessToken.length != 0 &&
                            authRoutes.map((el, i) => <Nav.Link key={i} as={Link} to={el.path}>{el.name}</Nav.Link>)
                        }
                        {
                            userStore.accessToken.length != 0 && 
                            <Button variant="danger" onClick={logout}>Выйти</Button>
                        }
                        { userStore.accessToken.length == 0 && publicRoutes.map((el, i) => <Nav.Link key={i} as={Link} to={el.path}>{el.name}</Nav.Link>) }
                    </Nav>
                    <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Поиск товара"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Найти</Button>
                    </Form>
                </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
})
export default Header;