import { useState, useRef } from "react";
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

	const[name, setName] = useState("")
	const[address, setAddress] = useState("")
	const[email, setEmail] = useState("")
	const[phone, setPhone] = useState("")
	const[bankName, setBankName] = useState("")
	const[bankAccount, setBankAccount] = useState("")
	const[website, setWebsite] = useState("")
	const[clientName, setClientName] = useState("")
	const[clientAddress, setClientAddress] = useState("")
	const[invoiceNumber, setInvoiceNumber] = useState("")
	const[invoiceDate, setInvoiceDate] = useState("")
	const[dueDate, setDueDate] = useState("")
	const[notes, setNotes] = useState("")
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
  return (
    <>

		<main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white border-gray-500 rounded shadow">

		

		{showInvoice ?  <>

			<ReactToPrint 
			trigger={() => <button className="ml-5 mt-5 bg-500 float-right  justify-end text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Print / Download</button>  }
			content={() => componentRef.current} />

			<div ref={componentRef} className="p-5">   
			<Header handlePrint={handlePrint} />
			<MainDetails name={name} address={address} />
			<ClientDetails clientName={clientName} clientAddress={clientAddress} />
			<Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />				
			<Table description={description} quantity={quantity} price={price} amount={amount} list={list} setList={setList} total={total} setTotal={setTotal}/>
			<Notes notes={notes} />		
			<Footer
			 name={name} 
			 address={address} 
			 website={website} 
			 email={email}
			 phone={phone}
			 bankAccount={bankAccount}
			 bankName={bankName} />
			

		</div>
		<button onClick={() => setShowInvoice(false)}  className="mt-5 bg-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Edit Information</button>
		</> : (
			<>
			<div>
				<h1 className="font-bold tracking-wide text-3xl mb-5"> Invoice Details </h1>
			</div>
				<div className="flex flex-col justify_center">
					<article className="md:grid grid-cols-2 gap-10">
						<div className="flex flex-col">
							<label htmlFor="name">Your name</label>
							<input type="text" 
								name="name" 
								id="name" 
								placeholder="Enter your Name"
								autoComplete="off"
								value={name}
								onChange={(e)=> setName(e.target.value)}
							/>
						</div>

						<div  className="flex flex-col">
							<label htmlFor="address">Your address</label>
							<input type="text" 
								name="address" 
								id="address" 
								placeholder="Enter your Address"
								autoComplete="off"
								value={address}
								onChange={(e)=> setAddress(e.target.value)}
							/>
						</div>
					</article>

					<article className="md:grid grid-cols-3 gap-10">
						<div className="flex flex-col">
							<label htmlFor="email">Your email</label>
							<input type="email" 
							name="email" 
							id="email" 
							placeholder="Enter your Email"
							autoComplete="off"
							value={email}
							onChange={(e)=> setEmail(e.target.value)}
							/>
						</div>

						<div className="flex flex-col">
							<label htmlFor="website">Your website</label>
							<input type="url" 
								name="website" 
								id="website" 
								placeholder="Enter your website"
								autoComplete="off"
								value={website}
								onChange={(e)=> setWebsite(e.target.value)}
							/>
						</div>

					
						<div className="flex flex-col">
							<label htmlFor="phone">Your phone</label>
							<input type="text" 
								name="phone" 
								id="phone" 
								placeholder="Enter your phone"
								autoComplete="off"
								value={phone}
								onChange={(e)=> setPhone(e.target.value)}
							/>
						</div>

					</article>
					
					<article  className="md:grid grid-cols-2 gap-10">
					<div  className="flex flex-col">
					<label htmlFor="bankName">Your Bank Name</label>
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
					</article>
					<label htmlFor="bill" className="md:mt-20 font-bold">Bill To :</label>
					<article  className="md:grid grid-cols-2 gap-10 md:mt-2">
					<div  className="flex flex-col">
					<label htmlFor="clientName">Enter your Client's Name</label>
					<input type="text" 
						name="clientName" 
						id="clientName" 
						placeholder="Enter your client's name"
						autoComplete="off"
						value={clientName}
						onChange={(e)=> setClientName(e.target.value)}
					/>
					</div>

					<div  className="flex flex-col">
					<label htmlFor="clientAddress">Enter your Client's Address</label>
					<input type="text" 
						name="clientAddress" 
						id="clientAddress" 
						placeholder="Enter your client's address"
						autoComplete="off"
						value={clientAddress}
						onChange={(e)=> setClientAddress(e.target.value)}
					/>
					</div>
					</article>

					<article  className="md:grid grid-cols-3 gap-10">
					<div  className="flex flex-col">
					<label htmlFor="invoiceNumber">Invoice number </label>
					<input type="text" 
						name="invoiceNumber" 
						id="invoiceNumber" 
						placeholder="Invoice number"
						autoComplete="off"
						value={invoiceNumber}
						onChange={(e)=> setInvoiceNumber(e.target.value)}
					/>
					</div>

					<div  className="flex flex-col">
					<label htmlFor="invoiceDate">Invoice Date </label>
					<input type="Date" 
						name="invoiceDate" 
						id="invoiceDate" 
						placeholder="Invoice Date"
						autoComplete="off"
						value={invoiceDate}
						onChange={(e)=> setInvoiceDate(e.target.value)}
					/>
					</div>

					<div  className="flex flex-col">
					<label htmlFor="dueDate">Due Date </label>
					<input type="Date" 
						name="dueDate" 
						id="dueDate" 
						placeholder="Due Date"
						autoComplete="off"
						value={dueDate}
						onChange={(e)=> setDueDate(e.target.value)}
					/>
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
						value={notes} 
						onChange={(e) => setNotes(e.target.value)}>
					</textarea>
				<button onClick={() => setShowInvoice(true)} className="bg-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-500 hover:bg-transparent hover:text-500 transition-all duration-300">Preview Invoice</button>
				</div>
			</>
		)}
		</main>
		
    </>
  );
}

export default App;
