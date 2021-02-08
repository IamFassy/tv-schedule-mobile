import React, { Component } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { httpMethods, searchShows } from '../../ApiManager/Endpoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import CustomHeader from '../../Components/CustomHeader/CustomHeader';
import CustomText from '../../Components/CustomText/CustomText';
import Colors from '../../Utils/Colors';
import Loading from '../../Utils/Loading';

class Search extends Component {
    constructor() {
        super()
        this.state = {
            searchText: "",
            loading: undefined,
            results: [],
            noResults: false,
            error: false
        }
    }

    handleText = (searchText) => {
        this.setState({ searchText })
    }

    onSubmit = () => {
        this.setState({ loading: true })
        NetworkManager.request(searchShows + this.state.searchText, httpMethods.get)
            .then((res) => {
                this.setState({ loading: false })
                if (res.status === 200 && res.data.length > 0) {
                    this.setState({ results: res.data, noResults: false })
                }
                else if (res.status === 200 && res.data.length === 0) {
                    this.setState({ noResults: true })
                }
                else {
                    this.setState({ error: true })
                }
            })
            .catch((err) => {
                console.log(err, "err");
            })
    }

    toDetails = (item) => {
        let search = true
        this.props.navigation.push("Details", {
            item,
            search
        })
    }

    renderItem = ({ item = [] }) => {
        return (
            <TouchableOpacity onPress={() => this.toDetails(item)}>
                <View style={styles.singleResult}>
                    {item.show.image !== null && <Image source={{ uri: item.show.image.medium }} resizeMode="cover" style={styles.image} />}
                    <View style={styles.rightView}>
                        <CustomText type="medium" numberOfLines={1} style={styles.resultText}>{item.show?.name}</CustomText>
                        <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.show?.schedule.time}</CustomText>
                        {item.show.runtime !== null && <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.show.runtime} mins</CustomText>}
                        <CustomText type="medium" numberOfLines={1} style={styles.showTime}>{item.show.network?.name.toUpperCase()}</CustomText>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <CustomHeader
                    handleText={this.handleText}
                    search={true}
                    onSubmit={this.onSubmit}
                    {...this.props} />
                {this.state.loading && <View style={styles.centerView}>
                    <Loading />
                </View>}
                {this.state.loading === false && this.state.results.length === 0 && <View style={styles.centerView}>
                    <CustomText type="bold" style={styles.noResult}>No results found.</CustomText>
                </View>}
                {this.state.loading === false && this.state.results.length > 0 &&
                    <View style={styles.resultView}>
                        <FlatList
                            data={this.state.results}
                            renderItem={this.renderItem}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            keyExtractor={(item) => item.show.id + ""}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>}
                {this.state.loading === false && this.state.error && <View style={styles.centerView}>
                    <CustomText type="bold" style={styles.noResult}>There was an error while fetching results.</CustomText>
                </View>}
            </SafeAreaView>
        )
    }
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    headerView: {
        backgroundColor: Colors.secondary
    },
    centerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    resultView: {
        paddingVertical: 10,
        marginHorizontal: 5
    },
    noResult: {
        color: Colors.white,
        fontSize: 16
    },
    singleResult: {
        backgroundColor: Colors.secondary,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        height: 120
    },
    resultText: {
        color: Colors.white,
        fontSize: 20
    },
    image: {
        width: 120,
        height: 120
    },
    rightView: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    showTime: {
        color: Colors.grey,
        fontSize: 18
    }
})
