import React, { Component } from "react";
import { Modal, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import ApprovedFoodList from "../modals/ApprovedFoodList";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showFoodList: false
        }
    }

    setListVisibility(visibility) {
        this.setState({ showFoodList: visibility });
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <Modal visible={this.state.showFoodList} onRequestClose={() => { }}>
                        <ApprovedFoodList setModalVisibility={(visibility) => { this.setListVisibility(visibility) }}></ApprovedFoodList>
                    </Modal>
                    <TouchableOpacity style={styles.messageButton}>
                        <Image source={require('../../assets/images/message.png')} resizeMode={'contain'} style={styles.messageButtonImage} />
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button} onPress={this.setListVisibility.bind(this, true)}>
                            <Text style={styles.buttonText}>Show Approved Foods List</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>)
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: "center"
    },
    messageButton: {
        right: 20,
        zIndex: 99999,
        position: 'absolute',
        top: 20,
        borderRadius: 50,
        padding: 5,
        backgroundColor: '#eb8f8f',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 50,
    },
    messageButtonImage: {
        width: 40,
        height: 40
    },
    buttonContainer: {
        alignSelf: "center",
        backgroundColor: '#e5e5e5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#215680',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 3,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 3,
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 13 },
    },
    buttonText: {
        color: '#ffffff'
    }
})