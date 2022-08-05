var exec = require('./exec')

module.exports = function()
{
	console.log()
	console.log('========================================')
	console.log('=          Committing changes          =')
	console.log('========================================')
	console.log()

	console.log(exec('git add .'))

	console.log(exec('git commit -m "Updated metadata"'))
}