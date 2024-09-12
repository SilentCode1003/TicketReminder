import session from 'express-session'
import MongoStore from 'connect-mongo'
import { CONFIG } from '../config/env.config.js'

const options = {
  store: new MongoStore({ mongoUrl: CONFIG.MONGODB_URl }),
  name: CONFIG.SESSION_COOKIE_NAME,
  secret: CONFIG.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Always set to true to avoid XSS
    sameSite: 'lax', // The best setting would be 'strict' but server and client need to be served in same site. See: https://web.dev/articles/same-site-same-origin
    secure: false, // If true, the user agent will only include the cookie if transmitted over https. See: https://en.wikipedia.org/wiki/Secure_cookie
    // TODO: add a maxAge property
    // maxAge: , // cookies without a Max-age or Expires attribute – are deleted when the current session ends. The browser defines when the "current session" ends, and some browsers use session restoring when restarting. This can cause session cookies to last indefinitely. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
  },
}

export const initSession = (app) => {
  app.use(session(options))
}