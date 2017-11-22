const args = process.argv.slice(2);
const name = args[0];

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



function printResult (err, result){
  if (err) {
        return console.error("error running query", err);
  }
  console.log(`Found ${result.length} person(s) by the name '${name}';`);
    for (let i in result){
      console.log(`- ${result[i].id} : ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.toISOString().substring(0,10)}'`);
    }
}

knex.select().from('famous_people').where('first_name', name).orWhere('last_name',name)
.asCallback(function (err, result){
  printResult(err,result);
})