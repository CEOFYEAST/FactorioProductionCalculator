const fs = require('fs');
const path = require('path');

/**
 * Writes a JS object to data/config.json
 * @param {Object} obj - The object to write
 */
function writeConfig(obj) {
    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'config.json');

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf8');
}