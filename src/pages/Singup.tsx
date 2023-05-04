import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import '../CSS/Signup.css'
import {Col, Row} from "react-bootstrap";

function Signup() {
    return (
        <div>

            <Container>

                <Row style={{marginTop: '120px'}}>
                    <Col>
                        <h1><b>Sign up</b></h1>
                        <Form style={{width: '500px'}}>
                            <p>Already have an account? <Link to={'/login'} style={{color: '#04ae27'}}>Login here</Link>
                            </p>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full name</Form.Label>
                                <input placeholder="Enter your name"/> <br/>

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <input placeholder="Enter your username"/> <br/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <input placeholder="Enter your email"/> <br/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <input placeholder="Enter your password"/> <br/>
                                <Form.Text className="text-muted" style={{marginLeft: '200px'}}>
                                    Strength checker:
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <input placeholder="Confirm your Password "/> <br/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="By signing up you agree to receive Offers."/>
                            </Form.Group>
                            <div style={{display: 'flex', justifyContent: 'end'}}>
                                <Button variant="success" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                    <Col style={{textAlign: 'end'}}>
                        <img
                            style={{borderRadius: '10px'}}
                            src="https://img.freepik.com/free-vector/cute-shiba-inu-dog-with-laptop-coffee-cartoon-vector-icon-illustration-animal-technology-icon_138676-7441.jpg?w=826&t=st=1683188301~exp=1683188901~hmac=8166b16c3cc4cad3e2be9b02604d95dec78c18c9b771e9f92c136ca4335912c9"
                            alt=""
                            width={'400px'}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop: '50px', textAlign: 'start'}}>
                    <Col>
                        <Link className={'nav-link'} style={{fontSize: '30px'}} to={'/'}>&#8592;Go to HomePage</Link>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default Signup;