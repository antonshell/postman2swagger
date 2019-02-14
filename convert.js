var transformer = require('api-spec-transformer');
var fs = require('fs');
YAML = require('yamljs');

var postmanToSwagger = new transformer.Converter(transformer.Formats.POSTMAN, transformer.Formats.SWAGGER);

//var filename = 'Magento_220.postman_collection.json';
var filename = 'Magento_220_Search.postman_collection.json';

postmanToSwagger.loadFile('/Users/antonshell/Projects/postman2swagger/input/' + filename, function(err) {
    if (err) {
        console.log(err.stack);
        return;
    }

    postmanToSwagger.convert('yaml')
        .then(function(convertedData) {
            var obj = YAML.parse(convertedData);
            var json = JSON.stringify(obj);

            var calback = function(){};
            fs.writeFile('/Users/antonshell/Projects/postman2swagger/output/' + filename, json, 'utf8', calback);
        })
        .catch(function(err){
            console.log(err);
        });
});