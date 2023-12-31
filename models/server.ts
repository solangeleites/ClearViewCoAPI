import express, { Express } from 'express';
import cors from 'cors';
import { DBConnection } from '../database/config';
import authRoutes from '../routes/auth';
import ordersRoutes from '../routes/orders'
import issueRoutes from '../routes/issue'


export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  issuesPath: string;
  front: string | undefined;


  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/auth';
    this.ordersPath = '/orders'
    this.issuesPath = '/issues'
    this.front = process.env.URL_FRONT;


    this.conectarDB();
    this.middlewares();

    this.routes();
  }

  async conectarDB(): Promise<void> {
    await DBConnection();
  }
  middlewares(): void {
    const corsOptions= {
      origin: `${this.front}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    }
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.ordersPath, ordersRoutes)
    this.app.use(this.issuesPath, issueRoutes)
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`corriendo en el puerto ${this.port}`);
    });
  }
};


