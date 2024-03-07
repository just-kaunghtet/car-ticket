import React, { useState } from 'react';
export default function GeneralSetting()
{
  const [formData, setFormData] = useState({
    name: '',
    emailaddress: '',
    photo: '',
  });
  const [img,setImg]=useState(null);
  const [imgname,setImgname]=useState("");
  const infos=[
    { name: 'System Name', placeholder: 'Kyauk Taw Gyi' ,fieldName: "name",type:"text" },
    { name: 'Email Address', placeholder: 'kyauktawgyi@gmail.com' ,fieldName: "emailaddress", type: "email"},
    { name: 'System Logo', placeholder: 'photo.jpg' ,fieldName: "photo" ,type:"text"},
]
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const { name } = e.target;
    console.log(name)
    const reader = new FileReader(),
      files = e.target.files;
      reader.onload = function () {
        setImg(reader.result)
    };
    reader.readAsDataURL(files[0]);
    setImgname(files[0].name)
    setFormData((prevInputs) => ({
      ...prevInputs,
    [ name ]: imgname ,}));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
    {info.fieldName === "photo" ? (
      <div className='col-span-2 flex items-center justify-start gap-x-2'>
        <input
          className='bg-white border border-none outline-none h-11 rounded-md px-2 text-sm font-medium hover:cursor-pointer'
          style={{ width: "300px" }}
          type={info.type}
          name={info.fieldName}
          placeholder={imgname}
          readOnly
        />
        <label className='bg-yellow-500 h-10 text-sm font-medium w-auto px-5 flex items-center justify-center rounded-md hover:cursor-pointer hover:shadow-lg'>Browse
          <input
            type="file"
            id="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
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
          <span></span>{img ? <img src={img} alt="Profile" className='w-60 h-auto'/> :<span className='w-60 h-40 bg-gray-300'></span>}<span></span>
        </div>
        <div className='flex flex-col pl-32 gap-y-5 h-auto' style={{width:"466px"}}>
        <input type='submit' name='Update' className='bg-yellow-500 h-10 w-1/3 rounded-md text-sm font-medium shadow-md hover:cursor-pointer'/>
        </div>
      </form>
    </div>
  )
}


