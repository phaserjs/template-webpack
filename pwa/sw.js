/**
 * You should only modify this, if you know what you are doing.
 * This phaser template is using workbox (https://developers.google.com/web/tools/workbox/)
 * to precache all assets.
 * It uses the InjectManifest function from 'workbox-webpack-plugin' inside
 * webpack/webpack.common.js
 */
import { precacheAndRoute } from 'workbox-precaching'

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)
