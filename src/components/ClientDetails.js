export default function ClientDetails({clientName,clientAddress}){
    return (
        <>
        			
            <label className="md:mt-20 font-bold">Bill to :</label>
            <div></div>
		   <section >
			   <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
			   <p>{clientAddress}</p>
		   </section>
		 
			
        </>
    )
}