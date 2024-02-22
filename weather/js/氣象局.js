let api = 'CWA-D0FD3F83-DF9C-4255-97BD-DB2427FFBCE9';
let webid = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWA-D0FD3F83-DF9C-4255-97BD-DB2427FFBCE9' + api;

fetch(webid)
    .then(function (response) {
        return response.json();
    })
    .then(function (myjson) {
        console.log(myjson);
    })
    .catch(function (error) {
        console.error('Error:', error);
    });
