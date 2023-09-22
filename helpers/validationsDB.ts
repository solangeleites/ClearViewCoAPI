import { sendEmail } from '../mailer/mailer';
import Usuario, {IUser} from '../models/user'

export const existeEmail = async (email:string):Promise<void> => {
    const existeMail: IUser | null = await Usuario.findOne({email});

    if(existeMail && existeMail.verified){
        throw new Error(`El email ${email} ya esta registrado`)
    }
    if(existeMail && !existeMail.verified){
        await sendEmail(email,existeMail.code as string)
        throw new Error (`El usuario ya se encuentra registrado. Se envió nuevamente el código de verificación a ${email}`)
    }
}