const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function poweroff () {
    try {
        await exec('poweroff');
    } catch (err) {
        throw err;
    }
}

async function reboot () {
    try {
        await exec('reboot');
    } catch (err) {
        throw err;
    }
}

async function restartContainer (containerName) {
    try {
        return await exec(`docker restart ${containerName}`);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    poweroff,
    reboot,
    restartContainer
}