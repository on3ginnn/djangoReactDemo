import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { productStore } from "../../stores/ProductStore";

const ProductItem = ({ id, title, description, category, price, onDelete }) => {
    const navigate = useNavigate();
    const editProduct = () => {
        navigate(`/product/edit/${id}`);
    }
    const deleteProduct = async () => {
        await productStore.deleteProduct(id).then(()=>{
            onDelete(id);
        });
    }

    return (
        <Card className="">
            <Card.Img variant="top" src="/src/assets/img/" />
            <div className="d-flex justify-content-center p-5">
                <div className="spinner-border text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            <Card.Body>
                <Card.Title>{ title }</Card.Title>
                <Card.Text>
                    { description }
                </Card.Text>
                <div className="badge text-bg-light text-wrap fw-normal text-secondary">
                    { category }
                    {/* TODO: select_related чтобы возвращать название категрии */}
                </div>
                <div className="d-flex justify-content-between">
                    <div className="fs-4 fw-medium">$ { price }</div>
                    <div>
                        <Button variant="primary">Купить</Button>                    
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductItem;
