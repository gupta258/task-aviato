import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

const ImagePick = (props) => {
  const { image, setImage, container, size, imageStyle } = props;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={[styles.container, container]} onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} style={[styles.image, imageStyle]} />
      ) : (
        <MaterialCommunityIcons
          name="image-plus"
          size={size}
          color={Colors.activeIcon}
        />
      )}
    </TouchableOpacity>
  );
};

export default ImagePick;

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 48,
    height: 48,
  },
});
