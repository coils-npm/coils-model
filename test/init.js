const exec = require('child_process').exec;

function init(cb) {
	exec(`NODE_ENV=test sequelize db:drop`, (err, stdout, stderr) => {
		exec(`NODE_ENV=test sequelize db:create`, (err, stdout, stderr) => {
			// exec(`NODE_ENV=test sequelize model:generate --name User --attributes username:string,age:integer --underscored`, (err, stdout, stderr) => {
			exec(`NODE_ENV=test sequelize db:migrate`, async (err, stdout, stderr) => {
				console.log('init finish, begin test')
				cb()
			})
			// })
		})
	})
}
module.exports = init

