const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cria um novo presente
const createGift = async (req, res) => {
    const { nome, imagem, quantidade } = req.body;
    try {
        const newGift = await prisma.gift.create({
            data: { nome, imagem, quantidade }
        });
        return res.status(201).json(newGift);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao criar o presente' });
    }
};

// Lista todos os presentes
const getGifts = async (req, res) => {
    try {
        const gifts = await prisma.gift.findMany();
        return res.status(200).json(gifts);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar os presentes' });
    }
};

// Atualiza um presente por ID
const updateGift = async (req, res) => {
    const { id } = req.params;
    const { nome, imagem, quantidade } = req.body;
    try {
        const updatedGift = await prisma.gift.update({
            where: { id },
            data: { nome, imagem, quantidade }
        });
        return res.status(200).json(updatedGift);
    } catch (error) {
        return res.status(404).json({ message: 'Presente não encontrado' });
    }
};

// Remove um presente por ID
const deleteGift = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.gift.delete({ where: { id } });
        return res.status(200).json({ message: 'Presente removido com sucesso' });
    } catch (error) {
        return res.status(404).json({ message: 'Presente não encontrado' });
    }
};

// Seleciona um presente
const selectGift = async (req, res) => {
    const { giftId } = req.params;
    const { nome, email } = req.body;
    try {
        const selection = await prisma.selection.create({
            data: {
                nome,
                email,
                gift: { connect: { id: giftId } }
            }
        });
        return res.status(201).json(selection);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao selecionar o presente' });
    }
};

// Obtém a seleção de um presente
const getSelectionByGiftId = async (req, res) => {
    const { giftId } = req.params;
    try {
        const selection = await prisma.selection.findUnique({
            where: { giftId }
        });
        if (!selection) {
            return res.status(404).json({ message: 'Seleção não encontrada' });
        }
        return res.status(200).json(selection);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar a seleção' });
    }
};

module.exports = {
    createGift,
    getGifts,
    updateGift,
    deleteGift,
    selectGift,
    getSelectionByGiftId
};
