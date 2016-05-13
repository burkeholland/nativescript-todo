import * as application from 'application';
import * as appSettings from 'application-settings';

try {
    //  shim the 'localStorage' API with application settings module 
    global.localStorage = {
        getItem(key: string) {
            return appSettings.getString(key);
        },
        setItem(key: string, value: string) {
            return appSettings.setString(key, value); 
        }
    }
    
    application.start({ moduleName: 'main-page' });
}
catch (err) {
    console.log(err);
}
 