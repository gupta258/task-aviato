import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { ProductsContext } from "@/context/ProductsContext";

export default function MainProducts() {
  const { products, loading, error } = useContext(ProductsContext);

  const router = useRouter();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.topContainer}>
      <Text style={styles.head}>All Products</Text>
      <View style={styles.flex}>
        <MaterialIcons
          name="search"
          size={20}
          color={Colors.secondary}
          style={styles.search}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("add")}
        >
          <Text style={styles.buttonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.products}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "edit",
            params: { id: item.id },
          }}
        >
          <View style={styles.itemContainer}>
            <Image
              source={item.productImage}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.productName}
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.productId}>{item.productId}</Text>
                <Text style={styles.productType}>
                  {item.organizationCollection}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <Text style={styles.labelTitle}>price</Text>
                  <Text style={styles.labelDesc}>${item.productPrice}</Text>
                </View>
              </View>
            </View>
          </View>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    padding: 22,
    backgroundColor: Colors.white,
  },
  head: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 24,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: Colors.secondary,
    marginBottom: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  search: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingVertical: 10,
  },
  buttonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
  products: {
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDrawer,
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  productName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  productId: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    fontWeight: "500",
    color: Colors.tertiary,
  },
  productType: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.white,
    paddingHorizontal: 8,
    paddingTop: 3,
    paddingBottom: 4,
    backgroundColor: Colors.quaternary,
    borderRadius: 4,
  },
  detailsContainer: {
    gap: 10,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.tertiary,
    textTransform: "uppercase",
  },
  labelDesc: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    fontWeight: "500",
    color: Colors.primary,
  },
});
