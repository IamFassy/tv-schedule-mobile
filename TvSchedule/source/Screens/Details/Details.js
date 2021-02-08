import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomText from '../../Components/CustomText/CustomText';
import Colors from '../../Utils/Colors';
import { heightPercentageToDP, widthPercentageToDP } from '../../Utils/ResponsiveUI';


class Details extends Component {
    constructor() {
        super()
        this.state = {
            details: undefined,
            search: false
        }
    }

    componentDidMount() {
        const { item, search } = this.props.route.params;
        this.setState({ details: item, search })
    }

    rowView = (title, data) => {
        let text = data.toString().includes("<p>") ? data.replace(/<[^>]+>/g, '') : data
        return (
            <View style={styles.rowView}>
                <View style={{ flex: 0.4 }}>
                    <CustomText type="medium" style={styles.leftText}>{title}</CustomText>
                </View>
                <View style={{ flex: 0.6 }}>
                    <CustomText type="medium" style={styles.rightText}>{text}</CustomText>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomHeader {...this.props} title={"Show Details"} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    {this.state.details !== undefined && <View>
                        <Image source={{ uri: this.state.details.show.image?.original }} style={styles.image} />
                        <View style={styles.bottomView}>
                            <CustomText type="medium" numberOfLines={1} style={styles.showName}>{this.state.details.show.name}</CustomText>
                            <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{this.state.search ? this.state.details.show.schedule?.time : this.state.details.airtime}</CustomText>
                            <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{this.state.details.show.network?.name.toUpperCase()}</CustomText>
                            <View style={styles.summaryView}>
                                <View>
                                    {this.state.details.show.summary && this.rowView("SUMMARY", this.state.details.show.summary)}
                                    {this.state.details.show.genres.length > 0 && this.rowView("GENRE", this.state.details.show.genres[0])}
                                    {this.state.details.runtime !== null || this.state.details.show.runtime !== null && this.rowView("DURATION", this.state.search ? this.state.details.show.runtime + " mins" : this.state.details.runtime + " mins")}
                                    {this.state.details.show.language !== null && this.rowView("LANGUAGE", this.state.details.show.language)}
                                    {this.state.details.show.rating.average !== null && this.rowView("RATING", this.state.details.show.rating?.average)}
                                </View>
                            </View>
                        </View>
                    </View>}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    image: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(30)
    },
    bottomView: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
    showName: {
        color: Colors.white,
        fontSize: 22
    },
    showTime: {
        color: Colors.grey,
        fontSize: 18
    },
    rowView: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10
    },
    leftText: {
        fontSize: 20,
        color: Colors.grey
    },
    rightText: {
        fontSize: 20,
        color: Colors.white
    }
})
