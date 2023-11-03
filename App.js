import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const [error, setError] = useState(null);

  const apiKey = '97d3451171604c322368b124dea692f5';

  const handleCityInputChange = (city) => {
    setCityInput(city);
  };

  const handleSearch = () => {
    if (cityInput) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          const temperatureCelsius = (data.main.temp - 273.15).toFixed(2);
          data.main.temp = temperatureCelsius;
          setWeatherData(data);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setWeatherData(null);
        });
    }
  };

  const backgroundColor = weatherData && weatherData.weather[0].main === 'Clear' ? 'skyblue' : 'lightgray';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.heading}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityInput}
        onChangeText={(text) => handleCityInputChange(text)}
      />
      <Button title="Get Weather" onPress={handleSearch} />

      {error && <Text style={styles.error}>Error: {error.message}</Text>}

      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text>Weather for {weatherData.name}</Text>
          <Icon name="sun-o" size={40} color="orange" />
          <Text>Temperature: {weatherData.main.temp} {unit === 'Celsius' ? '°C' : '°F'}</Text>
          <Text>Humidity: {weatherData.main.humidity}%</Text>
          <Text>Description: {weatherData.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  heading: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius:24
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default WeatherApp;
