import React,{useState} from "react";
import DataTable from 'react-data-table-component';
const columns = [
	{
		name: 'No',
		selector: row => row.id,
        sortable: true,
	},
	{
		name: 'အမည်',
		selector: row => row.name,
		sortable: true,
	},
    {
		name: 'ဖုန်းနံပါတ်',
		selector: row => row.phone,
		sortable: true,
	},
    {
		name: 'အီးမေးလ်',
		selector: row => row.email,
		sortable: true,
	},
    {
		name: 'ရာထူး',
		selector: row => row.type,
		sortable: true,
	},
    {
		name: '',
		selector: row => row.icon,
	},
];
const data = [
  	{
		id: 1, 
		name: 'အောင်',
		phone: '09 123456789', 
		email: 'umya@gmail.com',
        type:'Admin',
        icon:"",
	},
	{
		id: 2, 
		name: 'အိုး', 
		phone: '09 123456789', 
		email: 'oohla@gmail.com',
        type:'Staff',
        icon:"",
	},
    {
		id: 3, 
		name: 'ဒေါ်', 
		phone: '09 123456789', 
		email: 'dawhlala@gmail.com',
        type:'Admin',
        icon:"",
	},
    {
		id: 4,
		name: 'Beetlejuice',
		phone: '09123456789',
        email:'umya@gmail.com',
        type:'Staff',
        icon:"",
	},
    {
		id: 5,
		name: 'juice',
		phone: '09123456789',
        email:'juice@gmail.com',
        type:'Admin',
        icon:"",
	},
]
export default function UserTable()
{
	const [searchText, setSearchText] = useState('');
  	const handleSearch = (e) => {
    setSearchText(e.target.value);
  	};
  	const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.includes(searchText) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.type.toLowerCase().includes(searchText.toLowerCase())
  	);
	  
    return(
        <div className="flex flex-col h-auto" style={{width:"1146px"}}>
		<input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleSearch}
      	/>
        <DataTable
			columns={columns}
			data={filteredData}
			pagination
            sortIcon
			paginationPerPage={3}
			paginationComponentOptions={{
			  rowsPerPageText: 'Rows per page:',
			  rangeSeparatorText: 'of',
			  noRowsPerPage: false,
			  selectAllRowsItem: false,
			}} 
            className=" bg-white rounded-md mt-2"
		/>
        </div>
    )
}

{/* eye:
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg> 
pencil:
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
trash:
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
eye-crossed:
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>
*/
}