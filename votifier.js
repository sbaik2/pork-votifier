const config = require('./config.json');

const nanoexpress = require('nanoexpress');
const app = nanoexpress();

app.listen(8000);


const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.locale(config.dayjs_locale || 'en');


const votifier = require('./lib/votifier.js');


app.post('/send', (req, res) => {
    // console.log(req.body);
    if (!req.body || !req.body.host || !req.body.port || !req.body.key || !req.body.username || !req.body.user_ip) {
        console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss').padEnd(24)}${req.body.host}:${req.body.port} INVALID FORMAT`);
        return res.send({ status: 'fail' });
    }
    votifier.send(req.body).then(() => {
        console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss').padEnd(24)}${req.body.host}:${req.body.port} ${req.body.username}`);
        res.send({ status: 'success' });
    }).catch((err) => {
        res.send({ status: 'fail' });
    });

});
app.use((req, res, next) => {
    console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss').padEnd(24)}${req.body.host}:${req.body.port} INVALID ROUTE`);
    res.send({ status: 'fail' });
});
