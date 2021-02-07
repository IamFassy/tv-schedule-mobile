import React from 'react'
import { StyleSheet, Text } from 'react-native'

const CustomText = (props) => {
    return (
        <Text style={[props.type === "normal" ? styles.normal : props.type === "medium" ? styles.medium : styles.bold, { ...props.style }]}>
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
