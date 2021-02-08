import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../Utils/Colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import CustomText from '../CustomText/CustomText';
import { widthPercentageToDP } from '../../Utils/ResponsiveUI';

const CustomHeader = (props) => {
    const [text, setText] = useState("")

    const handleText = (st) => {
        setText(st)
        props.handleText(st)
    }

    return (
        <View style={styles.headerView}>
            <View style={{ flex: 0.1 }}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <FontAwesomeIcon style={{ alignSelf: "center" }} icon="arrow-left" color={Colors.white} size={20} />
                </TouchableOpacity>
            </View>
            {props.search && <View style={styles.textInputView}>
                <TextInput
                    autoFocus={true}
                    style={styles.textInput}
                    value={text}
                    onChangeText={handleText}
                    selectionColor={Colors.highlight}
                    placeholder="Search..."
                    placeholderTextColor={Colors.grey}
                    onSubmitEditing={props.onSubmit}
                />
            </View>
            }
            {!props.search && <View style={{ flex: 0.8 }}>
                <CustomText type="bold" style={styles.title}>{props.title}</CustomText>
            </View>}
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerView: {
        height: 50,
        backgroundColor: Colors.secondary,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: widthPercentageToDP(100)
    },
    title: {
        color: Colors.white,
        fontSize: 20,
        textAlign: "center"
    },
    textInputView: {
        flex: 0.9,
        alignSelf: "center",
        marginBottom: 5,
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        width: "90%",
        alignSelf: "center",
        color: Colors.white,
        fontSize: 16
    }
})
