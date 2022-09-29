const jwt = require('node-webtokens')
const moment = require('moment')
const key = 'SATKcp7AMnCg0YdEBPIcgknBplYttePtQoRddpJjyVak9F5vEp/7pL0Q1236MkVQd7nIXGoaPt4w1dlrpEmY4A=='
const validTimeToken = 3600000 // one hour
const validTimeRefToken = validTimeToken * 24 * 7 // one week
const alg = 'HS256'

const getToken = (user) => {
  const miliseconds = Date.now()
  user.validFrom = miliseconds
  user.exp = miliseconds + validTimeToken
  const token = jwt.generate(alg, user, key)
  return token
}

const getRefToken = (user) => {
  const miliseconds = Date.now()
  user.validFrom = miliseconds
  user.exp = miliseconds + validTimeRefToken
  const token = jwt.generate(alg, user, key)
  return token
}

// eslint-disable-next-line complexity
const getAuthorized = (token) => {
  const tokenParsed = jwt.parse(token).verify(key)
  if (tokenParsed.error && tokenParsed.error.message === 'Invalid token') {
    return {code:403, message:'Unauthorized _ Invalid_token'}
  }
  if (tokenParsed.payload && tokenParsed.payload.exp >= Date.now()) {
    return {code:400, message:'Authorized', user:tokenParsed.payload}
  } else return {code:403, message:'Unauthorized'}
}

const getCurrentDateTime = () => {
  return moment.tz('Europe/Bratislava').format('YYYY-MM-DD HH:MM:SS')
}

module.exports = {
  getRefToken,
  getToken,
  getAuthorized,
  getCurrentDateTime
}
