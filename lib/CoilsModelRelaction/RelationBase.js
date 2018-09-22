let formatter =  require('../formatter')
class RelationBase {
	get Model () { return this._Model }

	constructor (Model) {
		this._Model = Model
		this._Op = Model._Sequelize.Op
		this._query = {method: 'findOne', options: {}}
	}
	promise () {
		return this.Model.sequlizeMethod(this._query.method, this._query.options)
	}

	set query (query) {
		Object.assignDeep(this._query, query)
		console.log(JSON.stringify(this._query))
	}

	// query
	find (primaryKeyValue) {
		let primaryKey = this.Model.primaryKeyAttributes[0]
		this.query = {method: 'findOne', options: {where: {[primaryKey]: primaryKeyValue}}}
		return this
	}
	findBy (options) {
		this.query = {method: 'findOne', options: {where: options}}
		return this
	}
	all (options = {}) {
		return this.where(options)
	}
	where (options) {
		formatter.formatQuery(options, (key, value) => {
			if (Array.isArray(value)) {
				return {[this._Op.in]: value}
			} else {
				return {[this._Op.eq]: value}
			}
		})
		this.query = {method: 'findAll', options: {where: options}}
		return this
	}
	not (options) {
		formatter.formatQuery(options, (key, value) => {
			if (Array.isArray(value)) {
				return {[this._Op.notIn]: value}
			} else if (Boolean.isBoolean(value)) {
				return {[this._Op.not]: value}
			} else {
				return {[this._Op.ne]: value}
			}
		})
		this.query = {method: 'findAll', options: {where: options}}
		return this
	}
	min (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.Model.sequlizeMethod('min', field, this._query.options)
	}
	max (field, options = {}) {
		this.query = {method: 'findAll', options: {where: options}}
		return this.Model.sequlizeMethod('max', field, this._query.options)
	}
	select (attributes) {
		this.query = {method: 'findAll', options: {attributes: attributes}}
		return this
	}
	raw () {
		this.query = {method: 'findAll', options: {raw: true}}
		return this
	}

	// pagination
	limit (num) {
		this.query = {method: 'findAll', options: {limit: num}}
		return this
	}
	offset (num) {
		this.query = {method: 'findAll', options: {offset: num}}
		return this
	}
	paginate (page, perPage) {
		let offset = (page - 1) * perPage
		this.query = {method: 'findAll', options: {offset, limit: perPage - 0}}
		return this
	}

	// order
	order (options) {
		this.query = {method: 'findAll', options: {order: options}}
		return this
	}

	// group
	group (fields) {
		this.query = {method: 'findAll', order: fields}
		return this
	}
}
module.exports = RelationBase