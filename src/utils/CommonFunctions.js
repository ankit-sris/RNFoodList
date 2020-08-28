import AppConstants from "./AppConstants";
import AsyncStorage from "@react-native-community/async-storage";


const CommonFunctions = {

    sendAjaxCall: (url, jsonData, successHandler, errorHandler) => {

        return fetch(url).then((response) => {
            if (response.status >= 400) {
                if (errorHandler) {
                    var error = JSON.parse(response._bodyText);
                    errorHandler(error);
                }
                return null;
            }

            return response.json();
        }).then((responsJson) => {
            if (responsJson != null) {
                successHandler(responsJson);
            }
        })
    },
    setDataInAsyncStorage: async (data, key) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(data))
        } catch (e) {
            console.warn('data cannot be stored!');
        }
    }
}

export default CommonFunctions;