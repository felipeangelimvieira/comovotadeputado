const https = require('https');


var get = function(url) {
    return new Promise( function(resolve, reject) {
        
        getHttps(url, resolve, reject);
        
    });
}


function getHttps(url,resolve, reject, retry = 0) {

    https.get(url, res =>{

        var data = '';
        if (res.statusCode >= 200 && res.statusCode < 400) 
            {
            res.on('data', data_ => data += data_.toString());
            res.on('end', () => 
                {
                    resolve(data);   
                });
            }
        else if(retry < 5)
        {
            console.log(`Retry ${retry + 1}`)
            setTimeout(() => getHttps(url, resolve, reject, retry + 1), 2000);
        }
        else {
            console.log(`Rejecting. Status code: ${res.statusCode}`)
            reject(res.statusCode)
        }
    });

}

module.exports = {

    get : get
}