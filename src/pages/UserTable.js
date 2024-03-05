import React,{useState} from "react";
import Select from 'react-select'
export default function UserTable()
{
	const [itemsPerPage, setItemsPerPage] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const rows=[
		{ name: "No" },
		{ name: "အမည်" },
		{ name: "ဖုန်းနံပါတ်"},
		{ name: "အီးမေးလ်"  },
		{ name: "ရာထူး" },
		{ name: ""  },
	  ]
	const userData = [
		{ no: 1, name: 'Small Car', phone: "500" ,email:"example@gmail.com",role:"Admin"},
		{ no: 2, name: 'Medium Car', phone: "1000",email:"example@gmail.com",role:"Staff" },
		{ no: 3, name: 'Large Car', phone: "2000" ,email:"example@gmail.com",role:"Admin"},
		{ no: 4, name: 'Big Car', phone: "3000",email:"example@gmail.com",role:"Staff" },
		{ no: 5, name: 'Huge Car', phone: "10000",email:"example@gmail.com",role:"Admin" },
	  ];
	const [searchedData,setSearchedData] =useState([])
	const [status,setStatus] =useState(false)
	const [searchText, setSearchText] = useState('');
	const handleSearch = (e) => {
		const searchText = e.target.value.toLowerCase();
		setSearchText(searchText);
		setSearchedData(userData.filter(
			(user) =>
			  user.name.toLowerCase().includes(searchText) ||
			  user.phone.toLowerCase().includes(searchText) ||
			  user.email.toLowerCase().includes(searchText)
		  )
		);
		setStatus(true)
	  };
 
	  const [selectedRole, setSelectedRole] = useState(null);
	  const handleRoleChange = (selectedOption) => {
		setSelectedRole(selectedOption);
		setSearchedData(
		  selectedOption
			? userData.filter((user) => user.role === selectedOption.label)
			: userData
		);
		setStatus(true)
	  };
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = status ? searchedData.slice(indexOfFirstItem, indexOfLastItem) : userData.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const handleItemsPerPageChange = (selectedOption) => {
        setItemsPerPage(selectedOption.value);
        setCurrentPage(1); // Reset current page when changing items per page
    };
	return(
        <div className="flex flex-col h-auto" style={{width:"1146px"}}>
		<div className="flex items-center justify-evenly">
		<div className="flex items-center">
		<input
        	type="text"
        	placeholder="Search..."
        	value={searchText}
       	 	onChange={handleSearch}
			className="h-11 rounded-md px-3" style={{width:"300px"}}
      	/>
		<button type="submit" className=" mx-5 bg-yellow-500 hover:shadow-md text-white font-bold py-2 px-4 rounded">Search</button>
		</div>
		<div className="flex justify-evenly items-center" >
					<span className="text-white text-lg mr-5">Filter:</span>
					<Select
                        name="role"
                        className="react-select w-full rounded-md"
                        classNamePrefix="select"
						placeholder="Filter by Role"
                        options={[
                          { value: {selectedRole}, label: "Admin" },
                          { value: {selectedRole}, label: "Staff" },
                       ]}
                        isClearable={true}
                        onChange={handleRoleChange}
                      />
					  </div>
		
		<div className="flex items-center">
                    <span className="text-white text-lg mr-3">Items per page:</span>
                    <Select
                        value={{ value: itemsPerPage, label: itemsPerPage }}
                        onChange={handleItemsPerPageChange}
                        options={[
                            { value: 5, label: 5 },
                            { value: 10, label: 10 },
                        ]}
						isClearable={false}
                        className="mx-2"
                    />
                </div>
				</div>
		<div className="flex flex-col items-center w-full mt-5">		  
		<table className="text-center overflow-hidden rounded-lg shadow-lg w-full h-auto">
        <thead>
          <tr className="bg-yellow-500 text-white">
			{rows.map((row)=>
			(
				<th className="px-4 py-2">{row.name}</th>
			))}
          </tr>
        </thead>
        <tbody className='bg-white'>
			{currentItems.map((user) => (
            <tr key={user.no} className='h-12'>
              <td className="px-4 py-2">
                {user.no}
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.email}</td>
			  <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:cursor-pointer">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </td>
            </tr>
          ))
		  }
        </tbody>
      </table>
	  <div className="flex items-center justify-center mt-3">
    	<div className="flex">
        {Array.from({ length: Math.ceil((status ? searchedData.length : userData.length) / itemsPerPage) }, (_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            >
                {index + 1}
            </button>
        ))}
    	</div>
		</div>
	  	</div>	
    </div>
    )
}
