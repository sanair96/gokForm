const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.dbname, process.env.dbusername, process.env.dbpassword, {
  host: process.env.hostname,
  dialect: "mysql",
});

const {GroupDataSchema} = require('./models/migrant');

const csv = require('csv-parser');
const fs = require('fs');
let count = 0
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    GroupDataSchema.findOrCreate({where:{...row}, defaults: {...row},logging: false} ).then(([,created]) => {
        if(created) {
            count ++;
        }
      }).catch(e => {
        console.log(e.message)
        res.send({success: false, error: true, msg: "Something went wrong", message: e.message})
      });
    })
  .on('end', () => {
    console.log(`${count} rows inserted`);
  });