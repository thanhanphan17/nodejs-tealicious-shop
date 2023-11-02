import mongoose from 'mongoose' // Erase if already required
import { Schema } from 'mongoose'

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'keys'

const keyTokenSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      trim: true
    },
    publicKey: {
      type: String,
      trim: true
    },
    refreshTokensUsed: {
      type: Array,
      default: []
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
)

export default mongoose.model(DOCUMENT_NAME, keyTokenSchema)
