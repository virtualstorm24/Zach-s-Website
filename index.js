console.log("Intro.js loaded successfully!");
let header = document.querySelector('#intro');
let aim = [
    { t: "{ }", ms: 500 },
    { t: "{_}", ms: 500 },
    { t: "{ }", ms: 500 },
    { t: "{_}", ms: 300 },
    { t: "{Z_}", ms: 300 },
    { t: "{ZA_}", ms: 300 },
    { t: "{ZAC_}", ms: 300 },
    { t: "{ZACH_}", ms: 300 },
    { t: "{ZACH_}", ms: 400 },
    { t: "{ZACH_B_}", ms: 300 },
    { t: "{ZACH_BU_}", ms: 300 },
    { t: "{ZACH_BUS_}", ms: 300 },
    { t: "{ZACH_BUSK_}", ms: 300 },
    { t: "{ZACH_BUSKE_}", ms: 300 },
    { t: "{ZACH_BUSKEY_}", ms: 300 },
    { t: "{ZACH_BUSKEY}", ms: 400 },
    { t: "{ZACH_BUSKEY_}", ms: 500 },
    { t: "{ZACH_BUSKEY}", ms: 600 }
];

let i = 0;
let stepDenominator = window.localStorage.stepDenominator ?? 1;

const update = () => {
    const step = aim[i];
    header.innerText = step.t;
    i++;

    if (i < aim.length) {
        setTimeout(update, step.ms / stepDenominator);
    } else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
};

update();

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

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

/*

let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator
let i = 0;
let update = () => {
    let step = aim[i];
    header.innerText = step.t;
    i++;


    if (i < aim.length)
    setTimeout(update, step.ms / stepDenominator);
else {
    header.classList.add('top');
    setTimeout(() => {
        document.getElementById('main').style.opacity = 1;
        initGlobe();
    }, 500);
    window.localStorage.stepDenominator = 2;
}
}
update();

/*
else {
    header.classList.add('top');
    setTimeout(() => {
        document.getElementById('main').style.opacity = 1;
        initGlobe();
    }, 500);
    window.localStorage.stepDenominator = 2;
}
*/
