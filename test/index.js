const assert = require('assert')
const exec = require('child_process').exec;
const CoilsModel = require('../lib/index')
let application = {}
CoilsModel.mounted(application)
let { User } = application._Models

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
		await User.create({username: 'create20', age: 0})
		await User.create({username: 'create21', age: 25})
		await User.create({username: 'create21', age: 100})
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
		
		let users2 = await User.where({id: [1, 2, 3]})
		assert( users2.length === 3, 'where fail')
	})
})

describe("test not", function () {
	it("not, should success", async () => {
		let count = await User.count()
		let users = await User.not({id: 4})
		let users2 = await User.not({id: [1, 2, 3]})
		assert( users.length === count - 1, 'not fail')
		assert( users2.length === count - 3, 'not fail')
	})
})

describe("test min", function () {
	it("min, should success", async () => {
		let min = await User.min('age')
		assert( min === 0, 'min fail')
	})
})

describe("test max", function () {
	it("max, should success", async () => {
		let max = await User.max('age')
		assert( max === 100, 'max fail')
	})
})

describe("test transaction", function () {
	it("transaction, should success", async () => {
		await User.transaction(async(t) => {
			await User.find(1)
			await User.find(2)
			assert( User._Sequelize._cls.get('transaction') === t, 'auto transaction fail')
		})
	})
})

describe("test transaction lock", function () {
	it("transaction, should success", async () => {
		let u = await User.find(1)
		await u.withLock(async (t) => {
			let u2 = await User.find(2)
			await u2.update({username: 'u2 update'})
			assert( User._Sequelize._cls.get('transaction') === t, 'auto transaction fail')
		})
	})
})

// lock 会创建一个transaction， 如果lock嵌套，内部transaction就会嵌套，但是内部，会判断，当创建的transaction，判断当前执行代码已经在transaction中，将自动使用上层transaction
describe("test transaction lock nest", function () {
	it("transaction, should success", async () => {
		let u = await User.find(1)
		await u.withLock(async (t) => {
			let u2 = await User.find(2)
			await u2.update({username: 'u2 update'})
			let u3 = await User.find(3)
			await u3.withLock(async (t2) => {
				await u3.update({username: 'u3 update'})
				assert( t === t2 && User._Sequelize._cls.get('transaction') === t, 'auto transaction fail')
			})
		})
	})
})

describe("test paginate", function () {
	it("paginate, should success", async () => {
		let users = await await User.paginate(1, 15)
		assert( users.length === 15, 'paginate fail')
	})
})

describe("test findOrCreateBy", function () {
	it("findOrCreateBy, should success", async () => {
		let u1 = await User.findOrCreateBy({username: 'findOrCreateBy1'}, (user) => {
			user.age = 100
		})
		assert( u1.id && u1.age === 100, 'findOrCreateBy fail')
		
		let u2 = await User.findOrCreateBy({username: 'findOrCreateBy2'})
		assert( u2.id && !u2.age, 'findOrCreateBy fail')
	})
})