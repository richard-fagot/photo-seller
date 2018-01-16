const fs = require('fs')

const read = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
}

const loadDB = function() {
    return new Promise(function(resolve, reject) {
        read('db.json').then(data => resolve(data))
    }) 
}

const getFile = function() {
    return new Promise(function(resolve, reject) {
        resolve('db.json')
    })
}
getFile()
    .then(d => loadDB())
    .then(d => console.log(d))