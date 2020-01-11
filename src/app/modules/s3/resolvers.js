import { getSignedUrl } from '@services'

export default {
  Mutation: {
    signS3: async (_, { fileName, fileType }) => {
      return getSignedUrl(fileName, fileType)
    },
  },
}
