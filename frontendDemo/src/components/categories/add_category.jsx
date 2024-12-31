import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react";
import axios from "axios";

const AddCategory = ()=>{
    const [title,setTitle] = useState('');
    const submitForm = async (ev)=>{
        ev.preventDefault();
        await categoryStore.addCategory(data).then(()=>{
            navigate('/categories');
        });
    }

    return(
        <Container>
            <h1>Добавление категории</h1>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" value={title} onChange={(ev)=>setTitle(ev.target.value)}/>
                </Form.Group>
                <Row>
                    <Col md={6}>
                        <Button variant="success" type="submit">Добавить</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default AddCategory;