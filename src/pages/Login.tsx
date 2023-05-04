import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import '../CSS/Login.css'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
function Login(){
    return(
        <div>
            <Container>
                <Row style={{marginTop:'150px'}}>
                    <Col id={'col'} >
                        <div id={'div-col'} >
                            <h1 id={'login'} >Log In</h1>
                            <Form id={'forma'}>
                                <Form.Group style={{textAlign:'center'}} className="mb-3 mt-5" controlId="formBasicUsername">
                                    <input placeholder="Username"/> <br/>
                                </Form.Group>

                                <Form.Group style={{textAlign:'center'}} className="mb-3 mt-5" controlId="formBasicPassword">
                                    <input placeholder="Password"/> <br/>
                                    <Form.Text id={'small-text'} className="text-muted" >
                                        Forgot password?
                                    </Form.Text>
                                </Form.Group>
                                <Button id={'kopce'} variant={"light"} style={{textAlign: 'center'}}>Login</Button>
                                <p id={'p-tag'} style={{color:'white'}}>Don't have an account? <Link to={'/signup'} style={{color: '#04ae27'}}>Sign Up</Link>
                                </p>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <Row style={{marginTop: '50px', textAlign: 'start'}}>
                    <Col>
                        <Link className={'nav-link'} style={{fontSize: '30px'}} to={'/'}>&#8592;Go to HomePage</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Login;