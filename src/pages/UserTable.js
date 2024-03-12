import React,{useState,useEffect} from "react";
import Select from 'react-select'
import UpdateUser from "./UpdateUser";
export default function UserTable(props)
{
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [userData,setUserData]=useState([])
	const [searchedData,setSearchedData] =useState([])
	const [status,setStatus] =useState(false)
	const [searchText, setSearchText] = useState('');
	const [updateData,setUpdateData] =useState([]);
	const [roles, setRoles] = useState([]);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = status ? searchedData.slice(indexOfFirstItem, indexOfLastItem) : userData.slice(indexOfFirstItem, indexOfLastItem);
	
	const rows=[
		{ name: "No" },
		{ name: "အမည်" },
		{ name: "ဖုန်းနံပါတ်"},
		{ name: "အီးမေးလ်"  },
		{ name: "ရာထူး" },
		{ name: ""  },
	  ]
	
	const getRoles = async () => {
          try {
            const response = await fetch('https://car.cbs.com.mm/api/v1/roles', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${props.authToken}` ,
                'Accept': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error(`Failed to get roles: ${response.status}`);
            }
      
            const rolesData = await response.json();
            setRoles(rolesData.data);
          } catch (error) {
            console.error('Error getting roles:', error);
          }
        };
	const fetchData = async () => {
		try {
		  const response = await fetch('https://car.cbs.com.mm/api/v1/users', {
			method: 'GET',
			headers: {
			  'Authorization': `Bearer ${props.authToken}` ,
			  'Accept': 'application/json'
			}
		  });
  
		  if (!response.ok) {
			throw new Error('Failed to fetch user data');
		  }
		  const data = await response.json();
		  setUserData(data.data);
		  setSearchedData(data.data);
		  setStatus(true);
		  setCurrentPage(data.meta.current_page);
		  setItemsPerPage(data.meta.per_page)
		} catch (error) {
		  console.error('Error fetching user data:', error);
		}
	  };
	useEffect(() => {
		fetchData();
		getRoles();
	},[]);

	const handleSearch = (e) => {
		const searchText = e.target.value.toLowerCase();
		setSearchText(searchText);
		setSearchedData(userData.filter(
			(user) =>
			  user.name.includes(searchText) ||
			  user.phone.includes(searchText) ||
			  user.email.includes(searchText)
		  )
		);
		setStatus(true)
	  };
 
	  const handleRoleChange = (selectedOption) => {
		setSearchedData(
		  selectedOption
			? userData.filter((user) => user.role === selectedOption.label)
			: userData
		);
		setStatus(true)
	  };

	
    const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	const handleItemsPerPageChange = (selectedOption) => {
        setItemsPerPage(selectedOption.value);
        setCurrentPage(1);
    };
	const handleDeleteUser = async (userId) => {
		try {
		  const response = await fetch(`https://car.cbs.com.mm/api/v1/users/${userId}`, {
			method: 'DELETE',
			headers: {
			  'Authorization': `Bearer ${props.authToken}`,
			  'Accept': 'application/json',
			},
		  });
	
		  if (!response.ok) {
			throw new Error(`Failed to delete user: ${response.status}`);
		  }
		  console.log('User deleted successfully');
		  fetchData();
	
		} catch (error) {
		  console.error('Error deleting user:', error);
		}
	  };
	  const handleEditUser =  (userId) => {
		const userToUpdate = userData.find((user) => user.id === userId);
		console.log(userToUpdate)
		setUpdateData(userToUpdate);
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
			className="h-11 rounded-md px-3 border" style={{width:"300px"}}
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
                        options={roles.map(role => ({ value: role.id, label: role.name }))}
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
            <tr key={user.id} className='h-12'>
              <td className="px-4 py-2">
                {user.id}
              </td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.email}</td>
			  <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2 items-center">
				<div className="flex justify-evenly items-center">				
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer" onClick={()=> handleEditUser(user.id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 hover:cursor-pointer" onClick={() => handleDeleteUser(user.id)}>
  					<path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
				</svg>
				</div>
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
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : 'bg-white hover:bg-gray-200'}`}
            >
                {index + 1}
            </button>
        ))}
    	</div>
		</div>
	  	</div>
		  <UpdateUser 
			name={updateData.name}
			email={updateData.email}
			phone={updateData.phone}
			role_id={updateData.role}
			authToken={props.authToken}
		/>	
    </div>
    )
}
