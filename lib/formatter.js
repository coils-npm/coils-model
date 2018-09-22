module.exports = {
	formatQuery (target, handler) {
		if (Object.isObject(target)) {
			Object.keys(target).forEach(key => {
				if (Object.isObject(target[key])) {
					this.formatQuery(target[key], handler)
				} else {
					console.log(handler(key, target[key]) || target[key])
					target[key] = handler(key, target[key]) || target[key]
				}
			})
		}
		return target
	}
}