import mongoose from 'mongoose';

export const DBConnection = async (): Promise<void> => {
  try {
    const DBurl = process.env.DB_URL;
    if (!DBurl) {
      throw new Error('La url no esta definiida en los .env');
    }
    await mongoose.connect(DBurl);
    console.log('Base de datos online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de conectar la base de datos');
  }
};
