const assert = require('assert')
const exec = require('child_process').exec;
const CoilsModel = require('../index')
let application = {}
CoilsModel.mounted(application)
let [ User ] = application.$Models

describe("init project", function () {
	it('resolves', (done) => {
		require('./init')(done)
		assert(true, 'init')
	})
})

describe("test create", function () {
	it("create, should success", async () => {
		let u = await User.create({username: 'create', age: 10})
		assert( u.id === 1, 'create fail')
	})
})

describe("test update", function () {
	it("update, should success", async () => {
		let u = await User.find(1)
		let u2 = await u.update({username: 'updated'})
		assert( u2.id && u2.username === 'updated', 'create fail')
	})
})