const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());

// Example endpoint to read data from CSV
const jobData = [];

fs.createReadStream('9-11-Memorial-Presentation.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.Name && row.Age && row.Occupation) {
            jobData.push(row);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });

// Endpoint to handle search requests
app.route('/search')
    .options((req, res) => {
        res.sendStatus(200);
    })
    .get((req, res) => {
        res.status(200).json({ message: 'Welcome to the search endpoint!' });
    })
    .post((req, res) => {
        const query = req.body.occupation_query;
        const results = jobData.filter(job => job.Occupation.toLowerCase().includes(query.toLowerCase()));

        // Map the columns to the correct positions
        const mappedResults = results.map(({ Name, Age, 'Place of Death': PlaceOfDeath, Hometown, Occupation, ...rest }) => ({
            Name: Name,
            Age: Age,
            Hometown: Hometown,
            Occupation: Occupation,
            ...rest,
        }));

        res.json(mappedResults);
    });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
