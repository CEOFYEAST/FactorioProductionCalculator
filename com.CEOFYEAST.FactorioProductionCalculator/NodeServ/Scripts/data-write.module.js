var fs = require('fs');

function writeObj(toWrite){
    fs.writeFile('com.CEOFYEAST.FactorioProductionCalculator\\NodeServ\\Data\\test-data.json', JSON.stringify(toWrite), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

module.exports = {
    writeObj
  };