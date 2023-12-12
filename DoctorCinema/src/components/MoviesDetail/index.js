import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const MoviesDetails = ({
    id,
    title,
    poster,
    plot,
    durationMinutes,
    year,
    genres,
    
}) => {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigate("MovieInfo", {
                    id: id,
                    title: title,
                    poster: poster,
                    plot: plot,
                    durationMinutes: durationMinutes,
                    year: year,
                    genres: genres,
                });
            }}
            >
            <View
                style={styles.container}>
                <Image style={styles.img} source={{uri: poster}}></Image>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{year}</Text>
                <View>
                    {genres.map((genre, index) => (
                        <Text key={index} style={styles.genreText}>
                            {genre.Name}
                        </Text>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default MoviesDetails;
