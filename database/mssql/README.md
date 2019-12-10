
# MSSQL

If the application you are building requires the use of __SQL Server__ then these instruction will help you get started.

The database server will be automatically configured with a default SA password set in the docker-compose file. Change it to whatever you wish.
```yml
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=p@ssword12345
```

## First time setup

When creating a new database, use `docker-compose.database.yml` to run only the database server.
```bash
$ docker-compose -f ./docker-compose.database.yml up --build
```

__NOTE:__ On Mac __SQL Server__ may error out due to permissions issues on the mounted volume __mssql-vol__.
The error may be as follows:
```bash
This container is running as user mssql.
Your master database file is owned by root.
To learn more visit https://go.microsoft.com/fwlink/?linkid=2099216.
sqlservr: Unable to open /var/opt/mssql/.system/instance_id: Permission denied (13)
/opt/mssql/bin/sqlservr: Unable to open /var/opt/mssql/.system//instance_id: Permission denied (13)
```

See [Troubleshooting section](#Troubleshooting) to `Fix permissions error`.

## Connecting to the database

With the database now running you can use the following command to find the containers' name.
```bash
$ docker-compose -f docker-compose.database.yml ps

#output
             Name                           Command               State                 Ports              
-----------------------------------------------------------------------------------------------------------
starterkit-nodejs_mssqldb_1      /opt/mssql/bin/permissions ...   Up      0.0.0.0:1433->1433/tcp           
starterkit-nodejs_mysqldb_1      docker-entrypoint.sh mysqld      Up      0.0.0.0:3306->3306/tcp, 33060/tcp
starterkit-nodejs_postgresdb_1   docker-entrypoint.sh postgres    Up      0.0.0.0:5432->5432/tcp 
```

Using the name output above you can connect to the database using docker.
```bash
$ docker exec -it starterkit-nodejs_mssqldb_1 /opt/mssql-tools/bin/sqlcmd -S 0.0.0.0 -U SA -P "[DEFAULT SA PASSWORD]"
```


## Creating application database

Depending on your applications requirements you can create one or more databases.

```sql
CREATE DATABASE [db_name];
GO
```

## Creating default application user

Use the following sql commands order to create the login the application will use to connect to the database:
```sql
USE master
GO
CREATE LOGIN [login_name] WITH PASSWORD=N'p@ssword12345', DEFAULT_DATABASE=master, CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF;
GO
USE [db_name]
CREATE USER [user_name] FOR LOGIN [login_name];
GO
ALTER ROLE db_owner ADD MEMBER [user_name];
GO
```

# DOCKER COMPOSE

Now you can update the docker compose files with the correct app environment variables for `SQL Server`.
```bash
  app:
    environment:
      - DB1_HOST=mssqldb
      - DB1_TYPE=mssql
      - DB1_DATABASE=[db_name]
      - DB1_PORT=1433
      - DB1_PASSWORD=[login_password]
```

# Troubleshooting

## Fix permissions error

__IMPORTANT__: Make sure the database docker container is not running first.

In order to fix the volume permission error we must first mount the `mssql-vol` volume on to an interactive ubuntu instance. We can use docker to do so.

```bash
$ docker run \
    --name 'permissionsarehard' \
    -v mssql-vol:/var/opt/mssql \
    -it ubuntu:latest
```

Let's adjust the permission on the directories and files `sql server` needs access to.

```bash
ls -laR /var/opt/mssql
chgrp -R 0 /var/opt/mssql
chmod -R g=u /var/opt/mssql
chown -R 10001:0 /var/opt/mssql
ls -laR /var/opt/mssql
exit
```

Now we can start up our database container once more.
```bash
$ docker-compose -f ./docker-compose.database.yml up --build
```

SQL Server should start up without any errors now.
