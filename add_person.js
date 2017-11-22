const args = process.argv.slice(2);
const firstName = args[0];
const lastName = args[1];
const birthdate = args[2];
//const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client   : 'pg',
  connection : {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

function printResult(err, result) {
  if (err) {
    return console.error("error running query", err);
  }
  console.log('person added');
}

knex('famous_people').insert({'first_name': firstName, 'last_name': firstName, 'birthdate': birthdate});
.asCallback(function(err, result) {
  if (err) console.error(err);
  printResult(err, result);
});