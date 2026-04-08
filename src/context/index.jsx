import { createContext, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
const MyContext=createContext();
const MyProvider=(props)=>{
    const[stage,setStage]=useState(1); 
    const[players,setPlayers]=useState([]);
    const [result,setResult]=useState('');  
    const addPlayer=(name)=>{
        console.log(players);
        setPlayers(prevState=>([
             ...prevState,
             name

     ]))



    }  

    
    const  removePlayerHandler=(idx)=>{
        let newArray=[...players];
        newArray.splice(idx,1)
        setPlayers(newArray);


    }
    const nextHandler=()=>{
        if(players.length<2){
            toast.error('You need more than one player ',{
                position:'top-left',
                autoClose:2000
            })

        }else{
            setStage(2);
            setTimeout(()=>{
              generateLoser()

            },2000)
        }
    }
    const generateLoser=()=>{
        let result=players[Math.floor(Math.random()*players.length)];
        setResult(result)
    }
    const resetGame=()=>{
         setStage(1);
         setPlayers([]);
         setResult('')
    }
    return(
        <>
        <MyContext.Provider value={{
        
             //Stage
             stage:stage,
             players:players,
             result:result,
             //Methods
             addPlayer:addPlayer,
             removePlayer:removePlayerHandler,
             next:nextHandler,
             generateNewLoser:generateLoser,
             resetGame:resetGame

        }


        }>
            {props.children}
            </MyContext.Provider>
            <ToastContainer/>
        </>
    )
}
export{
    MyContext,
    MyProvider
}