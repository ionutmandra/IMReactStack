This document provides the necessary steps taken in order to deploy this app on a server running Windows and IIS. 
These steps include the build process which can later be automatized.

Steps are done on a VM which runs on top of `dnwserver`. Unless specified otherwise, assume each step is done on the VM and not on the server itself.

#1. Setup Windows VM and IIS site

- we had the `teamcity` VM running on `dnwserver` and used that. Optionally create a blank VM and install IIS, ASP.NET, etc.
- create site in IIS for the app, on a custom port (> 1024)
- **on `dnwserver`** setup ARR to forward requests to our app on port 80 to the VM on the custom port (Lau did it this time)
- in IIS make sure that the `Application Pool Identity` for the site is set to `Local System`

#2. Installing technology stack components

- install node.js [from here](https://nodejs.org/en/download/). At the time of this writing it was [version 4.4.4](https://nodejs.org/dist/v4.4.4/node-v4.4.4-x64.msi)
- for older node versions `node -v` use [NVM](https://github.com/coreybutler/nvm-windows) to update `nvm install latest` then `nvm use <version>`
- install [iisnode](https://github.com/Azure/iisnode)
- in root add `web.config` adapted [from here](https://tomasz.janczuk.org/2012/05/yaml-configuration-support-in-iisnode.html)
- in root add `iisnode.yml` adapted [from here](https://github.com/tjanczuk/iisnode/blob/master/src/samples/configuration/iisnode.yml)
- make sure the application does `app.listen(port);` the port is coming from `process.env.PORT` if specified, this is needed for `iisnode` to make use of clustering processes

#3. Launch

Fire up the site and have fun. Add solutions to any issues you encouter to this document.
