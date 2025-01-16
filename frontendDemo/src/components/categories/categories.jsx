import { Container, Button, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import CategoryItem from "./category_item";
import { categoryStore } from '../../stores/CategoryStore';
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]); // Инициализируем пустым массивом

    // Использовать useEffect для запроса один раз при подгрузке страницы
    useEffect(() => {
        async function fetchCategoryList() {
            const res = await categoryStore.getCategoryList();
            setCategoryList(res); // Обновляем состояние
        }
        fetchCategoryList();
    }, []);
    
    // Функция для удаления категории из локального состояния
    const handleDelete = (id) => {
        setCategoryList((prevList) => prevList.filter((category) => category.id !== id));
    };

    const addCategory = () => {
        navigate('/category/add');
    };

    return (
        <Container fluid="md">
            {categoryList.length === 0 && <p>Категории отсутствуют.</p>}
            <ListGroup as='ul'>
            {categoryList.length !== 0 && categoryList.map((el, i) => (
                <CategoryItem title={el.title} id={el.id} key={i} onDelete={handleDelete} />
            ))}
            </ListGroup>
            <Button variant="primary" onClick={addCategory}>Добавить категорию</Button>
        </Container>
    );
};

export default Categories;
