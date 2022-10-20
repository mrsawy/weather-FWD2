/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "53ebb985a49ce7561e63777dc4a8c54a&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);

document.getElementById(`generate`).addEventListener(`click`, performAction);

async function performAction(event) {
  try {
    // event.preventDefault();
    console.log(event);
    let textAreaValue = document.getElementById(`feelings`).value;
    let zipCode = document.getElementById(`zip`).value;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

    const response = await fetch(weatherUrl);

    const resBody = await response.json();
    const temp = resBody.main.temp;
    console.log(temp);

    //second step

    await fetch(`/weatherData`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newDate, temp, textAreaValue }),
    });

    //third step

    const responseGet = await fetch(`/weatherData`);
    console.log(responseGet);
    const finalResponse = await responseGet.json();
    document.getElementById(`date`).innerHTML = finalResponse.newDate;
    document.getElementById(`temp`).innerHTML = finalResponse.temp  + `Degrees`;
    document.getElementById(`content`).innerHTML = finalResponse.textAreaValue;
  } catch (err) {
    console.log(err);
  }
}
