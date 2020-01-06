# MYSQL

If the application you are building requires the use of __MYSQL__ then these instruction will help you get started.

The database server will be automatically configured with a default root password as well as a default user and password set in the docker-compose file. Change it to whatever you wish.
```yml
    environment:
      - MYSQL_DATABASE=development
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=password
      - MYSQL_ROOT_PASSWORD=password
```

## First time setup

The __MYSQL__ database is ready to use, however if you wish to make modifications yourself you can run just the database using `docker-compose.database.yml` as follows.
```bash
$ docker-compose -f ./docker-compose.database.yml up --build
```

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
$ docker exec -it starterkit-nodejs_mysqldb_1 mysql -u root -p development
```

## Creating application database

Docker will have created a default application database based on the environment variables set in the docker-compose file.
```yml
    environment:
      - MYSQL_DATABASE=development
```
If your application requires additional databases you can create them using the following SQL:
```sql
CREATE DATABASE [db_name];
```

## Creating default application user

Docker will have created a default application user and password based on the environment variables set in the docker-compose file.
```yml
    environment:
      - MYSQL_DATABASE=development
      - MYSQL_USER=admin
      - MYSQL_PASSWORD=password
```

To create an additional login use the following SQL:
```sql
CREATE USER '[login_name]'@'localhost' IDENTIFIED BY '[new_password]';
```

# DOCKER COMPOSE

Now you can update all the docker compose files with the correct app environment variables for `MYSQL`.
```yml
  app:
    environment:
      - DB1_HOST=mysqldb
      - DB1_TYPE=mysql
      - DB1_DATABASE=[db_name]
      - DB1_PORT=3306
      - DB1_USER=[login_name]
      - DB1_PASSWORD=[new_password]
```

__NOTE:__ If the application fails to connect with the following error, see [Troubleshooting](#Troubleshooting) `Fix authentication error`.
```bash
Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```

# Troubleshooting

## Fix authentication error

__MYSQL 8__ has a new default authentication method not currently supported by the mysql node client. To fix this, connect to the mysql instance and run the following command:
```sql
ALTER USER '[login_name]'@'%' IDENTIFIED WITH mysql_native_password BY '[new_password]';
```