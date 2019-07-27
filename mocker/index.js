// const { login } = require('./user');
const delay = require('mocker-api/utils/delay');

const noProxy = process.env.NO_PROXY === 'true';

const { tasks, config } = require('./mockData');

const proxy = {
    'GET /api/initialData': (req, res) => {
        return res.json({
            config,
            tasks
        });
    }
};
module.exports = delay(proxy, 100);
