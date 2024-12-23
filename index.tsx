import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { TextInput, Button } from 'react-native';

export default function App() {
  const [productName, setProductName] = useState('');
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState('');

  const fetchProductData = () => {
    // Ensure the correct machine IP is set here
    const url = `http://192.168.194.241:3000/product?name=${productName}`;

    fetch(url, {
      method: 'GET', // You can adjust this to POST or other methods if needed
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parsing JSON response
        } else {
          throw new Error('Product not found'); // Error handling for 4xx/5xx responses
        }
      })
      .then(data => {
        setProductData(data); // Set fetched data
        setError(''); // Clear any previous errors
      })
      .catch(err => {
        setProductData(null); // Clear data in case of error
        setError(err.message); // Show error message
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>WATER FOOTPRINT</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Type product name"
      />
      <Button color={'#003153'} title="Fetch Product Data" onPress={fetchProductData} />

      {productData && (
        <View style={styles.productInfo}>
          <Text style={styles.title}>Product: {productData.Product}</Text>
          <Text style={styles.title}>Green Water: {productData.Green}</Text>
          <Text style={styles.title}>Blue Water: {productData.Blue}</Text>
          <Text style={styles.title}>Grey Water: {productData.Grey}</Text>
          <Text style={styles.title}>Overall Water: {productData.Overall}</Text>
        </View>
      )}

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#007BA7',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#003153',
    backgroundColor: '#AEC6CF',
  },
  productInfo: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ADD8E6'

  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  title1: {
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  }
});
