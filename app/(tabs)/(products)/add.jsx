import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import axios from "axios";
import ImagePick from "@/components/ImagePick";
import InputBox from "@/components/InputBox";

export default function AddProduct() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productHashId, setProductHashId] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCollection, setProductCollection] = useState("");

  const validateFields = () => {
    if (
      !productName ||
      !productPrice ||
      !productHashId ||
      !productWeight ||
      !productDescription ||
      !productBrand ||
      !productCategory ||
      !productCollection ||
      !imageOne ||
      !imageTwo ||
      !imageThree
    ) {
      Alert.alert(
        "Validation Error",
        "Please fill all fields and add all images."
      );
      return false;
    }
    return true;
  };

  const postData = async () => {
    if (!validateFields()) {
      return;
    }

    const payload = {
      productImage: image,
      productName,
      productId: productHashId,
      productWeight,
      productPrice,
      productDescription,
      productMedia: [imageOne, imageTwo, imageThree],
      organizationBrand: productBrand,
      organizationCategory: productCategory,
      organizationCollection: productCollection,
    };

    try {
      const response = await axios.post(
        "https://virtserver.swaggerhub.com/RACHITGARG258/simple-api/1.0.0/products",
        payload
      );
      console.log(response, payload, "Ressss");

      Alert.alert("Success", "Product saved successfully!");
      router.back();
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      Alert.alert("Error", "Failed to save product. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topContainer}>
          <View style={[styles.flex, { marginBottom: 16 }]}>
            <AntDesign
              name="arrowleft"
              size={20}
              color={Colors.secondary}
              style={styles.arrow}
              onPress={() => router.back()}
            />
            <Text style={styles.screenName}>Add Product</Text>
          </View>
          <View style={styles.flex}>
            <ImagePick size={16} image={image} setImage={setImage} />
            <View style={styles.inputContainer}>
              <View style={styles.flex2}>
                <Text style={styles.productLabel}>Product</Text>
                <Text style={[styles.productLabel, { color: Colors.primary }]}>
                  / Product Details
                </Text>
              </View>
              <InputBox
                value={productName}
                onChangeText={setProductName}
                placeholder="Product name"
                inputStyle={styles.input}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.productInfo}>
          <Text style={styles.head}>Product Information</Text>
          <View style={styles.flex3}>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Product Name"
                value={productName}
                onChangeText={setProductName}
                placeholder="Product name"
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Price"
                value={productPrice}
                onChangeText={setProductPrice}
                placeholder="Product Price($)"
              />
            </View>
          </View>
          <View style={styles.flex3}>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Product Hash Id"
                value={productHashId}
                onChangeText={setProductHashId}
                placeholder="Product Hash Id"
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Weight"
                value={productWeight}
                onChangeText={setProductWeight}
                placeholder="Product Weight"
              />
            </View>
          </View>
          <View style={styles.flex3}>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Product Description"
                value={productDescription}
                onChangeText={setProductDescription}
                placeholder="Write your description here"
                multiline
                numberOfLines={4}
                inputStyle={{
                  height: 120,
                  textAlignVertical: "top",
                  paddingTop: 10,
                }}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.head}>Product Media</Text>
            <View style={styles.flex}>
              <ImagePick
                size={20}
                container={{ width: 90, height: 88 }}
                imageStyle={{ width: 90, head: 88 }}
                image={imageOne}
                setImage={setImageOne}
              />
              <ImagePick
                size={20}
                container={{ width: 90, height: 88 }}
                imageStyle={{ width: 90, head: 88 }}
                image={imageTwo}
                setImage={setImageTwo}
              />
              <ImagePick
                size={20}
                container={{ width: 90, height: 88 }}
                imageStyle={{ width: 90, head: 88 }}
                image={imageThree}
                setImage={setImageThree}
              />
            </View>
          </View>
          <View style={styles.divider} />
          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.head}>Product Organization</Text>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
              <InputBox
                label="Product Brand"
                value={productBrand}
                onChangeText={setProductBrand}
                placeholder="Product Brand"
              />
            </View>
            <View style={[styles.inputWrapper, { marginBottom: 20 }]}>
              <InputBox
                label="Product Category"
                value={productCategory}
                onChangeText={setProductCategory}
                placeholder="Product Weight"
              />
            </View>
            <View style={styles.inputWrapper}>
              <InputBox
                label="Product Collection"
                value={productCollection}
                onChangeText={setProductCollection}
                placeholder="Product Collection"
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.button} onPress={postData}>
            <Text style={styles.buttonText}>+ Save Product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1, // Ensures content grows to take up space
  },
  topContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    overflow: "hidden",
    paddingBottom: 20,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  arrow: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  screenName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  flex2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  productLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    fontWeight: "500",
    color: Colors.tertiary,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 32,
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 0,
    fontFamily: "Manrope_600SemiBold",
    fontSize: 24,
    fontWeight: "600",
    color: Colors.primary,
    backgroundColor: "transparent",
    width: "100%",
  },
  divider: {
    borderWidth: 1,
    borderColor: Colors.borderDrawer,
  },
  productInfo: {
    padding: 20,
  },
  head: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 20,
  },
  flex3: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  inputWrapper: {
    flex: 1,
    maxWidth: "100%",
  },
  btnContainer: {
    padding: 20,
    backgroundColor: "white",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
  },
  buttonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
});
