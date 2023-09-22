import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'sleitesgalvan@frba.utn.edu.ar',
    pass: 'nzwydmrjmkzmbaqf',
  },
  from: 'sleitesgalvan@frba.utn.edu.ar',
});

export const sendEmail =async (to: string, code: string): Promise<void> => {
  try {
    const mailOption = {
      from: 'ClearViewCo sleitesgalvan@frba.utn.edu.ar',
      to,
      subject: 'Código de verificacion para tu cuenta',
      text: `Llego tu código para que puedas completar la verificación de tu cuenta.
                            El código es : ${code}`,
    };

    await transporter.sendMail(mailOption);
    console.log('Email enviado');
  } catch (error) {
    console.error('Error al enviar el mail', error);
  }
};
