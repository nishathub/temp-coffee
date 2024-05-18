import { Link } from "react-router-dom";


const CoffeeCard = ({ coffee, handleDeleteCoffee, handleUpdateCoffee }) => {

    const { name, supplier, chef, category, details, taste, photo, _id } = coffee;

    return (
        <div>
            <div className="card card-side bg-base-200 shadow-xl m-8">
                <figure><img src={photo} /></figure>
                <div className="flex justify-between items-center w-full px-6">
                    <div>
                        <h2 className="">Name : {name}</h2>
                        <h2 className="">Chef : {chef}</h2>
                        <h2 className="">Taste : {taste}</h2>
                    </div>

                    <div className="card-actions justify-end">
                        <div className="join join-vertical gap-2">
                            <button className="btn btn-info w-full">View</button>
                            <Link to={`/updateCoffee/${_id}`}><button className="btn btn-primary w-full">Edit</button></Link>
                            <button onClick={()=> handleDeleteCoffee(_id)} className="btn btn-error w-full">X</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;