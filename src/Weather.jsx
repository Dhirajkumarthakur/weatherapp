import React, { useState } from 'react';
import './Weather.css'
import coldBg from './assets/cold.jpg'; // Path to cold.jpg
import warmBg from './assets/sun.jpg'; // Path to sun.jpg


// API configuration: This is the OpenWeatherMap API key and base URL.
const api = {
    key: "b4c08d2800c5690a35ef788ce5ec088e", // API key for authentication
    base: 'https://api.openweathermap.org/data/2.5/' // Base URL for API requests
};

// Weather Component: This is the main functional component for the weather app.
const Weather = () => {
    // State for the search query: This stores the city name entered by the user.
    const [query, SetQuery] = useState('');

    // State for weather data: This stores the weather information fetched from the API.
    const [weather, SetWeather] = useState({});

    // Search function: This is triggered when the user presses the "Enter" key.
    const search = evt => {
        if (evt.key === "Enter") {
            // Fetch weather data from the API using the city name (query).
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json()) // Convert the response to JSON format.
                .then(result => {
                    SetWeather(result); // Update the weather state with the fetched data.
                    SetQuery(''); // Clear the search input after fetching data.
                    console.log(result); // Log the result to the console for debugging.
                })
                .catch(error => {
                    console.error('Error:', error); // Log any errors that occur during the fetch.
                });
        }
    };

    // Date builder function: This formats the current date into a readable string.
    const dateBuilder = (d) => {
        // Array of months: This stores the names of all months in a year.
        let months = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];

        // Array of days: This stores the names of all days in a week.
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Get the current day of the week: This uses the getDay() method to get the day index.
        let day = days[d.getDay()];

        // Get the current date: This uses the getDate() method to get the day of the month.
        let date = d.getDate();

        // Get the current month: This uses the getMonth() method to get the month index.
        let month = months[d.getMonth()];

        // Get the current year: This uses the getFullYear() method to get the year.
        let year = d.getFullYear();

        // Return the formatted date string: This combines the day, date, month, and year.
        return `${day} ${date} ${month} ${year}`;
    };

    // Render the component: This is the JSX that defines the UI of the weather app.
    return (
        <div className="app"
            style={{
                backgroundImage: `url(${typeof weather.main !== "undefined"
                        ? weather.main.temp > 16
                            ? warmBg
                            : coldBg
                        : coldBg
                    })`,
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                transition: '0.4s ease',
            }}>
            <main>
                {/* Search box: This is the input field where the user enters the city name. */}
                <div className='search-box'>
                    <input
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={e => SetQuery(e.target.value)} // Update the query state as the user types.
                        onKeyPress={search} // Trigger the search function when the "Enter" key is pressed.
                    />
                </div>

                {/* Conditional rendering: This checks if weather data is available. */}
                {(typeof weather.main != "undefined") ? (
                    <div>
                        {/* Location box: This displays the city name and country. */}
                        <div className='location-box'>
                            <div className='location'>
                                {weather.name}, {weather.sys.country} {/* City and country from the API response. */}
                            </div>

                            {/* Date display: This shows the current date in a formatted string. */}
                            <div className='date'>
                                {dateBuilder(new Date())} {/* Call the dateBuilder function to format the date. */}
                            </div>

                            {/* Weather box: This displays the temperature and weather condition. */}
                            <div className='weather-box'>
                                {/* Temperature display: This shows the temperature in Celsius. */}
                                <div className='temp'>
                                    {Math.round(weather.main.temp)}°C {/* Round the temperature and add the °C symbol. */}
                                </div>

                                {/* Weather condition: This shows the main weather condition (e.g., Clear, Rain). */}
                                <div className='weather'>
                                    {weather.weather[0].main} {/* Weather condition from the API response. */}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Fallback message: This is shown when no weather data is available.
                    <div>Search for a city to get the weather.</div>
                )}
            </main>
        </div>
    );
};

// Export the Weather component: This makes it available for use in other parts of the app.
export default Weather;