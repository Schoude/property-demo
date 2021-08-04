// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.fetchevent.d.ts" />
// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.ns.d.ts" />
// <reference path="https://raw.githubusercontent.com/denoland/deployctl/main/types/deploy.window.d.ts" />

import { Application } from "https://deno.land/x/oak@v7.7.0/mod.ts";
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts'

const app = new Application();

app.use(oakCors({
  origin: '*',
  methods: ['GET']
}))

app.use((ctx) => {
  const units = [
    {
      "name": "1.0.1",
      "areaSize": 65,
      "numberOfRooms": 3,
      "basePrice": 400000
    },
    {
      "name": "1.0.2",
      "areaSize": 45,
      "numberOfRooms": 2,
      "basePrice": 300000
    },
    {
      "name": "1.0.3",
      "areaSize": 98,
      "numberOfRooms": 4,
      "basePrice": 530000
    },
    {
      "name": "1.1.1",
      "areaSize": 52,
      "numberOfRooms": 3,
      "basePrice": 230000
    },
    {
      "name": "1.1.2",
      "areaSize": 85,
      "numberOfRooms": 4,
      "basePrice": 450000
    },
    {
      "name": "1.1.3",
      "areaSize": 120,
      "numberOfRooms": 5,
      "basePrice": 750000
    }
  ]
  ctx.response.body = units;
});

/* ... register middleware ... */

addEventListener("fetch", app.fetchEventHandler());