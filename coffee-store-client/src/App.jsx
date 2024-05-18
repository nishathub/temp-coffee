import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import CoffeeCard from './components/CoffeeCard';
import { useState } from 'react';

function App() {

  const coffees = useLoaderData();
  const [coffeeCollection, setCoffeeCollection] = useState(coffees);

  const handleDeleteCoffee = id => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:5000/coffee/${id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Coffee item has been deleted.",
                icon: "success"
              });
              const remainingCoffees = coffees.filter(coffee => coffee._id !== id);
              setCoffeeCollection(remainingCoffees);
            }
          })
       
      }
    });
  }


  return (
    <div>
      <h1 className="text-6xl text-orange-700 text-center">Coffee</h1>

      <div className='mt-8 text-center space-y-4'>
        {
          <h2 className='text-2xl'>Total Coffee {coffeeCollection.length}</h2>
        }
        <button className='btn btn-ghost'><Link className=' text-green-200' to={'/addCoffee'}>Add Coffee</Link></button>
        
      </div>
      <div className='max-w-6xl m-auto lg:grid lg:grid-cols-2'>
        {
          coffeeCollection.map(coffee =>
            <CoffeeCard
              key={coffee._id} coffee={coffee} handleDeleteCoffee={handleDeleteCoffee}>
            </CoffeeCard>)
        }
      </div>
    </div>
  )
}

export default App
