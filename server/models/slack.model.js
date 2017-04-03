import APIError from '../helpers/APIError';

import Promise from 'bluebird';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const SlackSchema = new mongoose.Schema({
  slackuser: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

SlackSchema.method({
});

SlackSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((slackuser) => {
        if (slackuser) {
          return slackuser;
        }
        const err = new APIError('No such slack exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef SlackUser
 */
export default mongoose.model('Slack', SlackSchema);
