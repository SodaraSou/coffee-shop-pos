import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Index({ products }) {
    const handleDelete = (productId) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/product/${productId}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success",
                });
            }
        });
    };
    return (
        <div className="card card-primary">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="card-title">Product Table</h3>
                    <div className="row">
                        <div className="col-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Product"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <table id="example2" className="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sell Price</th>
                            <th>Cost Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.sell_price}</td>
                                    <td>{product.cost_price}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div>
                                            <a
                                                href={`/product/${product.id}/edit`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Edit
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(product.id)
                                                }
                                                className="btn btn-sm btn-danger"
                                                type="button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
