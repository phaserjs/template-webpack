export function iterate(obj, stack) {
	const keyList = [];
	function _iterate(obj, stack) {
		for (const property in obj) {
			if (obj.hasOwnProperty(property)) {
				if (typeof obj[property] === "object") {
					_iterate(obj[property], stack + "." + property);
				} else {
					const keys = {};
					keys[property] = obj[property];
					keyList.push(keys);
				}
			}
		}
		return keyList;
	}
	return _iterate(obj, stack);
}
