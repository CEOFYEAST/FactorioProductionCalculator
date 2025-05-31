function readConfig(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        throw new Error('Invalid JSON string');
    }
}

module.exports = readConfig;