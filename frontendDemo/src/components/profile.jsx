import { Alert, Container } from "react-bootstrap"
import { userStore } from '../stores/UserStore';
import { observer } from 'mobx-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Nav, Navbar } from "react-bootstrap"

const Profile = observer(()=>{
    const navigate = useNavigate();

    const [user,setUser] = useState();
    // использовать useEffect для запроса один раз при подгрузке страницы
    useEffect(() => {
        async function fetchUser(){
            await userStore.getProfileUser().then(res=>{
                // для выхода в случае если пользователь не аутентифицирован
                if (res === undefined) {
                    userStore.logout();
                    navigate("/login");
                }
                setUser(res);
            });
        }
        fetchUser();

    }, [])

    const editProfile = () => {
        // userStore.setUser();
        navigate('/profile/edit');
    }

    const deleteProfile = async ()=>{
        await userStore.deleteUser().then(()=>{
            navigate('/');
        });
    }


    return(
        <Container fluid="md">
            {/* ожидание подгрузки */}
            {
                !user ? (<p>Loading...</p>) : (<div>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                </div>)
            }
            <Button variant="primary" onClick={editProfile}>Изменить</Button>
            <Button variant="danger" onClick={deleteProfile} type="button">Удалить аккаунт</Button>
        </Container>
    )
})
export default Profile;