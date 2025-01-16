import { Container, Form, Button } from "react-bootstrap"
import { useState } from "react";
import { categoryStore } from '../../stores/CategoryStore';
import { observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditCategory = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        await categoryStore.setCategory(id, data).then(()=>{
            navigate('/categories');
        });
    }

    return(
        <Container fluid="md">
            <h1>Изменение категории</h1>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="title" value={data.title} onChange={handleChange}/>
                </Form.Group>
   
                <Button variant="success" type="submit">Сохранить</Button>
            </Form>
        </Container>
    )
})
export default EditCategory;