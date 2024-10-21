import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

const initState = {name: '', gender: '', phone: '', addr: ''};
const reducer = (state, action) => {
    switch(action.type){
        case 'name':
            return{...state, name: action.value};
        case 'F':
            return{...state, gender: action.value};
        case 'M':
            return{...state, gender: action.value}; 
        case 'phone':
            return{...state, phone: action.value};
        case 'addr':
            return{...state, addr: action.value};
    }
}

const Home = () => {
    const [list, setList] = useState([]);
    const [user, dispatch] = useReducer(reducer, initState);

    const getList = async () => {
        const res = await axios.get('http://localhost:3100/person');
        if(res.data.success){
            setList(res.data.list);
        }
    }
    const fnDelete = async (id) => {
        console.log(id);
        const query = `http://localhost:3100/person/${id}`;
        const res = await axios.delete(query);
        if(res.data.success){
            getList();
        }
    }
    const fnUpdate = async (id, gender) => {
        console.log(gender);
        const res = await axios.put(`http://localhost:3100/person/${id}`, {gender: gender});
        if(res.data.success){
            getList();
        }
    }
    const addPerson = async() => {
        const res = await axios.post('http://localhost:3100/person', user);
        if(res.data.success){
            getList();
        }       
    }
    

    useEffect(() => {
        getList();
    }, [])

    return (
        <div>
            <input placeholder='name' onChange={(e)=>{
                dispatch({type: 'name', value: e.target.value})
            }}></input>
            <div>
                <label>
                    <input name='gender' value='F' onChange={(e)=>{
                        dispatch({type: 'F', value: e.target.value})
                        }} type='radio' />여
                </label>
                <label>
                    <input name='gender' value='M' onChange={(e)=>{
                        dispatch({type: 'M', value: e.target.value})
                        }} type='radio' />남    
                </label>
            </div>
            <div>
                <input placeholder='phone' onChange={(e)=>{
                dispatch({type: 'phone', value: e.target.value})
            }}></input>
            </div>
            <input placeholder='addr' onChange={(e)=>{
                dispatch({type: 'addr', value: e.target.value})
            }}></input>
            <div>
                <button onClick={addPerson}>추가</button>
            </div>
            <table>
                {
                    list.map((item) => {
                        return (
                            <tbody key={item.id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.phone}</td>
                                <td>{item.addr}</td>
                                <td><button onClick={()=>{
                                    fnUpdate(item.id, item.gender)
                                    }}>수정</button></td>
                                <td><button onClick={()=>{
                                    fnDelete(item.id)
                                    }}>삭제</button></td>
                            </tr>
                            </tbody>
                        )
                    })
                }
            </table>  
                
        </div>
    );
};  


export default Home;