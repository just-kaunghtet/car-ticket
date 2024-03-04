import React, { useState } from 'react';

const CarTypes = () => {
  const [carTypes, setCarTypes] = useState([
    { id: 1, name: 'Small Car', price: 500 },
    { id: 2, name: 'Medium Car', price: 1000 },
    { id: 3, name: 'Large Car', price: 2000 },
    { id: 4, name: 'Big Car', price: 3000 },
    { id: 5, name: 'Huge Car', price: 10000 },
  ]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [newCarName, setNewCarName] = useState('');
  const [newCarPrice, setNewCarPrice] = useState('');
  const [selectedCarType, setSelectedCarType] = useState(null);
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, id]);
    } else {
      
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleDeleteButtonClick = () => {
   
    const updatedCarTypes = carTypes.filter((carType) => !checkedRows.includes(carType.id));
    setCarTypes(updatedCarTypes);
    setCheckedRows([]);
  };
  const handleAddOrUpdateCarType = (event) => {
    event.preventDefault();

    // Validate that both name and price are provided
    if (!newCarName || !newCarPrice) {
      alert('Please enter both name and price.');
      return;
    }

    if (selectedCarType) {
      // If there is a selected car type, update it
      const updatedCarTypes = carTypes.map((carType) =>
        carType.id === selectedCarType.id ? { ...carType, name: newCarName, price: parseInt(newCarPrice) } : carType
      );

      setCarTypes(updatedCarTypes);
      setSelectedCarType(null); // Reset selected car type
    } else {
      // Otherwise, add a new car type entry
      const newCarType = {
        id: carTypes.length + 1, // You can use a more sophisticated ID generation logic
        name: newCarName,
        price: parseInt(newCarPrice), // Assuming the price is an integer
      };

      setCarTypes((prevCarTypes) => [...prevCarTypes, newCarType]);
    }

    setNewCarName('');
    setNewCarPrice('');
  };

  const handleEditButtonClick = (carType) => {
    // Set the selected car type for editing
    setSelectedCarType(carType);

    // Set the form fields with the details of the selected car type
    setNewCarName(carType.name);
    setNewCarPrice(String(carType.price)); // Convert to string to ensure the input field gets the correct initial value
  };
  return (
    <div className='flex gap-x-10'>
      <div>
      <table className="text-center overflow-hidden rounded-lg shadow-lg" style={{ width: "500px", height: "250px" }}>
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Number</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {carTypes.map((carType) => (
            <tr key={carType.id} className='h-12'>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(event) => handleCheckboxChange(event, carType.id)}
                  checked={checkedRows.includes(carType.id)}
                />
              </td>
              <td className="px-4 py-2">{carType.id}</td>
              <td className="px-4 py-2">{carType.name}</td>
              <td className="px-4 py-2">{carType.price}$</td>
              <td className="px-4 py-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 hover:cursor-pointer" onClick={() => handleEditButtonClick(carType)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          className="bg-yellow-500 hover:shadow-md text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
          onClick={handleDeleteButtonClick}
          disabled={checkedRows.length === 0}
        >
          Delete
        </button>
      </div>
      </div>
      <form onSubmit={handleAddOrUpdateCarType} className='flex flex-col bg-white overflow-hidden rounded-lg' style={{width:"600px",height:"300px"}}>
        <div className='w-full h-16 bg-yellow-500'>
        <h1 className='text-white font-bold p-5'>{selectedCarType ? 'Update Car Type' : 'Create Car Types'}</h1>
        </div>
        <div className="my-5 px-5 w-full flex justify-around items-center">
          <label className="mr-2 text-lg">New Car Name:</label>
          <input
            className='h-11 px-3 rounded-md'
            style={{width:"300px"}} 
            type="text"
            value={newCarName}
            placeholder='Car Name'
            onChange={(e) => setNewCarName(e.target.value)}
          />
        </div>
        <div className="my-3 px-5 w-full flex justify-around items-center">
          <label className="mr-2 text-lg">New Car Price:</label>
          <input
            className='h-11 px-3 rounded-md'
            style={{width:"300px"}} 
            type="text"
            value={newCarPrice}
            placeholder='Car Price'
            onChange={(e) => setNewCarPrice(e.target.value)}
          />
        </div>
        <div className='w-full items-start px-5'>
        <button type="submit" className="mx-5 mt-2 bg-yellow-500 hover:shadow-md text-white font-bold py-2 px-4 rounded">
        {selectedCarType ? 'Update' : 'Create'}
        </button>
        </div>
      </form>
    </div>
  );
};

export default CarTypes;
