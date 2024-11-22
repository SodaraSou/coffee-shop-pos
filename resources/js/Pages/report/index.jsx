import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

const Index = ({ reports }) => {

    const [images, setImages] = useState(null);

    useEffect(() => {
        // Fetch the JSON data from the public folder
        fetch("/data/productImage.json")
          .then((response) => response.json())  // Parse the JSON
          .then((jsonData) => setImages(jsonData['product'])) // Set the data to state
          .catch((error) => console.error("Error fetching data:", error)); // Handle any errors
      }, []);

    const customOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Report Overview',
            },
        },
    };

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true,
          },
        },
      };


      const topSales = Object.entries(reports.productRecords)
      .sort((a, b) => b[1].quantity - a[1].quantity)
      .slice(0, 3).map(([index, item]) => {

        // Pie chart data
        const data = {
            labels: [item.product_name, "Other"], // Labels for the Pie chart
            datasets: [
                {
                    data: [item.quantity, reports.totalSales - item.quantity], // Quantity and remaining sales
                    backgroundColor: ['green', 'gray'], // Colors for the slices
                    hoverOffset: 4,
                },
            ],
        };
        // Chart options with data labels (percent or number)
        const options = {
            plugins: {
                datalabels: {
                    display: true, // Show the labels
                    color: 'white', // Label text color
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = Math.round((value / total) * 100);
                        // Format to show percentage or number
                        return `${percentage}%`; // or you can use value for number: `${value}`
                    },
                    font: {
                        weight: 'bold',
                        size: 16,
                    },
                    padding: 10, // Space between label and slice
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        };

        var image="";
        if(images!=null){
            images.map((each)=>{
                if(each["product_id"]== item.product_id){
                    image= each["product_image"];
                }
            });
        }


        return (
            <Col key={index} sm={12} md={4}>
    <Card className="mb-4 shadow-lg rounded-lg border-light">
        <Card.Body className="d-flex flex-column align-items-center text-center">
            {/* Product Image */}
            <Card.Img
                className="w-50 mb-3"
                src={image}
                alt={item.product_name}
                style={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                    maxHeight: '150px',
                    height: 'auto'
                }}
            />

            {/* Product Title */}
            <Card.Title className="mb-3 fs-4 font-weight-bold text-dark">
                {item.product_name}
            </Card.Title>

            {/* Pie Chart */}
            <div className="d-flex justify-content-center w-75">
                <Pie data={data} options={options} width={100} height={100} />
            </div>
        </Card.Body>
    </Card>
</Col>

        );
    });

    const lowSales = Object.entries(reports.productRecords)
    .sort((a, b) => b[1].quantity - a[1].quantity)
    .reverse().map(([index, item]) => {
        console.log(item);

        var image="";
        if(images!=null){
            images.map((each)=>{
                if(each["product_id"]== item.product_id){
                    image= each["product_image"];
                }
            });
        }

        return (
            <tr>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td className="text-center">
                    <img className="w-50 mb-3"
                src={image}
                alt={item.product_name}
                style={{
                    objectFit: 'cover',
                    borderRadius: '10px',
                    maxHeight: '100px',
                    height: 'auto'
                }}  />
                </td>
                <td>{item.quantity}</td>
                <td>US {item.product_price} $</td>
                <td><b>{item.product_price*item.quantity}</b> $</td>
            </tr>
        );
    });


    return (
        <div className="container-fluid">
            <h1 className="my-4">3 Months Report</h1>

            {/* Dashboard Cards */}
            <Row>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4 fs-2" style={{ fontSize: '2.0rem' }}>Total-Sale</Card.Title>
                            <Card.Text className='my-0 text-right'>US <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_salesd}</b> $</Card.Text>
                            <Card.Text className='my-0 text-right'>KH <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_salesr}</b> ៛</Card.Text>
                            <Card.Text className='my-0 text-right'>% <b style={{ fontSize: '1.3rem' }} className='text-danger'> {(reports.total_salesr / reports.total_spendsr * 100).toFixed(2)}</b></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4" style={{ fontSize: '2.0rem' }}>Total-Profit</Card.Title>
                            <Card.Text className='my-0 text-right'>US <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_profitsd}</b> $</Card.Text>
                            <Card.Text className='my-0 text-right'>KH <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_profitsr}</b> ៛</Card.Text>
                            <Card.Text className='my-0 text-right'>% <b style={{ fontSize: '1.3rem' }} className='text-danger'> {(reports.total_profitsr / reports.total_salesr * 100).toFixed(2)}</b></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4 fs-2" style={{ fontSize: '2.0rem' }}>Total-Spend</Card.Title>
                            <Card.Text className='my-0 text-right'>US <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_spendsd}</b> $</Card.Text>
                            <Card.Text className='my-0 text-right'>KH <b style={{ fontSize: '1.3rem' }} className='text-danger'> {reports.total_spendsr}</b> ៛</Card.Text>
                            <Card.Text className='my-0 text-right'>(max-budget: 250$) % <b style={{ fontSize: '1.3rem' }} className='text-danger'> {(reports.total_spendsd / 250 * 100).toFixed(2)}</b></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total-Sales</Card.Title>
                            <Line data={reports.salesData} options={customOptions} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total-Profits</Card.Title>
                            <Line data={reports.profitsData} options={customOptions} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Total-Spends</Card.Title>
                            <Line data={reports.spendsData} options={customOptions} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h1 className="my-4 ">Most-Sales Product</h1>
            <Row className='justify-content-center'>
              {topSales}
            </Row>
            <h1 className="my-4 ">Sales Records</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Product-Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Sale-Qty</th>
                        <th>Sell-Price</th>
                        <th>Total-Earn</th>
                    </tr>
                </thead>
                <tbody>
                    {lowSales}
                </tbody>
            </table>


        </div>
    );
};

export default Index;
