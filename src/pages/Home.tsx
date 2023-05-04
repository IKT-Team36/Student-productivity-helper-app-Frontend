import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link, NavLink} from "react-router-dom";
import '../CSS/Home.css'

function Home() {
    return (
        <div>
            <Navbar expand="lg">
                <Navbar.Brand href="#home" className={'ms-5'}>COURSES 2.0</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        <Nav.Link href="#link">About</Nav.Link>
                        <Nav.Link href="#link">Courses</Nav.Link>
                        <form className="d-flex" role="search"
                              style={{right: '0', position: 'absolute', marginRight: '30px'}}>
                            <Link className="btn btn-dark  me-3" to={'/login'}>Log In</Link>
                            <Link className="btn btn-secondary me-3" to={'/signup'}>Sign Up</Link>
                            <div>
                                <a href={'/'}>
                                    <div className="fi fi-mk mb-1"
                                         style={{scale: '125%', borderRadius: '50px', display: 'block'}}></div>
                                </a>
                                <a href={'/'}>
                                    <div className="fi fi-gb" style={{scale: '125%', borderRadius: '50px'}}></div>
                                </a>
                            </div>
                        </form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
                <div style={{flex: ' 1 0 auto', textAlign: 'end', fontWeight: 'bold', fontSize: '36px'}}>
                    Are you ready to learn?<br/>
                    Learn with <span style={{color: '#28b968'}}>fun</span><br/>on any schedule. <br/>
                    <button type="submit" className={'btn btn-dark'}>Get Started</button>
                </div>
                <div style={{flex: ' 1 1 auto'}}></div>
                <div style={{flex: ' 1 0 auto', textAlign: 'center'}}>
                    <img style={{width: '600px'}}
                         src="https://img.freepik.com/free-vector/woman-working-loft-office-coworking-place-sitting-desk-with-computer-cup-coffee-girl-develop-art-project-workplace-with-wide-floor-ceiling-window-cartoon-vector-illustration_107791-8920.jpg?w=1800&t=st=1683172242~exp=1683172842~hmac=7afbc3ddc2a1a3781748da37eb242198e28a8ec9eb4e05e446a29f37c5dd5bfa"
                         alt=""/></div>
            </div>
        </div>
    )
}

export default Home
