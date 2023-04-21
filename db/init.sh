#!/bin/bash
/opt/lampp/lampp start
/opt/lampp/bin/mysql -h localhost -P 3306 -u root -e "CREATE DATABASE IF NOT EXISTS myapp;"
/opt/lampp/bin/mysql -h localhost -P 3306 -u root myapp < /db/tables.sql
