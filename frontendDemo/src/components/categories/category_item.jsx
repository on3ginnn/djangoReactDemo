import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { categoryStore } from '../../stores/CategoryStore';

const CategoryItem = ({ id, title, onDelete }) => {
    const navigate = useNavigate();
    const editCategory = () => {
        navigate(`/category/edit/${id}`);
    }
    const deleteCategory = async () => {
        await categoryStore.deleteCategory(id).then(()=>{
            onDelete(id);
        });
    }

    return (
        <ListGroup.Item as="li">
            <h1>ID: {id}</h1>
            <p>Title: {title}</p>
            <Button variant="warning" onClick={editCategory}>Изменить</Button>
            <Button variant="danger" onClick={deleteCategory}>Удалить</Button>
        </ListGroup.Item>
    );
};

export default CategoryItem;
