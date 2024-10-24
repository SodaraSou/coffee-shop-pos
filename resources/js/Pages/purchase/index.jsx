export default function Index({ purchases }) {
    return (
        <div class="card card-primary">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="card-title">Group Table</h3>
                    <div class="row">
                        <div class="col-12">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Search Group"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table id="example2" class="table table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Measure</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases &&
                            purchases.map((purchase, index) => (
                                <tr key={index}>
                                    <td>{purchase.id}</td>
                                    <td>{purchase.name}</td>
                                    <td>{purchase.measure}</td>
                                    <td>{purchase.total_price}</td>
                                    <td></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
