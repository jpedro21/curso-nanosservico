'use strict';

const s3Service = require('./service/s3Service')
const dynamoDbService = require('./service/dynamoDbService')

module.exports.upload = async (event) => {
  const item = await s3Service.upload(event.body)
  await dynamoDbService.put(item)

  return {
    statusCode: 201,
    body: JSON.stringify(item),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
