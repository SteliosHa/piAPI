import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import slackCtrl from '../controllers/slack.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/slack - Get list of slack users */
  .get(slackCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), slackCtrl.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(slackCtrl.get)

  /** PUT /api/users/:userId - Update user */
  // .put(validate(paramValidation.createUser), slackCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(slackCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', slackCtrl.load);

export default router;
