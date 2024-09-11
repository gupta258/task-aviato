import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const { height } = Dimensions.get("window");

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerTitle: () => (
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        ),
        headerTitleAlign: "center",
        headerLeft: () => (
          <EvilIcons
            name="navicon"
            size={30}
            style={styles.headerIcon}
            color={Colors.primary}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.activeBackground,
      })}
      drawerContent={(props) => (
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.top}>
              <TouchableOpacity
                onPress={() => props.navigation.closeDrawer()}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={24} color={Colors.primary} />
              </TouchableOpacity>
              <DrawerItemList {...props} />
            </View>
            <View style={styles.footer}>
              <View style={styles.footerButtons}>
                <TouchableOpacity>
                  <Text style={styles.footerText}>Technical help</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerText}>Contact us</Text>
                </TouchableOpacity>
              </View>
              <ImageBackground
                source={require("@/assets/images/Shape.png")}
                style={styles.backgroundImage}
              >
                <View style={styles.backgroundContent}>
                  <Text style={styles.backgroundText}>
                    Release your maximal potential software.
                  </Text>
                  <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade to Pro</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
              <TouchableOpacity>
                <Image
                  source={require("@/assets/images/settings.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialCommunityIcons
                name="message-text"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Overview</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="(products)"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialIcons
                name="shopping-bag"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Products</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialCommunityIcons
                name="receipt"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Orders</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="customers"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <Ionicons
                name="person-circle"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Customers</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="reviews"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialIcons
                name="rate-review"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Manage Reviews</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="checkout"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialIcons
                name="shopping-cart"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Checkout</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: ({ focused }) => (
            <View style={styles.drawerLabelContainer}>
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
              <Text style={styles.drawerLabelText}>Settings</Text>
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    height: 85,
    backgroundColor: Colors.white,
  },
  logo: {
    width: 126,
    height: 24,
  },
  headerIcon: {
    marginLeft: 14,
  },
  safeAreaView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
  scrollViewContainer: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 10,
  },
  closeButton: {
    height: 56,
    paddingHorizontal: 10,
  },
  top: {
    marginBottom: height / 5,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderDrawer,
    marginHorizontal: 10,
  },
  footerButtons: {
    display: "flex",
    gap: 15,
    paddingVertical: 20,
  },
  footerText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.secondary,
  },
  backgroundImage: {
    resizeMode: "contain",
    marginBottom: 24,
  },
  backgroundContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backgroundText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: Colors.buttonBackground,
    paddingVertical: 10,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  upgradeButtonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.white,
  },
  drawerLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  drawerLabelText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
