import { Alert, Container } from "react-bootstrap"
import {userStore} from '../../stores/UserStore';
import {observer} from 'mobx-react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = observer(()=>{
    // const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserList(){
            // await userStore.userList().then(res=>{
            //     console.log(res);
            //     // для выхода в случае если пользователь не аутентифицирован
            //     if (res === undefined) {
            //         userStore.logout();
            //         navigate("/login");
            //     }
            //     console.log(res.status);
            //     setUsers(res);
            // });
            await userStore.getUserList();
        }
        fetchUserList();
    }, [])

    return(
        <Container>
                {console.log(userStore.userList)}
                {userStore.userList.map((el, i) => <h1>{el}</h1>)}

        </Container>
    )
})
export default UserList;