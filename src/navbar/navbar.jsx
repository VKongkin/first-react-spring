/* eslint-disable no-unused-vars */
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const createStudent = () => {
        navigate('/students');
    }

    const home = () => {
        navigate('/');
    }

    return(
        <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                <Navbar.Brand onClick={home}>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to={"/"}>Home</Nav.Link>
                    <Nav.Link as={NavLink} to={"/students"} >Create</Nav.Link>
                    <Nav.Link as={NavLink} to={"/img"} >Image</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
    )
}
export default NavBar;