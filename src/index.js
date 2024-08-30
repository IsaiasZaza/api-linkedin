const serverConfig = require('./server');

const init = async () => {
    try {
        await serverConfig();
        console.log('Servidor iniciado com sucesso');
    } catch (error) {
        console.error(`Erro na inicialização do servidor: ${error}`);
    }
};

init();
