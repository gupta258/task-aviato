import { View, TextInput, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";

const InputBox = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, inputStyle]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.quaternary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    fontWeight: "500",
    color: Colors.secondary,
    marginBottom: 10,
  },
  input: {
    height: 42,
    borderColor: Colors.borderDrawer,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    fontWeight: "500",
    color: Colors.primary,
    backgroundColor: "white",
    width: "100%",
    flexShrink: 1,
  },
});

export default InputBox;
