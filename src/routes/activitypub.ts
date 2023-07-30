import express, { Router } from 'express';
const r = Router();
// @ts-ignore
import ActivityPubExpress from 'activitypub-express';


const routes = {
    actor: '/u/:actor',
    object: '/o/:id',
    activity: '/s/:id',
    inbox: '/u/:actor/inbox',
    outbox: '/u/:actor/outbox',
    followers: '/u/:actor/followers',
    following: '/u/:actor/following',
    liked: '/u/:actor/liked',
    collections: '/u/:actor/c/:id',
    blocked: '/u/:actor/blocked',
    rejections: '/u/:actor/rejections',
    rejected: '/u/:actor/rejected',
    shares: '/s/:id/shares',
    likes: '/s/:id/likes'
  }
  const apex = new ActivityPubExpress({
    name: 'JibbaJabbaX',
    version: '1.0.0',
    domain: 'localhost',
    actorParam: 'actor',
    objectParam: 'id',
    activityParam: 'id',
    routes,
    endpoints: {
      proxyUrl: 'https://localhost/proxy'
    }
  })

  r.use(
    express.json({ type: apex.consts.jsonldTypes }),
    express.urlencoded({ extended: true }),
    apex
  )
  // define routes using prepacakged middleware collections
  r.route(routes.inbox)
    .get(apex.net.inbox.get)
    .post(apex.net.inbox.post)
  r.route(routes.outbox)
    .get(apex.net.outbox.get)
    .post(apex.net.outbox.post)
  r.get(routes.actor, apex.net.actor.get)
  r.get(routes.followers, apex.net.followers.get)
  r.get(routes.following, apex.net.following.get)
  r.get(routes.liked, apex.net.liked.get)
  r.get(routes.object, apex.net.object.get)
  r.get(routes.activity, apex.net.activityStream.get)
  r.get(routes.shares, apex.net.shares.get)
  r.get(routes.likes, apex.net.likes.get)
  r.get('/.well-known/webfinger', apex.net.webfinger.get)
  r.get('/.well-known/nodeinfo', apex.net.nodeInfoLocation.get)
  r.get('/nodeinfo/:version', apex.net.nodeInfo.get)
  r.post('/proxy', apex.net.proxy.post)
  // custom side-effects for your app

export default r;
export { apex };
