import React,{useState,useEffect,useCallback} from "react";
import Select from 'react-select'
function UpdateUser (props)
{
	const [updateData,setUpdateData] =useState([]);
	const [roles, setRoles] = useState([]);
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
      useEffect(() => {
		getRoles();
	},[]);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
		console.log(updateData);
      };
	  const handleRoleUpdate = (selectedOption) => {
		setUpdateData((prevInputs) => ({
            ...prevInputs,
            role : selectedOption.name,
          }));
	  };
      const handleUpdate = async () => {
		try {
		  	const response = await fetch(`https://car.cbs.com.mm/api/v1/users/${updateData.id}`, {
			method: 'PUT',
			headers: {
			  'Authorization': `Bearer ${props.authToken}`,
			  'Accept': 'application/json',
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  name: updateData.name,
			  email: updateData.email,
			  phone: updateData.phone,
			  role_id: updateData.role_id,
			}),
		  });
	  
		  if (!response.ok) {
			throw new Error(`Failed to update user: ${response.status}`);
		  }
		  console.log('User updated successfully');
		} catch (error) {
		  console.error('Error updating user:', error);
		}
	  };
      return(
            <div className="flex flex-col gap-y-3 mt-5 rounded-xl overflow-hidden shadow-lg" style={{ width: "600px", height: "450px" }}>
              <h1 className="flex w-full h-16 bg-yellow-500 px-10 text-lg text-white font-bold items-center">Edit User</h1>
              <form className="gap-y-5 flex flex-col mt-5" onSubmit={handleUpdate}>
                <div className='grid gap-x-5 px-11 h-11 items-center' style={{ gridTemplateColumns: "1fr 300px" }}>
                    <span className='text-lg font-semibold'>
                        Username*
                    </span>
                    <input
                        className='h-full rounded px-3 border-gray-600 border'
                        placeholder={props.name}
                        type="text"
                        name="name"
                        onChange={handleChange}
                        required
                      />
                </div>
                <div className='grid gap-x-5 px-11 h-11 items-center' style={{ gridTemplateColumns: "1fr 300px" }}>
                    <span className='text-lg font-semibold'>
                        Phone*
                    </span> 
                    <input
                        className='h-full rounded px-3 border-gray-600 border'
                        placeholder={props.phone}
                        type="tel"
                        name="phone"
                        onChange={handleChange}
                        required
                      />
                </div>
                <div className='grid gap-x-5 px-11 h-11 items-center' style={{ gridTemplateColumns: "1fr 300px" }}>
                    <span className='text-lg font-semibold'>
                        Email*
                    </span>
                    <input
                        className='h-full rounded px-3 border-gray-600 border'
                        placeholder={props.email}
                        type="email"
                        name="email"
                        onChange={handleChange}
                      />
                </div>
                <div className='grid gap-x-5 px-11 h-11 items-center' style={{ gridTemplateColumns: "1fr 300px" }}>
                <span className='text-lg font-semibold'>Role</span>
                <Select
                            name="role_id"
                            className="react-select w-full h-11 rounded-md"
                            classNamePrefix="select"
                            options={roles.map(role => ({ value: role.id, label: role.name }))}
                            isClearable={false}
                            onChange={handleRoleUpdate}
                        />
                </div>
                <div className="flex w-full h-11 justify-start"><input className='bg-yellow-500 w-28 rounded-md mx-10 h-11 font-semibold text-base hover:shadow-md hover:cursor-pointer' type='submit' name='Add'/></div>
              </form>
            </div>
      )
    };
export default UpdateUser;
