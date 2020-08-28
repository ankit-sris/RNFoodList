import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import styles from './style';
import style from "../style";


export default class ApprovedFoodListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subListVisible: false
        }
    }

    getCategoryImage = (title) => {
        switch (title) {
            case "Fruits":
                return require("../../../../assets/images/fruit.png");
            case "Lean Protein":
            case "Alternate ingredients to fats":
                return require("../../../../assets/images/meat.png");
            case "Vegetables":
                return require("../../../../assets/images/vegetable.png");
            case "Sea Food":
                return require("../../../../assets/images/fish.png");
            case "Sauces and Seasonings":
                return require("../../../../assets/images/water.png");
        }
    }

    render() {
        var { category } = this.props;
        return (
            <View style={styles.listItemContainer}>
                <TouchableOpacity style={styles.categorySection} onPress={() => {
                    this.setState({ subListVisible: !this.state.subListVisible });
                }}>
                    <View style={[styles.categoryImageContainer, { backgroundColor: category.colorCode}]}>
                        <Image source={this.getCategoryImage(category.categoryName)} resizeMode={'contain'} style={styles.categoryImage} />
                    </View>
                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 10 }}>
                        <Text style={{ color: category.colorCode }}>{category.categoryName}&nbsp;
                            {category.servingSize && <Text style={{ color: '#000' }}>({category.servingSize})</Text>}
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={this.state.subListVisible ? require('../../../../assets/images/expander_closed.png') : require('../../../../assets/images/expander_closed.png')} resizeMode={'contain'} style={{ width: 30, height: 15 }} />
                    </View>

                </TouchableOpacity>
                {
                    (this.state.subListVisible || this.props.expanded) &&
                    <>
                        <View style={styles.subCategorySection}>
                            {category.subcategories && category.subcategories.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <View>
                                            {
                                                item.subCategoryname != '' &&
                                                <Text style={[style.subCategoryTitle, { color: category.colorCode }]}>{item.subCategoryname.toUpperCase()}</Text>
                                            }
                                            {
                                                item.items && item.items.map((subCategoryItem, sindex) => {
                                                    return (
                                                        <Text key={sindex} style={styles.subCategoryItem}>{subCategoryItem}</Text>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                )
                            })}
                            {
                                category.quote != '' &&
                                <View style={styles.categoryQuote}>
                                    <Text style={styles.quoteText}>{category.quote}</Text>
                                </View>
                            }
                        </View>

                        {
                            category.protip != '' && <View style={[styles.categoryQuote, { backgroundColor: category.colorCode }]}>
                                <Text style={{ color: '#ffffff' }}>{"Protip:"}</Text>
                                <Text style={[styles.quoteText, { color: '#ffffff' }]}>{category.protip}</Text>
                            </View>
                        }
                    </>
                }
            </View>
        )
    }
}