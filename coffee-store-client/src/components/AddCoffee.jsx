import Swal from 'sweetalert2';

const AddCoffee = () => {

    const handleAddCoffee = e => {
        e.preventDefault();
        const form = e.target;

        const name = form.name.value;
        const supplier = form.supplier.value;
        const chef = form.chef.value;
        const category = form.category.value;
        const details = form.details.value;
        const taste = form.taste.value;
        const photo = form.photo.value;

        const newCoffee = { name, supplier, chef, category, details, taste, photo };

        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, 'from addCoffee fetch');
                if (data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your coffee has been added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })

    }
    
    return (
        <div className="bg-[#f5e2] p-24">
            <h2 className="text-center text-amber-800 text-3xl font-semibold mb-8">Add a New Coffee here</h2>
            <form onSubmit={handleAddCoffee} className="">
                {/* form row */}
                <div className="md:flex gap-4">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="name" placeholder="Enter coffee name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="supplier" placeholder="Enter supplier name" className="input input-bordered w-full" />
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
                            <input type="text" name="chef" placeholder="Enter Chef name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="taste" placeholder="Enter coffee taste" className="input input-bordered w-full" />
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
                            <input type="text" name="category" placeholder="Enter coffee category" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="details" placeholder="Enter coffee details" className="input input-bordered w-full" />
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
                            <input type="text" name="photo" placeholder="Enter photo URL" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                {/* form row */}
                <div className="mt-4">
                    <div className="form-control md:w-full">
                        <label className="input-group">
                            <input type="submit" value='Add Coffee' className="btn w-full" />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCoffee;