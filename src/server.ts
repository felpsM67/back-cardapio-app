import sequelize from "./database";
import { ENV } from "./config/env";
import { initializeDatabaseAndServer } from "./config/initializeDatabaseAndServer";


// Função para iniciar o servidor em uma porta específica
const startServer = async (port: number) => {
  const app = (await import("./config/app")).default;
  
  app
    .listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(
        `Documentação da API disponível em http://localhost:${port}/api-docs`
      );
    })
    .on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Porta ${port} está ocupada.`);
      } else {
        console.error(err);
      }
    });
};


initializeDatabaseAndServer(sequelize);
// Iniciar o servidor na porta inicial
// Sincronizar o banco de dados e iniciar o servidor
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado");
    startServer(Number(ENV.PORT));
  })
  .catch((err: any) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });