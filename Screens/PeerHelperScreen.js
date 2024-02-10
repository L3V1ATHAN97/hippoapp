import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PeerHelpersPage = () => {
  const [peerHelpers, setPeerHelpers] = useState([]);

  useEffect(() => {
    // Function to fetch data from peerHelpersData.json
    const fetchData = async () => {
      try {
        const response = require('../Data/peerHelpersData.json');
        const data = await response;
        setPeerHelpers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peer Helpers</Text>
      <FlatList
        data={peerHelpers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.peerHelperCard}>
            <Text style={styles.peerHelperName}>{item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Likes: {item.likes.join(', ')}</Text>
            <Text>Grade: {item.grade}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Orientation: {item.orientation}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  peerHelperCard: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  peerHelperName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default PeerHelpersPage;