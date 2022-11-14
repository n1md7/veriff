import express from 'express';

import { xRequestId } from './middlewares/x-request-id.middleware';
import { errorHandler } from './middlewares/error.handler.middleware';
import { session } from './routes/sessions.route';
import { Logger } from './utils/logger';
import { EnvUtils } from './utils';

const app = express();
const port = EnvUtils.getServerPort();

app.use(xRequestId());
app.use('/api/sessions', session);
app.use(errorHandler());

app.listen(port, '0.0.0.0', () => {
  Logger.log(`Service is listening at http://localhost:${port}`, 'Init');
});

export { app };
