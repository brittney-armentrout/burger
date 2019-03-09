//Import Mysql connection
var connection = require("./connection.js")


//Helper function for SQL syntax
//Methods necessary to retrieve and store data in your database
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}
	return arr.toString();
};

//Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
	var arr = [];

    //loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
    }
    
    //translate array of strings to a single comma-separated string
	return arr.toString();
};

//define orm object for all our SQL statement functions
var orm = {

	selectAll: function(tableInput, cb) {
		
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	insertOne: function(table, cols, vals, cb) {
		
		var queryString = "INSERT INTO " + table;
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	updateOne: function(table, objColVals, condition, cb) {
		
		var queryString = "UPDATE " + table;
		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
      }
			cb(result);
		});
	}
};

module.exports = orm;