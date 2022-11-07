import { envs } from '@/config';

import { makeServer } from './server';

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
