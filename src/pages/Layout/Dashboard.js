import {Outlet, useNavigate} from "react-router-dom";
import {TabBar} from "antd-mobile"
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBill} from "../../store/module/store";
import './Dashboard.css'
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'

const Layout=()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchBill())
    },[dispatch])
    const {billList} = useSelector(state=>state.bill)
    console.log(billList)

    const tabs = [
        {
            key: '/month',
            title: 'Monthly Bill',
            icon: <BillOutline/>
        },
        {
            key: '/new',
            title: 'Add new transaction',
            icon: <AddCircleOutline/>
        },
        {
            key: '/year',
            title: 'Annually Bill',
            icon: <CalculatorOutline/>
        },
    ]
    const navigate = useNavigate()
    const switchTab = (path)=>{
        console.log(path)
        navigate(path)
    }
    return (
        <div className = 'layout'>
            <div className='container'>
                <Outlet/>
            </div>
            <div className='footer'>
                <TabBar onChange={switchTab}>
                    {tabs.map(item =>(
                        <TabBar.Item key={item.key} icon = {item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout;