const assert = require('assert')
const exec = require('child_process').exec;
const CoilsModel = require('../index')
let application = {}
CoilsModel.mounted(application)
let [ User ] = application.$Models

describe("init project", function () {
	it('resolves', (done) => {
		exec(`sequelize db:drop`, (err, stdout, stderr) => {
			exec(`sequelize db:create`, (err, stdout, stderr) => {
				// exec(`NODE_ENV=test sequelize model:generate --name User --attributes username:string,age:integer --underscored`, (err, stdout, stderr) => {
				exec(`sequelize db:migrate`, async (err, stdout, stderr) => {
					console.log('init finish, begin test')
					done()
				})
				// })
			})
		})
	})
})

describe("test create", function () {
	it("create, should success", async () => {
		let u = await User.create({username: 'create', age: 10})
		await User.create({username: 'create2', age: 10})
		await User.create({username: 'create3', age: 10})
		await User.create({username: 'create4', age: 10})
		await User.create({username: 'create5', age: 10})
		await User.create({username: 'create6', age: 10})
		await User.create({username: 'create7', age: 10})
		await User.create({username: 'create8', age: 10})
		await User.create({username: 'create9', age: 10})
		await User.create({username: 'create10', age: 10})
		await User.create({username: 'create11', age: 10})
		await User.create({username: 'create12', age: 10})
		await User.create({username: 'create13', age: 10})
		await User.create({username: 'create14', age: 10})
		await User.create({username: 'create15', age: 10})
		await User.create({username: 'create16', age: 10})
		await User.create({username: 'create17', age: 10})
		await User.create({username: 'create18', age: 10})
		await User.create({username: 'create19', age: 10})
		await User.create({username: 'create20', age: 10})
		await User.create({username: 'create21', age: 10})
		await User.create({username: 'create21', age: 10})
		assert( u.id === 1, 'create fail')
	})
})

describe("test update", function () {
	it("update, should success", async () => {
		let u = await User.find(1)
		let u2 = await u.update({username: 'updated'})
		assert( u2.id && u2.username === 'updated', 'update fail')
	})
})

describe("test find", function () {
	it("find, should success", async () => {
		let u = await User.find(1)
		assert( u.id === 1, 'find fail')
	})
})

describe("test find all", function () {
	it("find all, should success", async () => {
		let users = await User.all()
		assert( users[0].id === 1, 'find all fail')
	})
})

describe("test order", function () {
	it("find all, should success", async () => {
		let users = await User.all().order([['id', 'desc']])
		assert( users[0].id > 1, 'find all fail')
	})
})

describe("test where", function () {
	it("where, should success", async () => {
		let users = await User.where({username: 'create21'}).where({id: 21}).order([['id', 'desc']])
		assert( users.length === 1, 'where fail')
	})
})