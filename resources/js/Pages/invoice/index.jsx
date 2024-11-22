import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function InvoiceTable({ invoices }) {
    const handleDelete = (invoiceId) => {
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
                router.delete(`/invoice/${invoiceId}`);
                Swal.fire({
                    title: "Deleted!",
                    text: "Invoice has been deleted.",
                    icon: "success",
                });
            }
        });
    };

    return (
        <div className="card card-primary">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="card-title">Invoice Table</h3>
                    <div className="row">
                        <div className="col-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Invoice"
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
                            <th>Total Price</th>
                            <th>Discount</th>
                            <th>User ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices &&
                            invoices.map((invoice, index) => (
                                <tr key={index}>
                                    <td>{invoice.id}</td>
                                    <td>${invoice.total_price}</td>
                                    <td>{invoice.discount}%</td>
                                    <td>{invoice.user_id}</td>
                                    <td>
                                        <div>
                                            <a
                                                href={`/invoice/${invoice.id}/edit`}
                                                className="btn btn-sm btn-primary"
                                            >
                                                Detail
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDelete(invoice.id)
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
