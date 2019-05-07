const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

AWS.config.update({
    region: 'us-east-1'
})

const S3 = new AWS.S3()

const BUCKET = 'nanoservices-images-jpedro'

const upload = body => {
    return new Promise((res, rej) => {
        const id = uuid()
        S3.putObject({
            Bucket: BUCKET,
            Key: id + '.jpg',
            Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
            ContentType: 'image/jpeg',
            ContentEncoding: 'base64'
        }, (err) => {
            if(err) {
                return rej(err)
            }
            return res({
                bucket: BUCKET,
                key: id + '.jpg'
            })
        })
    })
}

module.exports = {
    upload: upload
}