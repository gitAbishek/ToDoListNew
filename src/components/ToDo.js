import { useState,useEffect } from "react"
import { BsPlus } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md"

const getLocalData = () =>{
    const lists = localStorage.getItem("mytodolist");

    if(lists){
        return JSON.parse(lists)
    }else{
        return [];
    }
}

const ToDo = () => {

    const [InputData, setInputData] = useState()
    const [items, setItems] = useState(getLocalData())
    const [isEditedItem,setIsEditedItem] = useState("")
    const [toggleButton,setToggleButton] = useState(false)

    const InputValue = () => {
        if (!InputData) {
            alert("plzz fill the value")
        }else if(InputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===isEditedItem){
                        return {...curElem, name:InputData}
                    }

                    return curElem
                })
            )

        setInputData("");
        setIsEditedItem(null)  
        setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: InputData
            }
            setItems([...items, myNewInputData]);
            setInputData("");
            
        }
    }

    const editItem = (index) =>{
        const edit_items = items.find((curElem) => {
            return curElem.id === index;
        })

        setInputData(edit_items.name);
        setIsEditedItem(index)  
        setToggleButton(true)
    }

    const DeleteItems = (index) =>{

        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(updatedItems)

    }


    const removeAll = () =>{
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem("mytodolist",JSON.stringify(items))
    },[items])


    return (
        <div className="todo">


            <div className="container">

                <div className="title">ToDo <span>List</span> </div>


                <div className="box1">
                    <p className="emoji">✍️</p>
                    <input type="text"
                        className="no-outline"
                        placeholder="  Add Item .."
                        value={InputData}
                        onChange={(event) => setInputData(event.target.value)}
                    />
                    {
                        toggleButton ? (<p className="plusicon"
                        onClick={InputValue}
                    ><BsPencilSquare /></p>) : (<p className="plusicon"
                        onClick={InputValue}
                    ><BsPlus /></p>)
                    }
                </div>

                {
                    items.map((curElem, index) => {
                        return (
                            <>
                                <div className="box2">
                                    <p className="textitem" key={curElem.id}>{curElem.name}</p>
                                    <div className="box2_icon">
                                    <p className="pencilicon"
                                    onClick={()=> editItem(curElem.id)}
                                    ><BsPencilSquare /></p>
                                    <p className="plusicon"
                                    onClick={() => DeleteItems(curElem.id)}
                                    ><MdDelete /></p>
                                    </div>
                                </div>
                            </>
                        )

                    })
                }


                <div className="btn2">
                    <button
                    onClick={removeAll}
                    >CHECK LIST</button>
                </div>


            </div>
        </div>

    )

}

export default ToDo