const giftController = require("./controllers/giftController");

const router = (app) => {
    // Cria um novo presente
    app.post('/gifts', async (req, res) => {
        const payload = { ...req.body };
        const { status, data } = await giftController.createGift(payload);
        res.status(status).send(data);
    });

    // Lista todos os presentes
    app.get('/gifts', async (req, res) => {
        const { status, data } = await giftController.getGifts();
        res.status(status).send(data);
    });

    // Atualiza um presente por ID
    app.put('/gifts/:id', async (req, res) => {
        const { id } = req.params;
        const payload = { ...req.body };
        const { status, data } = await giftController.updateGift({ payload, id });
        res.status(status).send(data);
    });

    // Remove um presente por ID
    app.delete('/gifts/:id', async (req, res) => {
        const { id } = req.params;
        const { status, data } = await giftController.deleteGift({ id });
        res.status(status).send(data);
    });

    // Seleciona um presente
    app.post('/gifts/:giftId/select', async (req, res) => {
        const { giftId } = req.params;
        const { nome, email } = req.body;
        const { status, data } = await giftController.selectGift({ giftId, nome, email });
        res.status(status).send(data);
    });

    // Obtém a seleção de um presente
    app.get('/gifts/:giftId/selection', async (req, res) => {
        const { giftId } = req.params;
        const { status, data } = await giftController.getSelectionByGiftId({ giftId });
        res.status(status).send(data);
    });
};

module.exports = router;
