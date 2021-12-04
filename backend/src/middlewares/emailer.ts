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
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  return transport;
};

const sendMail = async (user, token) => {
  const transporter = createTrans();

  const { email, name, last_name } = user;
  const link = 'http://localhost:4200/confirm/' + token;

  const body = `
    <b>Gracias por ser parte de nuestra gran comunidad de cursos. Para iniciar sesión haga click aquí</b>
    <br>
    <a href="${link}">Haga click aqui para verificar su mail!</a>`;

  const info = await transporter.sendMail({
    from: 'Code 24/7 <Code24-7@noreply.com.ar>',
    to: email,
    subject: `¡Bienvenido ${name+' '+last_name}!`,
    html: body,
  });

  console.log('Mensagge sent: %s', info.messageId);
};

exports.sendMail = (user, token) => sendMail(user, token);
