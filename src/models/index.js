// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Emision, Factor } = initSchema(schema);

export {
  Emision,
  Factor
};