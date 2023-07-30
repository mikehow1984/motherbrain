import express, {Request,Response,Application} from 'express';
// @ts-ignore
import authRouter from '@motherbrain/routes/auth'
// @ts-ignore
import activityPubRouter, { apex } from '@motherbrain/routes/activitypub';
// @ts-ignore
import apidocRouter from '@motherbrain/routes/apidocs';
// @ts-ignore
import { bootstrap as dbBootstrap } from '@motherbrain/db/bootstrap';
import { ActivityPubExpressAppProps } from '@custom_types/activitypub-express';

const PORT = 6969;
const app:Application = express();

app.use('/api/v1', activityPubRouter);
app.use('/auth', authRouter);
app.use('/api/docs', apidocRouter);

// TODO: split out logging middleware
app.on('/api/v1/apex-outbox', (msg: ActivityPubExpressAppProps) => {
  if (msg.activity.type === 'Create') {
    console.log(`New ${msg.object.type} from ${msg.actor}`)
  }
})
app.on('/api/v1/apex-inbox', (msg: ActivityPubExpressAppProps) => {
  if (msg.activity.type === 'Create') {
    console.log(`New ${msg.object.type} from ${msg.actor} to ${msg.recipient}`)
  }
})

dbBootstrap(apex)
  .then(() => {
    app.listen(PORT, () => console.log(`apex app listening on port ${PORT}`))
  });
