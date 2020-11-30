const path = require('path');
const express = require('express');
const router = express.Router();

const exec = require('../functions/exec');
const fs = require('../functions/fileSystem');
const wyliodrinDirPath = path.join(path.resolve(__dirname), '..', 'wyliodrin');

router.get('/poweroff', async (req, res) => {
    try {
        await exec.poweroff();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

router.get('/reboot', async (req, res) => {
    try {
        await exec.reboot();
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
})

router.post('/wyliodrin/infos', async (req, res) => {
    try {
        let json = undefined
        try {
            json = JSON.parse(req.body?.uploadJSONInput);
        } catch (err) {
            console.log('PARSE ERROR');
            res.redirect('/bad-request');
        }
        if (json) {
            const {token, id, server} = json;
            if (token && id && server) {
                await fs.ensureDir(wyliodrinDirPath);
                await fs.writeJson(path.join(wyliodrinDirPath, 'wyliodrin.json'), {
                    token,
                    id,
                    server
                })
                const {stdout, stderr} = await exec.restartContainer('tock-os-container');
                if (stderr !== '') {
                    res.redirect('/internal-error');
                } else {
                    res.redirect('/');
                }
            } else {
                res.redirect('/bad-request');
            }
        }
    } catch (err) {
        console.error(err);
        res.redirect('/internal-error');
    }
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'ui', 'index.html'));
})

router.get('/bad-request', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'ui', 'bad-request.html'));
})

router.get('/internal-error', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'ui', 'internal-error.html'));
})

module.exports = router;