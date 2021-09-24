const fs = require('fs')
const clearCache = require('clear-module')
const dotenv = require('dotenv').config()

class parachute {

  apply(compiler) {

    compiler.hooks.beforeCompile.tap("run_before_compiling", () => {
      if (process.env.HAS_WRITTEN == 'false') {
        const allModulesDir = fs.readdirSync('./src/modules');

        allModulesDir.forEach(function (module, index) {
          var fieldsFile = require('../src/modules/' + module + '/fields.js');

          // console.log(fieldsFile.getJson());

          fs.writeFile('./src/modules/' + module + '/fields.json', fieldsFile.getJson(), function (err) {
            if (err) return console.log(err);
          });

          clearCache('./src/modules/' + module + '/fields.js');
          clearCache('.*\/src\/json\/.*\.json');
        });
        process.env.HAS_WRITTEN = 'true';
      } else {
        process.env.HAS_WRITTEN = 'false';
      };
    })
  }
}
module.exports = parachute