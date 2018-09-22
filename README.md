# the npm dependent Sequelize  
[application._Models]

### install
```
npm i coils-model -S
```

### Usgae
```
application.use(require('coils-model')[, options])
```
- `options.sequelizercPath`, default: `path.resolve(process.cwd(), '.sequelizerc')`


### Install `sequelize` dependence
```
# npm install --save sequelize
# And one of the following:
$ npm install --save mysql2
$ npm install --save sqlite3
$ npm install --save pg pg-hstore
$ npm install --save tedious // MSSQL
```


### create `.sequelizerc` in project root path and write 
eg:
```
const path = require('path');
module.exports = {
  'config': path.resolve('config', 'database.json'),
  'models-path': path.resolve('app', 'models', 'defines'),
  'seeders-path': path.resolve('db', 'seeders'),
  'migrations-path': path.resolve('db', 'migrations')
}
```
* `app/models` will your Models, base: [`path.resolve(modelsPath, '../')`]
here you can create `ApplicationRecord.js` as your base class Model.
* `app/models/defines` will put sequelize model defines


### Install `sequelize-cli` For Create Migration From Command Line 
http://docs.sequelizejs.com/manual/tutorial/migrations.html
```
$ npm install sequelize-cli -D
```

helper
```
sequelize help
```

init
```
$ sequelize init
```

create db
```
$ sequelize db:create [--env production]
```
drop
```
$ sequelize db:drop [--env production]
```
create model
```
sequelize model:generate --name User --attributes username:string,email:string --underscored
sequelize model:generate --name Wallet22 --attributes user_id:integer,amount:decimal --underscored
```

run migrate
```
sequelize db:migrate
```
rollback
```
sequelize db:migrate:undo
sequelize db:migrate:undo:all
sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
```
seed
```
sequelize seed:generate --name demo-user
```
run seed
```
sequelize db:seed:all
```
rollback run seed
```
sequelize db:seed:undo
sequelize db:seed:undo:all
```

#### Model
- [Data types](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types)
- [Validations](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)
- [Config](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration)


#### Sequelize使用相关文档
- http://docs.sequelizejs.com/
- https://segmentfault.com/a/1190000003987871#articleHeader17
