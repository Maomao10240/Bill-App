import {DatePicker, NavBar} from "antd-mobile";
import './Month.css'
import {useMemo, useState} from "react";
import classNames from 'classnames';
import dayjs from 'dayjs'
import {useSelector} from "react-redux";
import lodash from 'lodash'

const Month=()=>{
    const [dataVisilbe,setDataVisile] = useState(false)
    const[currentDate, setCurrentDate] = useState(()=>{
        return dayjs(new Date()).format('YYYY-MM')
    })
    const {billList} = useSelector(state=>state.bill)
    //data process, group the data into month
    const monthGroup = useMemo(()=>{
        return lodash.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    const [currentMonthList, setCurrentMonthList] = useState([])

    const onConfirm =(date)=>{
        setDataVisile(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentMonthList(monthGroup[formatDate])
        setCurrentDate(formatDate)
        console.log(date)
    }

    const monthResult = useMemo(()=>{
        const pay = currentMonthList.filter(item=>item.type==='pay').reduce((a,c)=>a+c.money,0)
        const income = currentMonthList.filter(item=>item.type==='income').reduce((a,c)=>a+c.money,0)
        return{
            pay,income, total:pay+income
        }
    },[currentMonthList])

    console.log(monthResult)
    return (
        <div className="monthlyBill">
            <NavBar className='nav'>
                Monthly Income and Expense
            </NavBar>
            <div className="content">
                {/*change the month accordingly*/}
                <div className='header'>
                    <div onClick={()=>setDataVisile(true)}>
                        <div>
                            {currentDate +""}月账单 <span className={classNames('arrow', dataVisilbe && 'expand')}></span>

                        </div>
                    </div>
                </div>
                <div className='twoLineOverview'>
                    {/*Month Data    */}
                    <div className="item">
                        <span>{monthResult.pay}</span>
                        <span>支出</span>
                    </div>
                    <div className="item">
                        <span>{monthResult.income}</span>
                        <span>收入</span>
                    </div>
                    <div className="item">
                        <span>{monthResult.total}</span>
                        <span>结余</span>
                    </div>
                </div>
            </div>
            <div>
                <DatePicker className ="Date" visible ={dataVisilbe} precision="month" onCancel={()=>setDataVisile(false)} onClose={()=>setDataVisile(false)} onConfirm={onConfirm}/>
            </div>

            This is the month
        </div>
    )
}
export default Month;