const nodemaliler = require('nodemailer');

const createTrans = () => {
  const transport = nodemaliler.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'matiasfernandez201@gmail.com',
      pass: 'ndjnpacklmpcgqvx',
    },
  });

  return transport;
};

const sendMail = async (user, token) => {
  const transporter = createTrans();

  const { email, name, last_name } = user;

  const info = await transporter.sendMail({
    from: 'Code 24/7 <Code24-7@noreply.com.ar>',
    to: email,
    subject: '¡Bienvenido ' + name + '' + last_name + '!',
    html:
      '<b>Gracias por ser parte de nuestra gran comunidad de cursos. Para ininicar sesion haga click aqui <a> http://localhost:4200/validateAccount/' +
      token +
      '</a></b>',
  });

  console.log('Mensagge sent: %s', info.messageId);
};

exports.sendMail = (user, token) => sendMail(user, token);
