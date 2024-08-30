const express = require('express');
const routes = require('./router');

module.exports = () => {
    const port = 3000;
    const app = express();

    app.use(express.json());

    routes(app);

    app.listen(port, '0.0.0.0', (error) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`Servidor rodando na porta ${port}`);
    });
};
