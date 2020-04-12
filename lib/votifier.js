const ursa = require('./ursa.js');
const net = require('net');
const config = require('../config.json');

const SOCKET_TIMEOUT = 2000;


function wordwrap(str, maxWidth) {
    let newLineStr = "\n",
        done = false,
        res = '';
    do {
        let found = false;
        if (!found) {
            res += [str.slice(0, maxWidth), newLineStr].join('');
            str = str.slice(maxWidth);
        }
        if (str.length < maxWidth) {
            res += str;
            done = true;
        }
    } while (!done);
    return res;
}

module.exports = {

    send: async function(data) {
        return new Promise((resolve, reject) => {
            try {

                if (!data.key.includes('-----BEGIN PUBLIC KEY-----')) {
                    data.key = '-----BEGIN PUBLIC KEY-----\n' + data.key + '\n-----END PUBLIC KEY-----\n';
                }
                let options = 'VOTE\n' + config.votifier_service_name + '\n' + data.username + '\n' + data.user_ip + '\n' + (Date.now() / 1000).toFixed(0) + '\n';
                let buffer = Buffer.from(options, 'binary');

                let key = ursa.createPublicKey(data.key);
                let encrypted = key.encrypt(buffer, 'binary', 'binary', ursa.RSA_PKCS1_PADDING);




                var connection = net.createConnection({
                    host: data.host,
                    port: data.port
                }, function() {
                    connection.write(encrypted, 'binary', function() {
                        connection.end();
                        resolve();
                    });
                });
                connection.setTimeout(SOCKET_TIMEOUT, function() {
                    connection.end();
                    reject();
                });
                connection.once('error', function(e) {
                    reject();
                });
            }
            catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }
};
