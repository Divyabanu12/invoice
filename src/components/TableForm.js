import React, { useState, useEffect } from "react"
import {AiOutlineDelete,AiOutlineEdit} from "react-icons/ai"
import { v4 as uuidv4} from "uuid"

export default function TableForm({description,setDescription,quantity,setQuantity,price,setPrice,amount,setAmount,list,setList,total,setTotal}){

    const[isEditing, setIsEditing] =useState(false)
    // Submit form function
    const handleSubmit = (e) => {
        e.preventDefault()

        if(!description || !quantity || !price){
            alert("Enter all the item details")
        }else{

            const newItems={
                id: uuidv4(),
                description,
                quantity,
                price,
                amount 
             }
             setDescription("")
             setQuantity("")
             setPrice("")
             setAmount("")
             setList([...list, newItems])
             setIsEditing(false)
        }

    }

    //Calculate items amount function
    useEffect(() =>{
        const calculateAmount = (amount) => {
            setAmount(quantity * price)
        }

        calculateAmount(amount)
    }, [amount,price,quantity,setAmount])

    //Calculate total amount of items in table

    useEffect(() =>{
        let row = document.querySelectorAll(".amount")
        let sum = 0
    
        for(let i=0;i<row.length;i++){
            if(row[i].className === "amount"){
                sum += isNaN(row[i].innerHTML) ? 0 : parseInt(row[i].innerHTML)
                setTotal(sum)
            }
         
        }
    })

    //Edit Button function
    const editRow = (id) => {
        const editingRow = list.find((row) => row.id === id)
        setList(list.filter((row) => row.id !== id))
        setIsEditing(true)
        setDescription(editingRow.description)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)
    }
    //Delete Button function
    const deleteRow = (id) =>   setList(list.filter((row) => row.id !== id))
  
      
    return (
        
        <>
        	<form onSubmit={handleSubmit}> 
            <div className="flex flex-col md:mt-16">
                <label htmlFor="description">Item Description</label>
                <input 
                    type="text" 
                    name="description" 
                    id="description" 
                    placeholder="Item Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

           <div className="md:grid grid-cols-3 gap-10">
           <div className="flex flex-col">
                <label htmlFor="quantity">Quantity</label>
                <input 
                    type="text" 
                    name="quantity" 
                    id="quantity" 
                    placeholder="Quantity" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="price">Item Price</label>
                <input 
                    type="text" 
                    name="price" 
                    id="price" 
                    placeholder="Item Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="flex flex-col">
                <label htmlFor="amount">Amount</label>
               <p>{amount}</p>
            </div>
           </div>
           <button type="submit" className="mb-5 bg-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">
           {isEditing ? "Editing Row Item " : "Add Table Item"}    
           </button>
            </form>

            {/* Table items */}
            <table width="100%" className="mb-10">
            <thead>
                    <tr className="bg-gray-400">
                        <td className="font-bold pl-5">Item Description</td>
                        <td className="font-bold">Quantity</td>
                        <td className="font-bold">Price</td>
                        <td className="font-bold">Amount</td>
                        <td className="font-bold">Actions</td>

                    </tr>
                    </thead>
                {list.map(( {id,description,quantity,price,amount }) =>(
                   <React.Fragment key={id}>
                  
                    <tbody>
                        <tr>
                            <td className="pl-5">{description}</td>
                            <td>{quantity}</td>
                            <td>{price}</td>
                            <td className="amount">{amount}</td>
                            <td><button onClick={() => deleteRow(id)}><AiOutlineDelete className="bg-white text-red-500 font-bold text-xl" /></button></td>
                            <td><button onClick={() => editRow(id)}><AiOutlineEdit className="bg-white text-green-500 font-bold text-xl" /></button></td>
                        </tr>
                    </tbody>
                   </React.Fragment>
                ) )}
            </table>

            <div>
                <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">Rs. {total.toLocaleString()}</h2>
            </div>
        </>
    )
}