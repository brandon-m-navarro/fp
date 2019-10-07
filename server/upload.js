// const IncomingForm = require('formidiable').IncomingForm;
//
// module.exports = function upload(request, response) {
//     var form = new IncomingForm();
//     form.on('file', (field, file) => {
//         /* Need to save the file to the database,
//            can access it using file.path */
//     });
//
//     form.on('end', () => {
//         response.json()
//     });
//
//     form.parse(request);
// };