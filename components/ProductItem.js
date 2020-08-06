import React from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { TouchableOpacity, TouchableNativeFeedback } from "react-native";
import Card from "./Card";

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <TouchableCmp useForeground onPress={props.onSelect}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: props.image }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actionContianer}>{props.children}</View>
        </View>
      </TouchableCmp>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
    overflow: "hidden"
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
    height: "60%",
    width: "100%"
  },
  image: {
    height: "100%",
    width: "100%"
  },
  details: {
    height: "20%",
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold"
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans"
  },
  actionContianer: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  }
});
