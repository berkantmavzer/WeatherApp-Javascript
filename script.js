const form = document.getElementById('form');
const city = document.getElementById('city');
const weatherDiv = document.querySelector('.weather');
const iconDiv = document.getElementById('icon');
const temparatureDiv = document.getElementById('temperature');
const descriptionDiv = document.getElementById('description');
const detailsDiv = document.getElementById('details');

const apiKey = '742d3368c5237970da3ce14e6a1b77cf';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const cityValue = city.value.trim();
    if (cityValue) {
        getWeather(cityValue);
    }
})

async function getWeather(cityValue) {

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        const data = await response.json();
        console.log(data);

        const temparature = Math.ceil(data.main.temp);
        const icon = data.weather[0].icon;
        const details = [
            `Hissedilen: ${data.main.feels_like}`,
            `Nem Oranı: ${data.main.humidity}%`,
            `Rüzgar: ${data.wind.speed} m/s`
        ];

        iconDiv.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;
        temparatureDiv.textContent = `${temparature}°C`;

        let detailsNew = details.map((detail) => `<div>${detail}</div>`).join('');

        detailsDiv.innerHTML = detailsNew;
        descriptionDiv.textContent = '';

    } catch (error) {
        iconDiv.innerHTML = '';
        temparatureDiv.textContent = '';
        descriptionDiv.textContent = 'Lütfen geçerli bir şehir giriniz';
        detailsDiv.innerHTML = '';
    }



}