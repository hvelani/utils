import * as errors from './errors.js';

/**
 * Formats date to ISO 8601 format (YYYY-MM-DD)
 *
 * @param date
 * @returns String representation in ISO 8601 format
 */
export function formatDate(date) {
	if (date instanceof Date) {
		let month = '' + (date.getMonth() + 1),
			day = '' + date.getDate(),
			year = date.getFullYear();

		if (month.length < 2) {
			month = '0' + month;
		}

		if (day.length < 2) {
			day = '0' + day;
		}

		return [year, month, day].join('-');
	}
	throw errors.throwableError(errors.ERROR_ILLEGAL_ARGUMENT_ERROR, 'argument type: ' + typeof date + ', whereas expected type: Date');
}

/**
 * Merge two nested objects recursively.
 *
 * @param firstObject
 * @param secondObject
 * @returns merged object
 */
export function mergeNestedObjects(firstObject, secondObject) {
	let finalObject = {};

	// Merge first object and its properties.
	for (let propertyKey in firstObject) {
		finalObject[propertyKey] = _mergeProperties(propertyKey, firstObject, secondObject);
	}

	// Merge second object and its properties.
	for (let propertyKey in secondObject) {
		finalObject[propertyKey] = _mergeProperties(propertyKey, secondObject, firstObject);
	}

	return finalObject;
}


function _mergeProperties(propertyKey, firstObject, secondObject) {
	let propertyValue = firstObject[propertyKey];

	if (secondObject[propertyKey] === undefined) {
		return firstObject[propertyKey];
	} else if (typeof propertyValue === 'object') {
		return mergeNestedObjects(firstObject[propertyKey], secondObject[propertyKey]);
	}

	return secondObject[propertyKey];
}
