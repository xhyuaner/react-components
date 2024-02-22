// 账单列表相关store
import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList:[]
    },
    reducers:{
        // 同步修改账单方法
        setBillList(state,action){
            state.billList = action.payload
        },
        // 同步添加账单方法
        addBillList(state,action){
            state.billList.push(action.payload)
        }
    }
})

const {setBillList,addBillList} = billStore.actions
// 编写异步函数，获取数据
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}

const addBill = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addBillList(res.data))
    }
}

export {getBillList, addBill}

const reducer = billStore.reducer

export default reducer