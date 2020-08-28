import React, { Component } from "react";
import AppConstants from "../../../utils/AppConstants";
import CommonFunctions from "../../../utils/CommonFunctions";
import styles from './style';
import { SafeAreaView, View, FlatList, TouchableOpacity, Image, TextInput, Text } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import ApprovedFoodListItem from "./ApprovedFoodListItem";


export default class ApprovedFoodList extends Component {

    searchText = "";
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
        }
    }

    componentDidMount() {
        this.loadListData();
    }

    loadListData = async () => {
        try {
            const listData = await AsyncStorage.getItem(AppConstants.StorageKeys.FoodListData)
            if (listData !== null) { //list data already found
                this.setState({ listData: JSON.parse(listData) });
            } else {
                this.loadDataFromServer();
            }
        } catch (e) {
            console.warn('data could not be retrived')
        }
    }

    loadDataFromServer() {
        CommonFunctions.sendAjaxCall('https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e', null, (data) => {
            this.setState({ listData: data });
            CommonFunctions.setDataInAsyncStorage(data, AppConstants.StorageKeys.FoodListData);
        }, () => {
            //handle error from server
        });
    }


    searchByText = async (searchText) => {
        this.searchText = searchText;
        if (searchText.length === 0) {
            this.loadListData();
        } else {
            let data = await AsyncStorage.getItem(AppConstants.StorageKeys.FoodListData);
            data = JSON.parse(data);
            let listData = [], searchedData = [], matchedSubCategories = [], matchedItems = [];            

            searchedData = data.categories.filter((item) => {                
                matchedSubCategories = item.category.subcategories.filter((row, indexOfRow) => {                   
                    matchedItems = row.items.filter((listItem) => {
                        if (listItem.includes(searchText)) {
                            return listItem
                        }
                    })
                    if (matchedItems.length > 0) {                    
                        row.items = matchedItems;
                        return row;
                    }
                });
                item.category.subcategories = matchedSubCategories;
                if (item.category.subcategories.length > 0) {
                    return item;
                }
            });

            listData = this.state.listData;
            listData.categories = searchedData;
            this.setState({ listData: listData });
        }
    }

    renderListHeader = () => {
        return (
            <View>
                <View style={styles.closeSection} >
                    <TouchableOpacity onPress={() => { this.props.setModalVisibility(false) }} >
                        <Image source={require('../../../assets/images/cancel.png')} resizeMode={'contain'} style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.headingSection}>
                    <Text style={styles.headingText}>Approved Foods List</Text>
                </View>

                <View style={styles.searchSection}>
                    <View style={styles.searchButtonContainer}>
                        <Image source={require('../../../assets/images/search.png')} resizeMode={'contain'} style={styles.searchIcon} />
                    </View>
                    <View style={styles.searchBoxContainer}>
                        <TextInput
                            style={styles.searchInput}
                            onChangeText={(value) => this.searchByText(value)}
                            placeholder={'Try searching fat,sauces names...'}
                        />
                    </View>
                </View>
            </View>
        );
    };

    renderListItem = (item) => {
        item = item.item;
        var expanded = this.searchText != '';
        return (
            <ApprovedFoodListItem category={item.category} expanded={expanded} />
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <FlatList
                        style={{ paddingHorizontal: 10 }}
                        data={this.state.listData.categories}
                        renderItem={this.renderListItem}
                        ListHeaderComponent={this.renderListHeader}
                        keyboardShouldPersistTaps={'handled'}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </SafeAreaView>
        )
    }

}