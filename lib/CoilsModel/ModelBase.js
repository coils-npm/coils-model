module.exports = function (Sequelize) {
	let ModelBridgeRelation = require('./ModelBridgeRelation')(Sequelize)
	class ModelBase extends ModelBridgeRelation {
		constructor () {
			super(...arguments)
		}
	}
	return ModelBase
}