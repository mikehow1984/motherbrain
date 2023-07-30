import { MongoClient } from 'mongodb';
// @ts-ignore
import ActivityPubExpress from 'activitypub-express';


const client = new MongoClient('mongodb://localhost:27017')

const bootstrap = async (apex: ActivityPubExpress) => client.connect()
  .then(() => {
    apex.store.db = client.db('activitypub');
    return apex.store.setup();
  })

export { bootstrap };
