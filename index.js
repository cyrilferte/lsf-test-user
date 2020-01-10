var AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-3'});
var ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

// Call DynamoDB to read the item from the table
console.log(event)
if(event.email){
      var params = {
  TableName: 'lsf-user',
  Key: {
    'email': event.email
  },
};
ddb.get(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
        console.log("Error", data.Item);
    const response = {
        statusCode: 200,
        body: {item: data.Item},
    };
    callback(null, response);
  }
});
}else if( event.admin === process.env.admin && event.adminPassword === process.env.admin_password){
    var params = {
  TableName: 'lsf-user',
};

     ddb.scan(params, function(err, data) {
  if (err) {
    console.log("Error", err);
    const response = {
        statusCode: 400,
        body: JSON.stringify('Hello from Lambda! error'),
    };
      callback(err);
  } else {
    console.log("Success", data.Items);
    const response = {
        statusCode: 200,
        body: {items: data.Items},
    };
    callback(null, response);
  }
});
}

    
};

