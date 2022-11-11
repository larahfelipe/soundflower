import { envs, makeServer } from '@/config';

const bootstrap = async () => {
  try {
    const app = await makeServer();

    app.listen({ port: +envs.port, host: envs.host }, (error, address) => {
      if (error) throw error;

      console.log(`\n> Server listening at ${address}\n`);
    });
  } catch (e) {
    console.error(e);
  }
};

bootstrap();
