/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '8f155260d94c860f85dd5c1245283323';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();



// Event listener to add function to existing HTML DOM element
document.querySelector('#generate')
    .addEventListener('click', generateBtnHandler);

/* Function called by event listener */
function generateBtnHandler() {
    const zipCode = document.querySelector('#zip').value;

    if (zipCode) {
        getWebData(zipCode)
            .then(postData)
            .then(getData);

    } else {
        alert('Enter a valid zip code')
    }

}
/* Function to GET Web API Data*/
async function getWebData(zipCode) {
    const requestUi = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`);
    return await requestUi.json();
}

/* Function to POST data */
async function postData(requestUi) {
    const data = {
        temp: requestUi.main.temp,
        feelings: document.querySelector('#feelings').value,
        date: newDate
    };

    const request = await fetch('http://localhost:8888/addData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

/* Function to GET Project Data */
async function getData() {
    const requestUi = await fetch('http://localhost:8888/data');
    try {
        const data = await requestUi.json();
        document.querySelector('#date').textContent = data.date;
        document.querySelector('#temp').textContent = data.temp;
        document.querySelector('#feelings').textContent = data.feelings;
    } catch (error) {
        console.log(error);
    }
}