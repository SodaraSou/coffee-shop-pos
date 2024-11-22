
import { Card, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default function Stock({ stocks }) {

    const [products, setProducts] = useState(null);


    useEffect(() => {
        // Fetch the JSON data from the public folder
        fetch("/data/consumeRate.json")
            .then((response) => response.json())  // Parse the JSON
            .then((jsonData) => setProducts(jsonData['coffee'])) // Set the data to state
            .catch((error) => console.error("Error fetching data:", error)); // Handle any errors
    }, []);

    // console.log(stocks.allIngrediants);
    // Create an object to store cumulative quantities of each ingredient
    const ingredientTotals = {};


    // Iterate through stocks.allIngrediants
    for (let i = 0; i < stocks.allIngrediants.length; i++) {
        for (let j = 0; j < stocks.allIngrediants[i].length; j++) {
            const ingredient = stocks.allIngrediants[i][j];
            const ingredientName = ingredient.name.toUpperCase();
            const quantity = parseFloat(ingredient.quantity) || 0;
            // Sum the quantities of duplicate ingredients
            if (ingredientTotals[ingredientName]) {
                ingredientTotals[ingredientName] += quantity;
            } else {
                ingredientTotals[ingredientName] = quantity;
            }
        }
    }

    // Array to store JSX for displaying ingredients
    const allIngrediants = [];


    // Process the summed quantities and generate total resources
    for (const [name, totalQuantity] of Object.entries(ingredientTotals)) {
        // Display each ingredient only once
        allIngrediants.push(
            <Card.Text className='my-0'>
                {name} <b style={{ fontSize: '1.3rem' }} className='text-danger'>
                    {Math.floor(totalQuantity)}
                </b> boxes
            </Card.Text>
        );

        // Calculate total resources based on ingredient type
        switch (name) {
            case "COFFEE-POWDER": {
                totalCoffee = totalQuantity * 31 * 30;
                break;
            }
            case "MILK": {
                totalMilk = totalQuantity * 250;
                break;
            }
            case "GLASS": {
                totalGlass = totalQuantity * 50;
                break;
            }
            case "WATER": {
                totalWater = totalQuantity * 120 * 50;
                break;
            }
        }
    }

    var totalMilk;
    var totalCoffee;
    var totalWater;
    var totalGlass;


    var totalSpendMilk = 0;
    var totalSpendCoffee = 0;
    var totalSpendWater = 0;
    var totalSpendGlass = 0;

    if (products != null) {
        // console.log(products);

        Object.keys(stocks.productRecords).forEach(key => {

            for (var j = 0; j < products.length; j++) {
                if (stocks.productRecords[key].product_id == products[j].product_id) {

                    totalSpendMilk = totalSpendMilk + stocks.productRecords[key].quantity * parseFloat(products[j].milk);
                    totalSpendCoffee = totalSpendCoffee + stocks.productRecords[key].quantity * parseFloat(products[j].coffee);
                    totalSpendWater = totalSpendWater + stocks.productRecords[key].quantity * parseFloat(products[j].water);
                    totalSpendGlass = totalSpendGlass + stocks.productRecords[key].quantity * parseFloat(products[j].glass);

                }
            }

        });
    }

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

    // Pie chart data
    var data = {
        labels: ["Milk", "Available"], // Labels for the Pie chart
        datasets: [
            {
                data: [totalSpendMilk, totalMilk - totalSpendMilk], // Quantity and remaining sales
                backgroundColor: ['#FF6347', '#32CD32'], // Colors for the slices
                hoverOffset: 4,
            },
        ],
    };
    const MilkPie = <div className="d-flex justify-content-center w-75">
        <Pie data={data} options={options} width={100} height={100} />
    </div>;

    var data = {
        labels: ["Coffee", "Available"], // Labels for the Pie chart
        datasets: [
            {
                data: [totalSpendCoffee, totalCoffee - totalSpendCoffee], // Quantity and remaining sales
                backgroundColor: ['#FF6347', '#32CD32'], // Colors for the slices
                hoverOffset: 4,
            },
        ],
    };
    const CoffeePie = <div className="d-flex justify-content-center w-75">
        <Pie data={data} options={options} width={100} height={100} />
    </div>;

    var data = {
        labels: ["Glass", "Available"], // Labels for the Pie chart
        datasets: [
            {
                data: [totalSpendGlass, totalGlass - totalSpendGlass], // Quantity and remaining sales
                backgroundColor: ['#FF6347', '#32CD32'], // Colors for the slices
                hoverOffset: 4,
            },
        ],
    };
    const GlassPie = <div className="d-flex justify-content-center w-75">
        <Pie data={data} options={options} width={100} height={100} />
    </div>;

    var data = {
        labels: ["Water", "Available"], // Labels for the Pie chart
        datasets: [
            {
                data: [totalSpendWater, totalWater - totalSpendWater], // Quantity and remaining sales
                backgroundColor: ['#FF6347', '#32CD32'], // Colors for the slices
                hoverOffset: 4,
            },
        ],
    };
    const WaterPie = <div className="d-flex justify-content-center w-75">
        <Pie data={data} options={options} width={100} height={100} />
    </div>;

    var remainMilk = totalMilk - totalSpendMilk;
    var remainCoffee = totalCoffee - totalSpendCoffee;
    var remainGlass = totalGlass - totalSpendGlass;
    var remainWater = totalWater - totalSpendWater;


    const calculateCups = (remaining, productRequirement) => {
        const milkCups = productRequirement.milk > 0
            ? Math.floor(remaining.milk / productRequirement.milk)
            : Infinity;
        const coffeeCups = Math.floor(remaining.coffee / productRequirement.coffee);
        const glassCups = Math.floor(remaining.glass / productRequirement.glass);
        const waterCups = Math.floor(remaining.water / productRequirement.water);

        // Minimum of all resource-based cups
        return Math.min(milkCups, coffeeCups, glassCups, waterCups);
    };
    var results=[]
    console.log(products);
    if (products != null) {
        results = products.map(product => {
            const cups = calculateCups(
                {
                    milk: remainMilk,
                    coffee: remainCoffee,
                    glass: remainGlass,
                    water: remainWater
                },
                {
                    milk: parseInt(product.milk),
                    coffee: parseInt(product.coffee),
                    glass: parseInt(product.glass),
                    water: parseInt(product.water)
                }
            );


            return {
                product_id: product.product_id,
                product_image: product.product_image,
                cups: cups
            };
        });

    }







    return (
        <div className="container-fluid">
            <h1 className="my-4">Stock Report (3 Months)</h1>
            <Row>
                <Col sm={12} md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4 fs-2" style={{ fontSize: '2.0rem' }}>Stock-Details</Card.Title>
                            {allIngrediants}
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="mb-4 fs-2" style={{ fontSize: '2.0rem' }}>Total-Purchase</Card.Title>
                            <Card.Text className='my-0 text-right'>US <b style={{ fontSize: '1.3rem' }} className='text-danger'> {stocks.totalSpend}</b> $</Card.Text>
                            <Card.Text className='my-0 text-right'>KH <b style={{ fontSize: '1.3rem' }} className='text-danger'> {stocks.totalSpend * 4100}</b> ៛</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h1 className="my-4">Stock Used-Estimation</h1>
            <Row>
                <Col sm={12} md={3}>
                    {MilkPie}
                </Col>
                <Col sm={12} md={3}>
                    {CoffeePie}
                </Col>
                <Col sm={12} md={3}>
                    {GlassPie}
                </Col>
                <Col sm={12} md={3}>
                    {WaterPie}
                </Col>
            </Row>

            <h1 className="my-4">Product Available-Estimation</h1>
            <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product ID</th>
                        <th>Still-Sellable Cups</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result) => (
                        <tr key={result.product_id}>
                            <td>{result.product_id}</td>
                            <td>
                                <img
                                    src={result.product_image}
                                    alt={`Product ${result.product_id}`}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{result.cups} cups</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        </div>
    );

}