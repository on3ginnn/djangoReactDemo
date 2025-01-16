import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from "react";
import axios from "axios";
import { productStore } from '../../stores/ProductStore';
import { observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";

const AddProduct = observer(() => {
    const navigate = useNavigate();
    const [data, setData] = useState({
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
        await productStore.createProduct(data).then(()=>{
            navigate('/products');
        });
    }

    return(
        <Container fluid="md">
            <h1>Добавление товара</h1>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="title" value={data.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Описание</Form.Label>
                    <Form.Control type="text" name="description" value={data.description} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Категрия</Form.Label>
                    <Form.Control type="text" name="category" value={data.category} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Цена</Form.Label>
                    <Form.Control type="text" name="price" value={data.price} onChange={handleChange}/>
                </Form.Group>
   
                <Button variant="success" type="submit">Добавить</Button>
            </Form>
        </Container>
    )
})
export default AddProduct;