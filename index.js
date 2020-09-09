/**
 * Created by Joseph Crain
 * https://josephcrain.org
 * Made in 2020
*/

/* Include our dependencies */
const fs = require("fs");
const cron = require("node-cron");
const { exec } = require('child_process');
/* Send a nice message that we are starting */
console.log('Starting script');
/* Setup our vars */
const filePath = './backups/';
const daysToLive = 3;
const paths = [];
/* Setup the paths we want to save */
paths['example'] = [
    '/home/test',
];
/* Start our cron */
cron.schedule("0 1 * * *", function () {
    /* Get our date information */
    var d = new Date();
    var fileName = `${(d.getMonth() + 1)}-${d.getDate()}-${d.getFullYear()}`;
    /* Loop through our path keys */
    Object.entries(paths).forEach(r => {
        let [key, v] = r;
        let pathsString = "";

        Object.values(v).forEach(r => {
            pathsString += `${r} `;
        })

        let tarName = `${filePath}${fileName}-${key}.tar.gz`;
        console.log(`Creating new backup with the name ${tarName}`);

        exec(`tar -czf ${tarName} ${pathsString}`);
    })
    /* Read our backups directory, so we can check for old files */
    fs.readdirSync(filePath).forEach(file => {
        /* Get the age and comare to our set daysToLive var */
        var stat = fs.statSync(`${filePath}${file}`)
        var dayDifference = Math.ceil((Math.abs(d.getTime() - stat.ctime.getTime())) / (1000 * 3600 * 24));

        if (dayDifference > daysToLive) {
            console.log(`${file} is ${daysToLive} old, removing!`);
            fs.unlinkSync(`${filePath}${file}`);
        }
    })

    console.log('We done goodbye!');
});