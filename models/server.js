import express, { json } from 'express';
import dbConnection from '../database/config.js';
import cellRoutes from '../routes/cellRoute.js';

class Server {
    constructor() {
        this.app = express();
        this.middlewares();
        this.dbConnection();
        this.routes();
        this.listen();
    }

    middlewares() {
        this.app.use(json());
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use('/api', cellRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Server is running');
        });
    }
}

export default Server;
