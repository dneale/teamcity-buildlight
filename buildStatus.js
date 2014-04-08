var Enum = require('enum');

var status = new Enum(['BUILDING', 'SUCCESS', 'FAILURE', 'UNKNOWN'], 'status')

exports.status = status;
