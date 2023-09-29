import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Row, Col } from 'react-bootstrap';

const Cards = () => {

    const [myData, setData] = useState([]);

    const apiget = () => {
        fetch('https://inshortsapi.vercel.app/news?category=sports')
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setData(json.data)
        });
    }

    useEffect(() => {
        apiget();
        const interval = setInterval(()=>{apiget();}, 50000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container fluid>
            <h3 className="text-center my-3">Project - Fetching the News from the API and Display it in the card format.</h3>
            <Row className='mt-4 g-4' xs={1} md={3}>
                    {
                        myData.map(
                            (value) => {
                                return (
                                    <>
                                    <Col>
                                        <Card>
                                            <Card.Img variant="top" src={value.imageUrl} style={{height: 350}} />
                                            <Card.Body>
                                                <Card.Title>{value.title}</Card.Title>
                                                <Card.Text>
                                                    {value.content}
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <small className="text-muted">{value.date} {value.time}</small>
                                            </Card.Footer>
                                        </Card>
                                        </Col>
                                    </>
                                )
                            }
                        )
                    }
                
            </Row>

        </Container>
    )
}

export default Cards