const host = window.location.hostname;

const configs = {
    'localhost': {
        authUrl: 'http://localhost:5010/oauth/login',
        apiUrl: 'http://localhost:5010',
        appsUrl: 'http://localhost:9292/#/my-apps'
    },
    'scheduler.staging.gorillascode.com': {
        authUrl: 'https://scheduler.staging.gorillascode.com/api/oauth/login',
        apiUrl: 'https://scheduler.staging.gorillascode.com/api',
        appsUrl: 'https://auth.staging.gorillascode.com',       
    },
    'scheduler.gorillascode.com': {
        authUrl: 'https://scheduler.gorillascode.com/api/oauth/login',
        apiUrl: 'https://scheduler.gorillascode.com/api',
        appsUrl: 'https://auth.gorillascode.com',       
    }
};

export const environment = {
    authUrl: configs[host].authUrl,
    apiUrl: configs[host].apiUrl,
    appsUrl: configs[host].appsUrl
};
