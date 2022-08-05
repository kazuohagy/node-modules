"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase() {}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var parameters = utils.params(ct);

  for (var key in parameters) {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) this[key] = parameters[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = Math.trunc(status / 100); // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXNwb25zZS1iYXNlLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJSZXNwb25zZUJhc2UiLCJwcm90b3R5cGUiLCJnZXQiLCJmaWVsZCIsImhlYWRlciIsInRvTG93ZXJDYXNlIiwiX3NldEhlYWRlclByb3BlcnRpZXMiLCJjdCIsInR5cGUiLCJwYXJhbWV0ZXJzIiwicGFyYW1zIiwia2V5IiwiT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwibGlua3MiLCJsaW5rIiwicGFyc2VMaW5rcyIsIl9zZXRTdGF0dXNQcm9wZXJ0aWVzIiwic3RhdHVzIiwiTWF0aCIsInRydW5jIiwic3RhdHVzQ29kZSIsInN0YXR1c1R5cGUiLCJpbmZvIiwib2siLCJyZWRpcmVjdCIsImNsaWVudEVycm9yIiwic2VydmVyRXJyb3IiLCJlcnJvciIsInRvRXJyb3IiLCJjcmVhdGVkIiwiYWNjZXB0ZWQiLCJub0NvbnRlbnQiLCJiYWRSZXF1ZXN0IiwidW5hdXRob3JpemVkIiwibm90QWNjZXB0YWJsZSIsImZvcmJpZGRlbiIsIm5vdEZvdW5kIiwidW5wcm9jZXNzYWJsZUVudGl0eSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCO0FBRUE7QUFDQTtBQUNBOzs7QUFFQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCQyxZQUFqQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU0EsWUFBVCxHQUF3QixDQUFFO0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQUEsWUFBWSxDQUFDQyxTQUFiLENBQXVCQyxHQUF2QixHQUE2QixVQUFVQyxLQUFWLEVBQWlCO0FBQzVDLFNBQU8sS0FBS0MsTUFBTCxDQUFZRCxLQUFLLENBQUNFLFdBQU4sRUFBWixDQUFQO0FBQ0QsQ0FGRDtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBTCxZQUFZLENBQUNDLFNBQWIsQ0FBdUJLLG9CQUF2QixHQUE4QyxVQUFVRixNQUFWLEVBQWtCO0FBQzlEO0FBQ0E7QUFFQTtBQUNBLE1BQU1HLEVBQUUsR0FBR0gsTUFBTSxDQUFDLGNBQUQsQ0FBTixJQUEwQixFQUFyQztBQUNBLE9BQUtJLElBQUwsR0FBWVosS0FBSyxDQUFDWSxJQUFOLENBQVdELEVBQVgsQ0FBWixDQU44RCxDQVE5RDs7QUFDQSxNQUFNRSxVQUFVLEdBQUdiLEtBQUssQ0FBQ2MsTUFBTixDQUFhSCxFQUFiLENBQW5COztBQUNBLE9BQUssSUFBTUksR0FBWCxJQUFrQkYsVUFBbEIsRUFBOEI7QUFDNUIsUUFBSUcsTUFBTSxDQUFDWCxTQUFQLENBQWlCWSxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNMLFVBQXJDLEVBQWlERSxHQUFqRCxDQUFKLEVBQ0UsS0FBS0EsR0FBTCxJQUFZRixVQUFVLENBQUNFLEdBQUQsQ0FBdEI7QUFDSDs7QUFFRCxPQUFLSSxLQUFMLEdBQWEsRUFBYixDQWY4RCxDQWlCOUQ7O0FBQ0EsTUFBSTtBQUNGLFFBQUlYLE1BQU0sQ0FBQ1ksSUFBWCxFQUFpQjtBQUNmLFdBQUtELEtBQUwsR0FBYW5CLEtBQUssQ0FBQ3FCLFVBQU4sQ0FBaUJiLE1BQU0sQ0FBQ1ksSUFBeEIsQ0FBYjtBQUNEO0FBQ0YsR0FKRCxDQUlFLGdCQUFNLENBQ047QUFDRDtBQUNGLENBekJEO0FBMkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBaEIsWUFBWSxDQUFDQyxTQUFiLENBQXVCaUIsb0JBQXZCLEdBQThDLFVBQVVDLE1BQVYsRUFBa0I7QUFDOUQsTUFBTVgsSUFBSSxHQUFHWSxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsTUFBTSxHQUFHLEdBQXBCLENBQWIsQ0FEOEQsQ0FHOUQ7O0FBQ0EsT0FBS0csVUFBTCxHQUFrQkgsTUFBbEI7QUFDQSxPQUFLQSxNQUFMLEdBQWMsS0FBS0csVUFBbkI7QUFDQSxPQUFLQyxVQUFMLEdBQWtCZixJQUFsQixDQU44RCxDQVE5RDs7QUFDQSxPQUFLZ0IsSUFBTCxHQUFZaEIsSUFBSSxLQUFLLENBQXJCO0FBQ0EsT0FBS2lCLEVBQUwsR0FBVWpCLElBQUksS0FBSyxDQUFuQjtBQUNBLE9BQUtrQixRQUFMLEdBQWdCbEIsSUFBSSxLQUFLLENBQXpCO0FBQ0EsT0FBS21CLFdBQUwsR0FBbUJuQixJQUFJLEtBQUssQ0FBNUI7QUFDQSxPQUFLb0IsV0FBTCxHQUFtQnBCLElBQUksS0FBSyxDQUE1QjtBQUNBLE9BQUtxQixLQUFMLEdBQWFyQixJQUFJLEtBQUssQ0FBVCxJQUFjQSxJQUFJLEtBQUssQ0FBdkIsR0FBMkIsS0FBS3NCLE9BQUwsRUFBM0IsR0FBNEMsS0FBekQsQ0FkOEQsQ0FnQjlEOztBQUNBLE9BQUtDLE9BQUwsR0FBZVosTUFBTSxLQUFLLEdBQTFCO0FBQ0EsT0FBS2EsUUFBTCxHQUFnQmIsTUFBTSxLQUFLLEdBQTNCO0FBQ0EsT0FBS2MsU0FBTCxHQUFpQmQsTUFBTSxLQUFLLEdBQTVCO0FBQ0EsT0FBS2UsVUFBTCxHQUFrQmYsTUFBTSxLQUFLLEdBQTdCO0FBQ0EsT0FBS2dCLFlBQUwsR0FBb0JoQixNQUFNLEtBQUssR0FBL0I7QUFDQSxPQUFLaUIsYUFBTCxHQUFxQmpCLE1BQU0sS0FBSyxHQUFoQztBQUNBLE9BQUtrQixTQUFMLEdBQWlCbEIsTUFBTSxLQUFLLEdBQTVCO0FBQ0EsT0FBS21CLFFBQUwsR0FBZ0JuQixNQUFNLEtBQUssR0FBM0I7QUFDQSxPQUFLb0IsbUJBQUwsR0FBMkJwQixNQUFNLEtBQUssR0FBdEM7QUFDRCxDQTFCRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlQmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXNwb25zZUJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VCYXNlYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlQmFzZSgpIHt9XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbiAoaGVhZGVyKSB7XG4gIC8vIFRPRE86IG1vYXIhXG4gIC8vIFRPRE86IG1ha2UgdGhpcyBhIHV0aWxcblxuICAvLyBjb250ZW50LXR5cGVcbiAgY29uc3QgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB1dGlscy50eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgY29uc3QgcGFyYW1ldGVycyA9IHV0aWxzLnBhcmFtcyhjdCk7XG4gIGZvciAoY29uc3Qga2V5IGluIHBhcmFtZXRlcnMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHBhcmFtZXRlcnMsIGtleSkpXG4gICAgICB0aGlzW2tleV0gPSBwYXJhbWV0ZXJzW2tleV07XG4gIH1cblxuICB0aGlzLmxpbmtzID0ge307XG5cbiAgLy8gbGlua3NcbiAgdHJ5IHtcbiAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICAgIC8vIGlnbm9yZVxuICB9XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbiAoc3RhdHVzKSB7XG4gIGNvbnN0IHR5cGUgPSBNYXRoLnRydW5jKHN0YXR1cyAvIDEwMCk7XG5cbiAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZTtcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gdHlwZSA9PT0gMTtcbiAgdGhpcy5vayA9IHR5cGUgPT09IDI7XG4gIHRoaXMucmVkaXJlY3QgPSB0eXBlID09PSAzO1xuICB0aGlzLmNsaWVudEVycm9yID0gdHlwZSA9PT0gNDtcbiAgdGhpcy5zZXJ2ZXJFcnJvciA9IHR5cGUgPT09IDU7XG4gIHRoaXMuZXJyb3IgPSB0eXBlID09PSA0IHx8IHR5cGUgPT09IDUgPyB0aGlzLnRvRXJyb3IoKSA6IGZhbHNlO1xuXG4gIC8vIHN1Z2FyXG4gIHRoaXMuY3JlYXRlZCA9IHN0YXR1cyA9PT0gMjAxO1xuICB0aGlzLmFjY2VwdGVkID0gc3RhdHVzID09PSAyMDI7XG4gIHRoaXMubm9Db250ZW50ID0gc3RhdHVzID09PSAyMDQ7XG4gIHRoaXMuYmFkUmVxdWVzdCA9IHN0YXR1cyA9PT0gNDAwO1xuICB0aGlzLnVuYXV0aG9yaXplZCA9IHN0YXR1cyA9PT0gNDAxO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSBzdGF0dXMgPT09IDQwNjtcbiAgdGhpcy5mb3JiaWRkZW4gPSBzdGF0dXMgPT09IDQwMztcbiAgdGhpcy5ub3RGb3VuZCA9IHN0YXR1cyA9PT0gNDA0O1xuICB0aGlzLnVucHJvY2Vzc2FibGVFbnRpdHkgPSBzdGF0dXMgPT09IDQyMjtcbn07XG4iXX0=