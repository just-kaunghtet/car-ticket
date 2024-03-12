
import React , {useState,useEffect} from 'react';
import Select from 'react-select'
export default function AddUsers(props)
{
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
    const [passwordError, setPasswordError] = useState('');
    const [roles, setRoles] = useState([]);
    const [userData,setUserData] =useState({
        name: '',
        email: '',
        phone: '',
        role_id:'',
        password:'',
        password_confirmation:'',
      });
    const data=
    ([
        { name: "Username*" ,fieldName:"name",type:"text" },
        { name: "Email Address" ,fieldName:"email" ,type:"email" },
        { name: "Phone Number*" ,fieldName:"phone",type:"tel" },
        { name: "Password",fieldName:"password",type:"password"},
        { name: "Confirm Password" ,fieldName:"password_confirmation", type:"password"},
    ])
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
        }, [getRoles]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevInputs) => ({
          ...prevInputs,
          [name]: value,
        }));
      };
      const handleRoleChange = (selectedOption) => {
        if (selectedOption) {
          console.log(selectedOption.value)
          setUserData((prevInputs) => ({
            ...prevInputs,
            role_id : selectedOption.value,
          }));
        }
      };
      const handleClick = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.password_confirmation) 
          {
            setPasswordError('Passwords Do Not Match');
            return;
          }
          setPasswordError('');
          try {
            const response = await fetch('https://car.cbs.com.mm/api/v1/users', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${props.authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
            if (!response.ok) {
              throw new Error(`Failed to create user: ${response.status}`);
            }
            setPasswordError('User created successfully');
          } catch (error) {
            console.error('Error creating user:', error);
          }
      };
      function changeType(fieldName) {
        setPasswordVisibility((prevVisibility) => ({
          ...prevVisibility,
          [fieldName]: !prevVisibility[fieldName],
        }));
      }
    return(
        <div className='bg-white rounded-xl shadow-lg' style={{width:"600px", height:"600px"}}>
            <h1 className='flex w-full h-16 bg-yellow-500 rounded-t-xl px-10 text-lg text-white font-bold items-center'>Add New User</h1>
            <form onSubmit={handleClick}>
            <div className='flex flex-col itmes-center px-5 py-10 gap-y-6'>
                {data.map((data)=>
                    (
                      <div className='grid gap-x-5 px-11 h-11 items-center'style={{gridTemplateColumns:"1fr 300px"}}>
                        <span className='text-lg font-semibold'>{data.name}</span>
                        {data.type==="password"?
                        <div className='grid border border-gray-800 rounded-md  bg-white h-10 items-center pr-3'
                        style={{gridTemplateColumns:"1fr 16px"}}>
                        <input 
                            id="passwordfield" 
                            type={passwordVisibility[data.fieldName] ? 'text' : 'password'} 
                            name={data.fieldName} value={userData[data.fieldName]} 
                            className='h-full border-none outline-none ml-2' onChange={handleChange}
                          />
                          {passwordVisibility[data.fieldName] ?
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" 
                          strokeWidth={1.5} stroke="currentColor" 
                          className="w-4 h-4" 
                          onClick={() => changeType(data.fieldName)}>
                          <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        :
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" viewBox="0 0 24 24" 
                        strokeWidth={1.5} stroke="currentColor" 
                        className="w-4 h-4"
                        onClick={() => changeType(data.fieldName)}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg> 
                        }
                        </div>
                        : 
                        <input className='h-full rounded px-3 border-gray-600 border' 
                        value={userData[data.fieldName]} 
                        type={data.type} 
                        name={data.fieldName} 
                        onChange={handleChange}/>
                        }
                        </div>
                      ))}
                      
                    <div className='grid gap-x-5 px-11 h-11 items-center' style={{gridTemplateColumns:"1fr 300px"}}><span className='text-lg font-semibold'>Role</span>
                    <div className="card flex justify-content-center">
                    <Select
                        name="role_id"
                        className="react-select w-full h-11 rounded-md"
                        classNamePrefix="select"
                        options={roles.map(role => ({ value: role.id, label: role.name }))}
                        isClearable={false}
                        onChange={handleRoleChange}
                      />
                    </div> 
                    </div> 
                    <div className='flex '>
                    <input className='bg-yellow-500 w-28 rounded-md mx-10 h-11 font-semibold text-base hover:shadow-md hover:cursor-pointer' type='submit' name='Add'/>{passwordError && (
                      <div className='text-black text-sm mt-2'>
                        {passwordError}
                      </div>
                      )}
                    </div>
            </div>
            </form>
        </div>
    )
}
