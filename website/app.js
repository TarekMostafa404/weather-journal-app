/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '8f155260d94c860f85dd5c1245283323';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate')
    .addEventListener('click', buttonHandler);

/* Function called by event listener */
function buttonHandler() {
    const zipCode = document.querySelector('#zip').value;

    if (zipCode) {
        getWebData(zipCode)
            .then(postData)
            .then(getData)
            .catch((error) => {
                console.log(error);
            })
    } else {
        alert('Enter a valid ZipCode');
    }
}

/* Function to GET Web API Data*/
async function getWebData(zipCode) {
    try {
        const mainURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
        const response = await fetch(mainURL);
        return await response.json();
    } catch (error) {
        console.log(error);
        throw "The Map not reachable :(";
    }
}

/* Function to POST data */
async function postData(request) {
    const data = {
        date: newDate,
        temp: request.main.temp,
        feelings: document.querySelector('#feelings').value,
    };

    try {
        const appRequest = await fetch('/data', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log(error);
    }
}

/* Function to GET Project Data */
async function getData() {
    try {
        const content = await fetch('/data');
        const appData = await content.json();
        document.querySelector('#date').innerHTML = `Date of today >>> ${appData.date}`;
        document.querySelector('#temp').innerHTML = `Tempreture >>> ${appData.temp}°C`;
        document.querySelector('#content').innerHTML = `I feel like >>> ${appData.feelings}`;
    } catch (error) {
        console.log(error);
    }
}