import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';
import CustomText from '../CustomText/CustomText';

const Show = ({ item = [], toDetail }) => {
    return (
        <TouchableOpacity onPress={() => toDetail(item)}>
            <View style={styles.rowView}>
                <View style={{ flex: 0.3 }}>
                    <Image source={{ uri: item.show.image.medium }} resizeMode="cover" style={styles.image} />
                </View>
                <View style={styles.rightView}>
                    <CustomText type="medium" numberOfLines={1} style={styles.showName}>{item.show.name}</CustomText>
                    <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.airtime}</CustomText>
                    <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.runtime} mins</CustomText>
                    <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.show.network.name.toUpperCase()}</CustomText>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default Show

const styles = StyleSheet.create({
    rowView: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.secondary,
        marginTop: 10,
        marginHorizontal: 5
    },
    image: {
        width: "100%",
        height: 120
    },
    showName: {
        color: Colors.white,
        fontSize: 22
    },
    rightView: {
        flex: 0.7,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    showTime: {
        color: Colors.grey,
        fontSize: 18
    }
})
