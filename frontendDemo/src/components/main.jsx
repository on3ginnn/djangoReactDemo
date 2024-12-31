import {Routes,Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../config/routes';
import { observer } from 'mobx-react';
import { userStore } from '../stores/UserStore';
import "../assets/css/main.css";

const Main = observer(()=>{

    return(
        <div className='main'>
        <Routes>
            {userStore.accessToken.length==0 && publicRoutes.map((el,i)=><Route key={i} path={el.path} Component={el.component}/>)}
            {userStore.accessToken.length!=0 && authRoutes.map((el,i)=><Route key={i} path={el.path} Component={el.component}/>)}
            {/* <Route path="*" Component={<p>Ушёл отсюда</p>}/>  если не один путь не совпал с routes */}
        </Routes>
        </div>
    )
})
export default Main;