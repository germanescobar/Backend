import { config } from 'dotenv';
import invariant from 'invariant';
config();

invariant(process.env.APP_PORT, 'A port must be declared');

export default {
  PORT: process.env.APP_PORT || 4545,
};
