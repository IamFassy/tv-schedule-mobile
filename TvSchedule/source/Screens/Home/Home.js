import React, { Component } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getSchedule, httpMethods } from '../../ApiManager/Endpoints';
import NetworkManager from '../../ApiManager/NetworkManager';
import CustomText from '../../Components/CustomText/CustomText';
import Show from '../../Components/Show/Show';
import Colors from '../../Utils/Colors';
import Loading from '../../Utils/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            schedule: [],
            loading: undefined,
            error: false
        }
    }

    componentDidMount() {
        this.getTvSchedule()
    }

    getTvSchedule() {
        this.setState({ loading: true })
        let date = new Date()
        NetworkManager.request(getSchedule + date.toISOString().split('T')[0], httpMethods.get)
            .then((res) => {
                this.setState({ loading: false })
                if (res.status === 200) {
                    this.setState({ schedule: res.data })
                }
                else {
                    this.setState({ error: true })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    toDetail = (item) => {
        this.props.navigation.push("Details", {
            item
        })
    }

    renderItem = ({ item }) => {
        return (
            <Show item={item} toDetail={this.toDetail} />
        )
    }

    toSearch = () => {
        this.props.navigation.navigate("Search")
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.loading &&
                    <View style={styles.centerView}>
                        <Loading />
                    </View>
                }
                {!this.state.loading && this.state.schedule.length > 0 &&
                    <View>
                        <View style={styles.topView}>
                            <TouchableOpacity onPress={() => this.toSearch()}>
                                <FontAwesomeIcon icon="search" color={Colors.white} size={20} />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={this.state.schedule}
                            renderItem={this.renderItem}
                            contentContainerStyle={{ paddingBottom: 50 }}
                            keyExtractor={(item) => item.id + ""}
                            showsVerticalScrollIndicator={false} />
                    </View>
                }
                {!this.state.loading && this.state.error &&
                    <View style={styles.centerView}>
                        <CustomText style={styles.errorText}>There was an error while fetching the data.</CustomText>
                    </View>
                }
                {!this.state.loading && this.state.schedule.length === 0 && !this.state.error &&
                    <View style={styles.centerView}>
                        <CustomText style={styles.errorText}>No data found.</CustomText>
                    </View>
                }
            </SafeAreaView>
        )
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    errorText: {
        color: Colors.white,
        fontSize: 16
    },
    topView: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignSelf: "flex-end"
    }
})
