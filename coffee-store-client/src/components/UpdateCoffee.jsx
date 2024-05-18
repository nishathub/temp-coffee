import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const UpdateCoffee = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const oldCoffeeData = useLoaderData();
    const { name, supplier, chef, category, details, taste, photo } = oldCoffeeData;

    const handleUpdateCoffee = (e) => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const supplier = form.supplier.value;
        const chef = form.chef.value;
        const category = form.category.value;
        const details = form.details.value;
        const taste = form.taste.value;
        const photo = form.photo.value;

        const updatedCoffee = { name, supplier, chef, category, details, taste, photo };

        fetch(`http://localhost:5000/coffee/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'from updateCoffee fetch');
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your coffee has been updated",
                        showConfirmButton: true,
                        timer: 1500
                    });

                    
                } else if( data.upsertedCount > 0){
                    Swal.fire({
                        position: "top-end",
                        icon: "failure",
                        title: "Coffee Upserted as a New Data",
                        showConfirmButton: true,
                        timer: 1500
                    });
                }
                // get back to interface after 2 seconds
                setTimeout( () => {navigate('/')} , 2000); 
            })
    }
    return (
        <div>
            <h2 className="text-center text-amber-800 text-3xl">Update Coffee here</h2>

            <div>
                <div className="bg-[#f5e2] p-24">
                    <form onSubmit={handleUpdateCoffee} className="">
                        {/* form row */}
                        <div className="md:flex gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Coffee Name</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="name" defaultValue={name && name} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Supplier</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="supplier" defaultValue={supplier && supplier} className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="md:flex gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Chef</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="chef" defaultValue={chef && chef} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Taste</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="taste" defaultValue={taste && taste} className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="md:flex gap-4">
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="category" defaultValue={category && category} className="input input-bordered w-full" />
                                </label>
                            </div>
                            <div className="form-control md:w-1/2">
                                <label className="label">
                                    <span className="label-text">Details</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="details" defaultValue={details && details} className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="">
                            <div className="form-control md:w-full">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <label className="input-group">
                                    <input type="text" name="photo" defaultValue={photo && photo} className="input input-bordered w-full" />
                                </label>
                            </div>
                        </div>
                        {/* form row */}
                        <div className="mt-4">
                            <div className="form-control md:w-full">
                                <label className="input-group">
                                    <input type="submit" value='Update Coffee' className="btn w-full" />
                                </label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCoffee;