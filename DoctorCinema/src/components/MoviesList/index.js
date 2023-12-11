import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import MoviesDetails from "../MoviesDetail";
import styles from "./styles";

const MoviesList = ({ cinemaId }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Replace 'yourTokenHere' with the actual token you've retrieved from secure storage or state
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NzZmM2IzYzQwNzkzMzZiYzAyNTI0MyIsImlhdCI6MTcwMjI5NTgzMSwiZXhwIjoxNzAyMzgyMjMxfQ.rIZnHbM_rnu04ooBCRP4jV0H50ZoR74YiPJEVH2Z4IA';
      
        const headers = {
          'Content-Type': 'application/json',
          'x-access-token': token  // Set the token in the header
        };
      
        fetch('https://api.kvikmyndir.is/movies', { method: 'GET', headers: headers })
          .then((response) => {
            if (!response.ok) {
              // If the server response was not ok, throw an error with the status
              throw new Error('Server response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            // Process your data here
            const filteredData = data.filter(movie => movie.showtimes.some(showtime => showtime.cinema.id === cinemaId));
            setData(filteredData);
            
            setLoading(false);
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Fetch error:', error.message);
            setError(error);
            setLoading(false);
          });
      }, [cinemaId, setData]); // The empty array means this effect will only run once when the component mounts
      
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    console.log(data);
    return (
      <View>
        <FlatList
            numColumns={1}
            data={data}
            renderItem={({ item }) => (
                <MoviesDetails
                    {...item}
                />
            )}
            keyExtractor={data => data.id}
        />
      </View>
    );
  };

  export default MoviesList;
  