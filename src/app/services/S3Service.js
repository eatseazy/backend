import S3 from 'aws-sdk/clients/s3'

const getS3Client = () => {
  return new S3({
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-2',
  })
}

export const getSignedUrl = async (fileName, fileType) => {
  const s3Client = getS3Client()

  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read',
  }

  return s3Client.getSignedUrl('putObject', s3Params)
}

