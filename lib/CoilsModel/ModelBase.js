module.exports = function (Sequelize, sequelize) {
	let ModelBridgeRelation = require('./ModelBridgeRelation')(Sequelize, sequelize)
	class ModelBase extends ModelBridgeRelation {
		// Transaction
		// https://itbilu.com/nodejs/npm/EJO6CcCM-.html
		static transaction (tranCb) {
			let t = Sequelize._cls.get('transaction')
			if (t) {
				return Promise.resolve(tranCb(t))
			}
			return Promise.resolve(sequelize.transaction(tranCb))
		}

		constructor () {
			super(...arguments)
		}
		
		withLock (asyncCb) {
			return ActiveModelBase.transaction(async (t) => {
				await this.constructor.findOne({where: {id: this.id}, lock: t.LOCK.UPDATE})
				await asyncCb(t)
			})
		}
	}
	return ModelBase
}