// import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { CONFIG } from '../config/env.config.js'
import { Encrypter } from '../helper/cryptography.js'

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const response = await Query('SELECT * FROM users WHERE u_username = ? and u_password = ?', [userName, Encrypter(password)])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Invalid username or password' })
    }

    const { ...user } = response[0]
    const hashedPassword = user.password

    const isMatch = await bcrypt.compare(password, hashedPassword)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    req.session.user = {
      id: user.id,
      fullName: user.fullName,
    }

    return res.status(200).json({
      id: user.id,
      fullName: user.fullName,
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const logout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Cannot destroy session')
    }

    res.clearCookie(CONFIG.SESSION_COOKIE_NAME)

    res.sendStatus(204)
  })
}