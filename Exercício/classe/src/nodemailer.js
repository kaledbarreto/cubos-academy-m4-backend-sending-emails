const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transportador = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a8eb27223c3e26",
    pass: "e23e2fe0df8ddf"
  }
});

transportador.use('compile', handlebars({
  viewEngine: {
    extname: '.handlebars',
    defaultLayout: false
  },
  viewPath: './views/'
}));

module.exports = transportador;