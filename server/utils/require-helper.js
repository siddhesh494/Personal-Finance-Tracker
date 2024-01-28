

const safePromise = (promise) => promise.then(data => ([null, data])).catch(err => ([err, null]))

module.exports = {
  safePromise
}