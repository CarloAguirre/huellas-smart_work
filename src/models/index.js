// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Factor } = initSchema(schema);

export {
  Factor
};