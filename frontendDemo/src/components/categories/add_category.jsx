import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react";
import axios from "axios";
import { categoryStore } from '../../stores/CategoryStore';
import { observer } from 'mobx-react';

const AddCategory = observer(() => {
    const [data,setData] = useState({
        title:''
    });
    const handleChange = (ev)=>{
        const {name,value} = ev.target;
        setData(prevState=>({
            ...prevState,
            [name]:value
        }));
    }
    const submitForm = async (ev)=>{
        ev.preventDefault();
        await categoryStore.addCategory(data).then(()=>{
            navigate('/categories');
        });
    }

    return(
        <Container fluid="md">
            <h1>Добавление категории</h1>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="title" value={data.title} onChange={handleChange}/>
                </Form.Group>
   
                <Button variant="success" type="submit">Добавить</Button>
            </Form>
        </Container>
    )
})
export default AddCategory;