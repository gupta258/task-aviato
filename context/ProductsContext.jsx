import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const ProductsContext = createContext();

const POLL_INTERVAL = 60000;

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const offlineData = await AsyncStorage.getItem("products");
      if (offlineData) {
        setProducts(JSON.parse(offlineData));
      }

      const response = await axios.get(
        "https://virtserver.swaggerhub.com/RACHITGARG258/simple-api/1.0.0/products"
      );
      setProducts(response.data);

      await AsyncStorage.setItem("products", JSON.stringify(response.data));
    } catch (err) {
      if (!offlineData) {
        setError(
          "Failed to fetch products. Please check your internet connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, POLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
};
