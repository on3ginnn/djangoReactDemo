import { Container } from "react-bootstrap"
import axios from "axios"
import { useEffect, useState } from "react"
import CategoryItem from "./category_item";
import { categoryStore } from '../../stores/CategoryStore';

const Categories = () => {
    
    const [categoryList,setCategoryList] = useState();

    // использовать useEffect для запроса один раз при подгрузке страницы
    useEffect(() => {
        async function fetchCategoryList(){
            await categoryStore.getCategoryList().then(res => setCategoryList(res));
        }
        fetchCategoryList();
    }, [])

    const addCategory = () => {
        navigate('/category/add');
    }

    return(
        <Container fluid="md">
            { console.log(categoryList) }
            {/*
                data.map((el,i)=><CategoryItem name={el.name} id={el._id} key={i}/>)
            */}
            {
                categoryList.map((el, i) => (
                    <CategoryItem name={el.name} id={el._id} key={i}/>
                ))
            }
            <Button variant="primary" onClick={addCategory}>Добавить категорию</Button>
        </Container>
    )
}
export default Categories;