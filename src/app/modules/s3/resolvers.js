import { getSignedUrl } from '@modules/s3/services'

export default {
  Mutation: {
    signS3: async (_, { fileName, fileType }) => {
      return getSignedUrl(fileName, fileType)
    },
  },
}
