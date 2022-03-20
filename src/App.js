import { useState, useRef, useEffect } from "react";
import ClientDetails from "./components/ClientDetails";
import Dates from "./components/Dates";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainDetails from "./components/MainDetails";
import Notes from "./components/Notes";
import Table from "./components/Table";
import TableForm from "./components/TableForm";
import ReactToPrint from "react-to-print";

function App() {
	const [showInvoice,setShowInvoice] = useState(false)
	const initialValues ={name:"",address:"",email:"",phone:"",website:"",clientName:"",clientAddress:"",invoiceNumber:"",invoiceDate:"",dueDate:"",notes:""}

	const [formValues,setFormValues] =useState(initialValues);
	const [formErrors,setFormErrors] =useState({});

	const[isSubmit,setIsSubmit] = useState(false)

	const handleChange = (e) => {
		const{name,value} = e.target;
		setFormValues({...formValues,[name]: value});
	}
 
	// const[name, setName] = useState("")
	// const[address, setAddress] = useState("")
	// const[email, setEmail] = useState("")
	// const[phone, setPhone] = useState("")
	// const[bankName, setBankName] = useState("")
	// const[bankAccount, setBankAccount] = useState("")
	// const[website, setWebsite] = useState("")
	// const[clientName, setClientName] = useState("")
	// const[clientAddress, setClientAddress] = useState("")
	// const[invoiceNumber, setInvoiceNumber] = useState("")
	// const[invoiceDate, setInvoiceDate] = useState("")
	// const[dueDate, setDueDate] = useState("")
	// const[notes, setNotes] = useState("")
	const[description, setDescription] = useState("")
	const[quantity, setQuantity] = useState("")
	const[price, setPrice] = useState("")
	const[amount, setAmount] = useState("")
	const[list,setList] =useState([])
	const[total,setTotal] = useState(0)

	const componentRef = useRef()
	
	const handlePrint = () => {
		window.print()
	}

	const formSubmit = (e) => {
        e.preventDefault()
		setFormErrors(validate(formValues) ) 
		setIsSubmit(true)
       //alert("Hi");
    }

	useEffect(() => {
		console.log(formErrors)
		if(Object.keys(formErrors).length === 0 && isSubmit){
			setShowInvoice(true)
			console.log(formValues)
		}
	},[formErrors])
	const validate =(values) => {
		const errors = {};	 
		//eslint-disable-next-line
		const regex = (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

	
		
     
		if(!values.name){
			errors.name =" Name is required"
		}
		if(!values.address){
			errors.address =" Address is required"
		}
		if(!values.website ){
			errors.website =" Website is not valid"
		}
		if(!values.email || regex.test(values.email) === false){
			errors.email =" Email is not valid"
		}
		if(!values.phone){
			errors.phone =" Phone Number is required"
		}
		if(!values.clientName){
			errors.clientName =" Client Name is required"
		}
		if(!values.clientAddress){
			errors.clientAddress ="Client Address is required"
		}
		if(!values.invoiceNumber){
			errors.invoiceNumber =" Invoice Number is required"
		}
		if(!values.invoiceDate){
			errors.invoiceDate =" Invoice Date is required"
		}
		if(!values.dueDate){
			errors.dueDate =" Due Date is required"
		}

		return errors;
	}

  return (
    <>

		<main className="invoice m-10 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white border-gray-500 rounded shadow">

				{showInvoice ?  <>

			<ReactToPrint 
			trigger={() => <button className="ml-5 mt-5 bg-500 float-right  justify-end text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Print / Download</button>  }
			content={() => componentRef.current} />

			<div ref={componentRef} className="p-5">   
			<Header handlePrint={handlePrint} />
			<MainDetails name={formValues.name} address={formValues.address} />
			<ClientDetails clientName={formValues.clientName} clientAddress={formValues.clientAddress} />
			<Dates invoiceNumber={formValues.invoiceNumber} invoiceDate={formValues.invoiceDate} dueDate={formValues.dueDate} />				
			<Table description={description} quantity={quantity} price={price} amount={amount} list={list} setList={setList} total={total} setTotal={setTotal}/>
			<Notes notes={formValues.notes} />		
			<Footer
			 name={formValues.name} 
			 address={formValues.address} 
			 website={formValues.website} 
			 email={formValues.email}
			 phone={formValues.phone}
			//  bankAccount={bankAccount}
			//  bankName={bankName} 
			/>
			

		</div>
		<button onClick={() => setShowInvoice(false)}  className="mt-5 bg-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Edit Information</button>
		</> : (
			<>
			
				<form onSubmit={formSubmit}>
					{/* <pre>{JSON.stringify(formValues,undefined,2)}</pre> */}
					<div>
				<h1 className="font-bold tracking-wide text-3xl mb-5"> Invoice Details </h1>
			</div>
				<div className=" flex flex-col justify_center ">	
					<article className="md:grid grid-rows-5 ">
						<div className="flex flex-col">
							
							<input type="text" 
								name="name" 
								id="name" 
								placeholder="Enter your Name"
								autoComplete="off"
								value={formValues.name}
								onChange={handleChange}
								
							/>
							{(formErrors.name !== "")? (<div className="error">{formErrors.name}</div>) : ("")}
						</div>
						

						<div  className="flex flex-col">
						
							<input type="text" 
								name="address" 
								id="address" 
								placeholder="Enter your Address"
								autoComplete="off"
								value={formValues.address}
								onChange={handleChange}
							/>
							{(formErrors.address !== "")? (<div className="error">{formErrors.address}</div>) : ("")}
						</div>
					
						<div className="flex flex-col">
							
							<input type="email" 
							name="email" 
							id="email" 
							placeholder="Enter your Email"
							autoComplete="off"
							value={formValues.email}
							onChange={handleChange}
							/>
							{(formErrors.email !== "")? (<div className="error">{formErrors.email}</div>) : ("")}
						</div>

						<div className="flex flex-col">
							
							<input type="url" 
								name="website" 
								id="website" 
								placeholder="Enter your website"
								autoComplete="off"
								value={formValues.website}
								onChange={handleChange}
							/>
							{(formErrors.website !== "")? (<div className="error">{formErrors.website}</div>) : ("")}
						</div>

					
						<div className="flex flex-col">
						
							<input type="text" 
								name="phone" 
								id="phone" 
								placeholder="Enter your phone"
								autoComplete="off"
								value={formValues.phone}
								onChange={handleChange}
							/>
							{(formErrors.phone !== "")? (<div className="error">{formErrors.phone}</div>) : ("")}
						</div>
					</article>

				
					

					
					{/* <article  className="md:grid grid-cols-2 gap-10">
					<div  className="flex flex-col">
					
					<input type="text" 
						name="bankName" 
						id="bankName" 
						placeholder="Enter your bank name"
						autoComplete="off"
						value={bankName}
						onChange={(e)=> setBankName(e.target.value)}
					/>
					</div>

					<div  className="flex flex-col">
					<label htmlFor="bankAccount">Enter your Bank Account</label>
					<input type="text" 
						name="bankAccount" 
						id="bankAccount" 
						placeholder="Enter your bank account"
						autoComplete="off"
						value={bankAccount}
						onChange={(e)=> setBankAccount(e.target.value)}
					/>
					</div>
					</article> */}
					<label htmlFor="bill" className="md:mt-20 font-bold">Bill To :</label>
					<article  className="md:grid grid-cols-2 gap-10 md:mt-2">
					<div  className="flex flex-col">
					
					<input type="text" 
						name="clientName" 
						id="clientName" 
						placeholder="Enter your client's name"
						autoComplete="off"
						value={formValues.clientName}
						onChange={handleChange}
					/>
					{(formErrors.clientName !== "")? (<div className="error">{formErrors.clientName}</div>) : ("")}
					</div>

					<div  className="flex flex-col">
					
					<input type="text" 
						name="clientAddress" 
						id="clientAddress" 
						placeholder="Enter your client's address"
						autoComplete="off"
						value={formValues.clientAddress}
						onChange={handleChange}
					/>
					{(formErrors.clientAddress !== "")? (<div className="error">{formErrors.clientAddress}</div>) : ("")}
					</div>
					</article>

					<article  className="md:grid grid-cols-3 gap-10">
					<div  className="flex flex-col">
					<label htmlFor="invoiceNumber" className="font-bold">Invoice Number</label>
					<input type="text" 
						name="invoiceNumber" 
						id="invoiceNumber" 
						placeholder="Invoice number"
						autoComplete="off"
						value={formValues.invoiceNumber}
						onChange={handleChange}
					/>
					{(formErrors.invoiceNumber !== "")? (<div className="error">{formErrors.invoiceNumber}</div>) : ("")}
					</div>

					<div  className="flex flex-col">
					<label htmlFor="invoiceDate" className="font-bold">Invoice Date</label>
					<input type="Date" 
						name="invoiceDate" 
						id="invoiceDate" 
						placeholder="Invoice Date"
						autoComplete="off"
						value={formValues.invoiceDate}
						onChange={handleChange}
					/>
					{(formErrors.invoiceDate !== "")? (<div className="error">{formErrors.invoiceDate}</div>) : ("")}
					</div>

					<div  className="flex flex-col">
					<label htmlFor="dueDate" className="font-bold">Due Date</label>
					<input type="Date" 
						name="dueDate" 
						id="dueDate" 
						placeholder="Due Date"
						autoComplete="off"
						value={formValues.dueDate}
						onChange={handleChange}
					/>
					{(formErrors.dueDate !== "")? (<div className="error">{formErrors.dueDate}</div>) : ("")}
					</div>

					</article>

					{/* This is our table form */}
					<article>
						<TableForm
						 description={description} setDescription={setDescription} 
						 quantity={quantity} setQuantity={setQuantity}
						 price={price} setPrice={setPrice}
						 amount={amount} setAmount={setAmount}
						 list={list} setList={setList}
						 total={total} setTotal={setTotal} />
					</article>

					<label htmlFor="notes">Additional Notes</label>
					<textarea 
						name="notes" 
						id="notes" 
						cols="30" 
						rows="10" 
						placeholder="Additional notes to the client" 
						value={formValues.notes} 
						onChange={handleChange}>
					</textarea>
				<button type="submit"  className="bg-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Preview Invoice</button>
				</div>

				</form>
			</>
		)}
		</main>
		
    </>
  );
}

export default App;
