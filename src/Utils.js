 'use strict';

const Utils = {

	/**
	 * Replace all Swagger defined params in route with matching respective data
	 * 
	 * @param path {String} - Full route for a respective API endpoint
	 * @param data {Object} - POST data for a respective API endpoint
	 * @return {String}
	 */
	replaceInPath(path, data) {
		var properties = path.match(/[^{}]+(?=\})/g) || [];
        for (var i = 0; i < properties.length; i++) {
            var property = properties[i];
            if (data instanceof FormData) {
		path = path.replace('{' + property + '}', data.get(property));
	    } else {
		path = path.replace('{' + property + '}', data[property]);
	    }
        }

        return path;
	},

	/**
	 * Determine the namespace for a specific endpoint
	 * 
	 * @param method {String}
	 * @param route {String}
	 * @param baseRoute {String}
	 * @return {String}
	 */
	getNamespace(method, route, baseRoute){
		var namespace = null;

		if (!method.tags){
			// Take the first phrase of the endpoint as the namespace
			namespace = route.split('/')[1];

			if (!namespace || namespace === ''){
				// If the endpoint doesn't have any phrases, then take the first phrase of the baseRoute
				namespace = baseRoute.split('/')[1];
			}
		} else {
			// If tags exist on the endpoint then take the first tag name as the endpoint
			namespace = method.tags[0];
		}

		// Remove any curly braces from the namespace if there exist
		namespace = namespace.replace(/[{}]/g, "");

		return namespace;
	}

}

export default Utils;
