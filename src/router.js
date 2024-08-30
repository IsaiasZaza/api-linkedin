const userController = require("./controllers/userController");

const routes = (app) => {
    app.get('/users', async (req, res) => {
        const { status, data } = await userController.getUser();
        res.status(status).send(data);
    });

    app.get('/user/:id', async (req, res) => {
        const { id } = req.params;
        const { status, data } = await userController.getUserById({ id });
        res.status(status).send(data);
    });


    app.post('/users', async (req, res) => {
        const payload = { ...req.body };
        const { status, data } = await userController.createUser(payload);
        res.status(status).send(data);
    });

    app.delete('/user/:id', async (req, res) => {
        const { id } = req.params;
        const { status, data } = await userController.deleteUser({ id })
        res.status(status).send(data);
    })

    app.put('/user/:id', async (req, res) => {
        const { id } = req.params;
        const { nome, email } = req.body
        const { status, data } = await userController.updateUser({ id, nome, email })
        res.status(status).send(data);
    });
};

module.exports = routes;
