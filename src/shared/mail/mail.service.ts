// const sgMail = require('@sendgrid/mail')

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)


export class MailService {

    constructor() {
        console.log("VARIABLE: ",process.env.SENDGRID_API_KEY!);
    }

    async mailValido(correo: string): Promise<boolean> {
        const aux = correo.split("@")
        if (aux[1] !== 'ufps.edu.co') {
            return false
        }
        return true
    }

    async sendMail(mail: string, name: string, lastnames: string) {
        const msg = {
            to: mail, // Change to your recipient
            from: process.env.EMAIL!, // Change to your verified sender
            subject: "UFPS - INGENIERIA DE SISTEMAS",
            text: `Hi ${name} ${lastnames}`,
            html: `
          <body style="width: 800px">
            <div style="background-color: #d12f50; width: 100%; padding: 3rem 0;">
              <div style="text-align: center; background-color: #ffffff; margin: 0 auto; width: 80%; border-radius: 8px;">
                  <img style="margin-top: 3rem; width: 190px"
                      src="https://ww2.ufps.edu.co/public/archivos/elementos_corporativos/logoufps.png" alt="logo">
                  <p style="margin: 1rem 0; font-size: 25px;">Confirmación de cuenta</p>
                  <p style="color: #424242;">Has sido registrado en la plataforma APA (Adminstración de proyectos de aula)<br>Puedes ingresar dando click en el siguiente botón.
                  </p>
                  <div style="margin: 2rem auto; width: 120px; background-color: #4f46e5; padding: 8px; border-radius: 6px; ">
                      <a style="color: #ffffff; text-decoration: none" href="">Continuar</a>
                  </div>
                  <div style="width: 100%; border-top: 2px solid #a5b4fc; padding: 1rem 0">
                      <p>Copyright © 2022 Universidad Francisco De Paula Santander <br> Todos los derechos reservados.</p>
                  </div>
              </div>
            </div>
          </body>`,
        };

        await sgMail
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode);
                console.log(response[0].headers);
            })
            .catch((error) => {
                console.error(error);
            });
    }
}