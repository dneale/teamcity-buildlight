var Enum = require('enum');

var status = new Enum(['BUILDING', 'SUCCESS', 'FAILURE'], 'status')

exports.status = status;
