import { envs, makeApp } from '@/config';

const bootstrap = async () => {
  try {
    const app = await makeApp();

    app.listen({ host: envs.host, port: +envs.port }, (error, address) => {
      if (error) throw error;

      console.log(`\nServer listening at ${address}\n`);
    });
  } catch (e) {
    console.error(e);
  }
};

bootstrap();
