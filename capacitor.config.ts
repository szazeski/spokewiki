import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.spokewiki.mobileapp',
    appName: 'spokewiki',
    webDir: 'build',
    server: {
        androidScheme: 'https'
    }
};

export default config;
