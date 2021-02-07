import React, { Component } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { getSchedule, httpMethods } from '../../ApiManager/Endpoints'
import NetworkManager from '../../ApiManager/NetworkManager'

export class Home extends Component {

    componentDidMount() {
        this.getTvSchedule()
    }

    getTvSchedule() {
        let date = new Date()
        NetworkManager.request(getSchedule + date.toISOString().split('T')[0], httpMethods.get)
            .then((res) => {
                console.log(res, "res");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <SafeAreaView>
                <Text> textInComponent </Text>
            </SafeAreaView>
        )
    }
}

export default Home
