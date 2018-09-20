module.exports = function (Sequelize, sequelize) {
	let ModelBridgeRelation = require('./ModelBridgeRelation')(Sequelize, sequelize)
	class ModelBase extends ModelBridgeRelation {
		constructor () {
			super(...arguments)
		}
	}
	return ModelBase
}