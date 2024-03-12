import React, { useState, useEffect } from 'react';
const CarTypes = (props) => {
  const [carTypes, setCarTypes] = useState([]);
  const [checkedRows, setCheckedRows] = useState([]);
  const [newCarType, setNewCarName] = useState('');
  const [newCarPrice, setNewCarPrice] = useState('');
  const [selectedCarType, setSelectedCarType] = useState(null);
  const fetchCarTypes = async () => {
    try {
      const response = await fetch('https://car.cbs.com.mm/api/v1/car-types', 
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${props.authToken}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch car types. Server responded with ${response.status}: ${errorMessage}`);
      }
      const data = await response.json();
      setCarTypes(data.data);
      //console.log(data);
    } catch (error) {
      console.error('Error fetching car types:', error);
    }
  };
  useEffect(() => {
    fetchCarTypes();
  }, []);
  
  const handleDeleteCarType = async (id) => {
    const apiUrl = `https://car.cbs.com.mm/api/v1/car-types/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${props.authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete car type. Server responded with ${response.status}`);
      }
      console.log(`Car type with id ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting car type:', error);
    }
  };

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, id]);
    } else {
      
      setCheckedRows((prevCheckedRows) => prevCheckedRows.filter((rowId) => rowId !== id));
    }
  };
  const handleDeleteButtonClick = async () => {
    try {
      for (const id of checkedRows) {
        await handleDeleteCarType(id);
      }
      console.log('Selected car types deleted successfully');
      fetchCarTypes();
      setCheckedRows([]);
    } catch (error) {
      console.error('Error deleting car types:', error);
    }
  };
  const handleAddOrUpdateCarType = async (event) => {
    event.preventDefault();
    if (!newCarType || !newCarPrice) {
      alert('Please enter both name and price.');
      return;
    }

    const apiUrl = 'https://car.cbs.com.mm/api/v1/car-types';
    const authHeader = {
      Accept: 'application/json',
      Authorization: `Bearer ${props.authToken}` ,
    };

  
    try {
      const carTypeData = {
        type: newCarType,
        price: newCarPrice.toString(),
      };
      if (selectedCarType) {
        console.log(selectedCarType)
        const updateUrl = `${apiUrl}/${selectedCarType.id}`;
        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            ...authHeader,
            'Content-Type': 'application/json',
          },
          body:  JSON.stringify(carTypeData),
        });
        if (!updateResponse.ok) {
          throw new Error(`Failed to update car type. Server responded with ${updateResponse.status}`);
        }
      } else {
       
        const response = await fetch('https://car.cbs.com.mm/api/v1/car-types', 
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            ...authHeader,
          },
          body: JSON.stringify(carTypeData)
        });
        console.log(JSON.stringify(carTypeData))
        if (!response.ok) {
          throw new Error(`Failed to create car type. Server responded with ${response.status}`);
        }
      }
      fetchCarTypes();
      setNewCarName('');
      setNewCarPrice('');
      setSelectedCarType(null);
    } catch (error) {
      console.error('Error updating/creating car type:', error);
    }
  };

  const handleEditButtonClick = (carType) => {
    
    setSelectedCarType(carType);
    setNewCarName(carType.name);
    setNewCarPrice(String(carType.price)); 
  };
  return (
    <div className='flex gap-x-10'>
      <div>
      <div className="mb-4">
        <button
          className="bg-yellow-500 hover:shadow-md text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
          onClick={handleDeleteButtonClick}
          disabled={checkedRows.length === 0}
        >
          Delete
        </button>
      </div>
      <table className="text-center overflow-hidden rounded-lg shadow-lg h-auto" style={{ width: "500px"}}>
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
              <td className="px-4 py-2">{carType.type}</td>
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

      
      </div>
      <form onSubmit={handleAddOrUpdateCarType} className='flex flex-col bg-white shadow-lg overflow-hidden rounded-lg' style={{width:"600px",height:"300px"}}>
        <div className='w-full h-16 bg-yellow-500'>
        <h1 className='text-white font-bold p-5'>{selectedCarType ? 'Update Car Type' : 'Create Car Types'}</h1>
        </div>
        <div className="my-5 px-5 w-full flex justify-around items-center">
          <label className="mr-2 text-lg">New Car Name:</label>
          <input
            className='h-11 px-3 rounded-md border'
            style={{width:"300px"}} 
            type="text"
            value={newCarType}
            placeholder='Car Name'
            onChange={(e) => setNewCarName(e.target.value)}
          />
        </div>
        <div className="my-3 px-5 w-full flex justify-around items-center">
          <label className="mr-2 text-lg">New Car Price:</label>
          <input
            className='h-11 px-3 rounded-md border'
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
