# Grakkit Auto Reload

This is a project demonstrating one method of auto-reload (on save) with Grakkit. Inspired by Create-React-App's WebpackDevServer.

I used Java Express (which is inspired from NodeJS Express) for the backend server within MC. You can swap it out. You could use 
Websockets as well. 

# Initial Configuration

1. Run `yarn install` (or change over to `npm install`)
2. Place your server jar in the `server` folder (such as paper.jar). 
3. Add the grakkit jar in the `/server/plugins` folder.
4. Run `yarn start` / `npm run start` first to sync files.
5. Run `yarn start:server` to start mc server
  * You may need to tweak the startup to your configuration.

# Startup

1. Run `yarn start`
2. Run `yarn start:server`

# Info

## Deps Folder

When developing plugins, you may need to hook into additional dependencies. You can add those jars to the `./deps` folder. 
If you need further customization, you can update `scripts/start/index.ts`

## Startup Script

The startup script is forked from Create-React-App's WebpackDevServer. It *works*, but isn't perfect. 