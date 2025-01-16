import { Container, Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProductItem from "./product_item";
import { productStore } from '../../stores/ProductStore';
import { useNavigate } from "react-router-dom";

const Products = () => {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]); // Инициализируем пустым массивом

    // Использовать useEffect для запроса один раз при подгрузке страницы
    useEffect(() => {
        async function fetchProductList() {
            const res = await productStore.getProductList();
            setProductList(res); // Обновляем состояние
        }
        fetchProductList();
    }, []);
    
    // Функция для удаления категории из локального состояния
    const handleDelete = (id) => {
        setProductList((prevList) => prevList.filter((product) => product.id !== id));
    };

    const addProduct = () => {
        navigate('/product/add');
    };

    return (
        <Container fluid="md">
            {productList.length === 0 && <p>Товары отсутствуют.</p>}
            <Row>
                {productList.length !== 0 && productList.map((el, i) => (
                    <Col xs="6" md="4" lg="3" key={i}>
                    { console.log(el) }
                    <ProductItem 
                        title={el.title}
                        description={el.description}
                        category={el.category.title}
                        price={el.price}
                        id={el.id}
                        key={i}
                        onDelete={handleDelete}
                    />
                    </Col>
                ))}
            </Row>
            <Button variant="primary" onClick={addProduct}>Добавить товар</Button>
        </Container>
    );
};

export default Products;
