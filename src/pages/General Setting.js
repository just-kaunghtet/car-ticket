import React, { useState } from 'react';
export default function GeneralSetting()
{
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [status,setStatus]=useState(false)
  const [formData, setFormData] = useState({
    name: '',
    emailaddress: '',
    photo: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword:'',
  });
  const [passwordError, setPasswordError] = useState('');
  const infos=[
    { name: 'Name', placeholder: 'Kyauk Taw Gyi' ,fieldName: "name",type:"text" },
    { name: 'Email Address', placeholder: 'kyauktawgyi@gmail.com' ,fieldName: "emailaddress", type: "email"},
    { name: 'Photo', placeholder: 'photo.jpg' ,fieldName: "photobox" ,type:"text"},
]
  const passwords=[
    { name: "Old Password"  , fieldName:"oldPassword"},
    { name: "New Password"  , fieldName:"newPassword" },
    { name: "Confirm Password" , fieldName:"confirmPassword" },
  ]
  function handleClick()
  {
    setStatus(!status);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  function changeType(fieldName) {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [fieldName]: !prevVisibility[fieldName],
    }));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
      const hardcodedOldPassword = 'oldpassword';
      if (formData.oldPassword && formData.oldPassword !== hardcodedOldPassword && formData.newPassword === formData.confirmPassword) {
        setPasswordError('Old password is invalid.');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword && formData.oldPassword === hardcodedOldPassword) {
        setPasswordError('New and Confirm passwords do not match.');
        return;
      }
      if (formData.oldPassword !== hardcodedOldPassword && formData.newPassword !== formData.confirmPassword ) 
      {
        setPasswordError('Old password is invalid and New and Confirm passwords do not match.');
        return;
      }
      setPasswordError('');
      console.log(formData);
  };
  
  return(
    <div className='flex flex-col h-screen gap-y-8 pt-5' style={{width:"538px"}}>
      <h1 className=' text-2xl font-bold'>General Setting</h1>
      <form className='flex flex-col gap-y-4 w-full h-full' onSubmit={handleSubmit}>
            {infos.map((info) => (
    <div className='grid gap-x-2 items-center w-full' style={{ gridTemplateColumns: "120px 300px 1fr" }}>
    <span className='text-base font-medium'>
      {info.name}
    </span>
    {info.fieldName === "photobox" ? (
      <div className='col-span-2 flex items-center justify-start gap-x-2'>
        <input
          className='bg-white border border-none outline-none h-11 rounded-md px-2 text-sm font-medium hover:cursor-pointer'
          style={{ width: "300px" }}
          type={info.type}
          name={info.fieldName}
          placeholder={formData.photo === "" ? info.placeholder : formData.photo}
          readOnly
        />
        <label className='bg-yellow-500 h-10 text-sm font-medium w-auto px-5 flex items-center justify-center rounded-md hover:cursor-pointer hover:shadow-lg'>Browse
          <input
            type="file"
            id="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            value={formData.photo}
            style={{ display: "none" }}
          />
        </label>
      </div>
    ) : info.fieldName === "emailaddress" ? (
      <input
        className='bg-white borderborder-none outline-none h-11 rounded-md px-2 text-sm font-medium'
        type={info.type}
        name={info.fieldName}
        value={formData[info.fieldName]}
        placeholder={info.placeholder}
        onChange={handleChange}
        pattern="[a-zA-Z0-9._%+-]+@somemail\.com"
        required
      />
    ) : (
      <input
        className='bg-white border-none outline-none h-11 rounded-md px-2 text-sm font-medium'
        type={info.type}
        name={info.fieldName}
        value={formData[info.fieldName]}
        placeholder={info.placeholder}
        onChange={handleChange}
      />
    )}
  </div>
    ))}
        <div className='grid w-auto h-auto gap-x-2' style={{gridTemplateColumns:"120px 300px 1fr"}}>
          <span></span><span className='w-60 h-40 bg-gray-300'></span><span></span>
        </div>
        <div className='flex flex-col gap-y-5 h-auto' style={{width:"466px"}}>
        <div className='bg-yellow-500 h-10 text-sm font-medium w-full text-left px-5 mt-5 flex items-center justify-between rounded-md shadow-md' onClick={handleClick}>Change Password
              {status?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
                :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg> 
              }
        </div>
        { status ? 
          <div className='flex flex-col gap-y-5'>
            {passwords.map((password)=>(
            <div className='grid items-center' style={{gridTemplateColumns:"1fr 300px"}}><h2>{password.name}</h2>
            <div className='grid border border-gray-800 rounded-md  bg-white h-10 items-center pr-3'style={{gridTemplateColumns:"1fr 16px"}}>
              <input 
                id={`pwField-${password.fieldName}`} 
                type={passwordVisibility[password.fieldName] ? 'text' : 'password'} 
                name={password.fieldName} value={formData[password.fieldName]} 
                className='h-full border-none outline-none ml-2' onChange={handleChange}
                />
              {passwordVisibility[password.fieldName] ?
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" 
                strokeWidth={1.5} stroke="currentColor" 
                className="w-4 h-4" 
                onClick={() => changeType(password.fieldName)}>
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
              onClick={() => changeType(password.fieldName)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg> 
              }
            </div>
            </div>
            ))}
            {passwordError && (
                  <div className='text-black text-sm mt-2'>
                        {passwordError}
                  </div>
              
              )}
            <input type='submit' className='bg-yellow-500 h-10 w-24 rounded-md text-sm text-center font-medium shadow-md' name='Save'/>
          </div>
          :
          ""}
        <input type='submit' name='Update' className='bg-yellow-500 h-10 w-1/3 rounded-md text-sm font-medium shadow-md hover:cursor-pointer'/>
        </div>
      </form>
    </div>
  )
}


