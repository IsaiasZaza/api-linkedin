const { PrismaClient } = require('@prisma/client');
const { ERROR_MESSAGES, SUCCESS_MESSAGES, USER_ROLES_DESCRIPTION, HTTP_STATUS_CODES } = require("../common/utils/enum")

const prisma = new PrismaClient();

const createUser = async ({ id, nome, email, senha }) => {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return {
                status: HTTP_STATUS_CODES.CONFLICT,
                data: { message: ERROR_MESSAGES.USER_ERROR_EMAIL }
            };
        }
        if (!nome || !email || !senha) {
            return {
                status: HTTP_STATUS_CODES.BAD_REQUEST,
                data: { message: ERROR_MESSAGES.FILDS_INVALID }
            };
        }

        const newUser = await prisma.user.create({
            data: { id, nome, email, senha }
        });
        return {
            status: HTTP_STATUS_CODES.CREATED,
            data: newUser
        };
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: { message: ERROR_MESSAGES.ERROR_CREAT_USER }
        };
    }
};

const getUser = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                nome: true,
                email: true
            }
        });
        return {
            status: HTTP_STATUS_CODES.OK,
            data: users
        };
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            data: { message: ERROR_MESSAGES.USERS_NOT_EXIST }
        };
    }
};

const getUserById = async ({ id }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: {
                    message: ERROR_MESSAGES.USERS_NOT_EXIST,
                },
            };
        }

        return {
            status: HTTP_STATUS_CODES.OK,
            data: user,
        };
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: { message: ERROR_MESSAGES.USER_NOT_ID },
        };
    }
};

const deleteUser = async ({ id }) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: {
                    message: ERROR_MESSAGES.USERS_NOT_EXIST
                }
            }
        }
        await prisma.user.delete({ where: { id } })
        return {
            status: HTTP_STATUS_CODES.OK,
            data: {
                message: ERROR_MESSAGES.USER_DELETED
            }
        }
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: {
                message: ERROR_MESSAGES.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const updateUser = async ({ id, nome, email }) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: {
                    message: ERROR_MESSAGES.USER_NOT_FOUND
                }
            }
        }
        await prisma.user.update({
            where: { id },
            data: {
                nome,
                email
            }
        })
        return {
            status: HTTP_STATUS_CODES.OK,
            data: user
        }
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: {
                message: ERROR_MESSAGES.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = { createUser, getUser, getUserById, deleteUser, updateUser }