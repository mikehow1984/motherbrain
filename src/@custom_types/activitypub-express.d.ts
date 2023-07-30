declare module 'activitypub-express'

import { Application } from 'express';

type ExpressAppCallback = (parent: Application<Record, any>) => void;

export type ActivityPubExpressAppProps = Application<Record, any> & {
    activity: { type: string },
    actor: string,
}