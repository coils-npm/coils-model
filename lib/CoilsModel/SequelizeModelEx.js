module.exports = function (Sequelize) {
	class SequelizeModelEx extends Sequelize.Model {
		// Transaction
		// https://itbilu.com/nodejs/npm/EJO6CcCM-.html
		static async transaction (blockAfn) {
			let t = Sequelize._cls.get('transaction')
			if (t) {
				return await blockAfn(t)
			}
			console.log(this, this._sequelize.transaction)
			return await this._sequelize.transaction(blockAfn)
		}
		
		// spreed: true, return sequelize findOrCreate result
		static async findOrCreateBy (attributes, blockAfn, spread = false) {
			let defaults = {}
			await blockAfn && blockAfn(defaults)
			let result = await this.transaction(async (t) => {
				return await super.findOrCreate ({where: attributes, defaults})
			})
			if (spread) {
				return result
			} else {
				return result && result.length && result[0] || null
			}
		}
		
		static async findOrCreate () {
			console.warn('sequelize method, you can choice use findOrCreateBy')
			return super.findOrCreate(...arguments)
		}
		
		constructor () {
			super(...arguments)
		}
		
		async withLock (blockAfn) {
			return await this.constructor.transaction(async (t) => {
				await this.constructor.findOne({where: {id: this.id}, lock: t.LOCK.UPDATE})
				return await blockAfn(t)
			})
		}
	}
	return SequelizeModelEx
}