import winston from 'winston'

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    http: 3,
    info: 4,
    debug: 5,
    trace: 6,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    http: 'white',
    info: 'green',
    debug: 'blue',
    trace: 'cyan',
  },
}

const { combine, timestamp, json, printf, colorize } = winston.format

const consoleTransport = new winston.transports.Console({
  format: combine(
    colorize({ all: true, colors: customLevels.colors }),
    timestamp(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
})

export const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.json(),
})

// Always add the console transport even when in production
logger.add(consoleTransport)