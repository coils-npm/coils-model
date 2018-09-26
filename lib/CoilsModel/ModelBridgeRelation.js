let CoilsModelRelation = require('../CoilsModelRelaction')
module.exports = function (Sequelize) {
	let SequelizeModelEx = require('./SequelizeModelEx')(Sequelize)
	class ModelBridgeRelation extends SequelizeModelEx {
		static get newRelation () {
			return new Proxy(new CoilsModelRelation(this), {
				get (target, prop) {
					if(target[prop]) {
						return target[prop];
					} else if (prop === 'then') {
						let promise = target.promise()
						return promise.then.bind(promise)
					}
				}
			})
		}
		static sequlizeMethod(method, ...args) {
			return super[method](...args)
		}
		// query
		static find (primaryKeyValue) { return this.newRelation.find(...arguments) }
		static findBy (options) { return this.newRelation.findBy(...arguments) }
		static all () { return this.newRelation.all(...arguments) }
		static where (options) { return this.newRelation.where(...arguments) }
		static not (options) { return this.newRelation.not(...arguments) }
		static min (field, options = {}) { return this.newRelation.min(...arguments) }
		static max (field, options = {}) { return this.newRelation.max(...arguments) }
		static count () { return this.newRelation.count(...arguments) }
		static select (attributes) { return this.newRelation.select(...arguments) }
		static between (options) { return this.newRelation.between(...arguments) }
		static notBetween (options) { return this.newRelation.notBetween(...arguments) }
		static like (options) { return this.newRelation.like(...arguments) }
		static notLike (options) { return this.newRelation.notLike(...arguments) }
		static regexp (options) { return this.newRelation.regexp(...arguments) }
		static notRegexp (options) { return this.newRelation.notRegexp(...arguments) }
		static raw () { return this.newRelation.raw() }
		static lock () { return this.newRelation.lock() }

		// pagination
		static limit (num) { return this.newRelation.limit(num) }
		static offset (num) { return this.newRelation.offset(num) }
		static paginate (page = 1, perPage = 20) { return this.newRelation.paginate(page, perPage) }

		// order
		static order (options) { return this.newRelation.order(options) }

		// group
		static group (fields) { return this.newRelation.group(fields) }
	}
	return ModelBridgeRelation
}