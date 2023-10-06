// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Company, Factor } = initSchema(schema);

export {
  Company,
  Factor
};