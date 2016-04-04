import * as ApplicationSettings from 'application-settings';

let LocalStorage = {
    get: (key: string) => {
        var value = ApplicationSettings.getString(key);
        if (value) {
            return JSON.parse(value);
        }
        else return false;
    },   
    
    set: (key: string, value: any) => {
        ApplicationSettings.setString(key, JSON.stringify(value));   
    }
}

export default LocalStorage;