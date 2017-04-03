import Slack from '../models/slack.model';

function load(req, res, next, id) {
  Slack.get(id)
    .then((slackuser) => {
      req.user = slackuser; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.slackuser);
}

function create(req, res, next) {
  const slackUser = new Slack({
    user: req.body.user,
    message: req.body.message
  });

  Slack.save()
    .then(savedSlack => res.json(savedSlack))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Slack.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

export default { load, get, create, list };
