const { createLogger , transports , format, debug, info} =require('winston');
require('dotenv').config();

const logger=createLogger({
    transports : [
        new transports.File({
            level : process.env.level,
            filename : 'error.log',
            format : format.combine(
                format.timestamp({ format : "MM-DD-YYYY HH:mm:ss"}),
                format.printf(info=> `${[info.timestamp]} - ${info.level} :  ${info.message}` )
            )
        }),
        new transports.File({
            level : 'warn',
            filename : 'warn.log',
            format : format.combine(
                format.timestamp({ format : "MM-DD-YYYY HH:mm:ss"}),
                format.printf(info=> `${[info.timestamp]} - ${info.level} :  ${info.message}` )
            )
        }),
        new transports.File({
            level : 'info',
            filename : 'info.log',
            format : format.combine(
                format.timestamp({ format : "MM-DD-YYYY HH:mm:ss"}),
                format.printf(info=> `${[info.timestamp]} - ${info.level} :  ${info.message}` )
            )
        }),
        new transports.Console(),
    ]
})

module.exports={
    logger
}