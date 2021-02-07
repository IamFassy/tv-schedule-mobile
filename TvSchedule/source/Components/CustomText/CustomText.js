import React from 'react'
import { StyleSheet, Text } from 'react-native'

const CustomText = (props) => {
    return (
        <Text numberOfLines={props.numberOfLines ? props.numberOfLines : null} style={[props.type === "bold" ? styles.bold : props.type === "medium" ? styles.medium : styles.normal, { ...props.style }]}>
            {props.children}
        </Text>

    )
}

export default CustomText

const styles = StyleSheet.create({
    normal: {
        fontFamily: "Roboto-Regular"
    },
    medium: {
        fontFamily: "Roboto-Medium"
    },
    bold: {
        fontFamily: "Roboto-Bold"
    }
})
