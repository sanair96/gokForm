#GOK FORM

###Steps to run:

1. Run `yarn prod` to create the tables, and stop the process
2. Run `yarn client-build` to build client packages.
3. Run `node migrateCSV.js` to copy the group data to DB.
4. Finally Run `yarn prod` and the server will be up running.

Db name - `dbname`, Db Username - `dbusername`, DB Password - `dbpassword`, db hostname - `hostname` environment variables have to be set.
