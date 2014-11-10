var _ = require('lodash'),
    Deal = require('../models/deal.js');

exports.index = function(req, res) {
  Deal.find({}, function(err, deals) {
    if (err) return next(err);

    res.render('deals/index', { deals: deals });
  });
};

exports.show = function(req, res) {
  var deal = req.deal;

  res.render('deals/show', { deal: deal });
};

exports.new = function(req, res) {
  var deal = new Deal();

  res.render('deals/new', { deal: deal });
};

exports.create = function(req, res) {
  var deal_attrs = _.cloneDeep(req.body.deal);
  var deal = new Deal(deal_attrs);

  deal.save(function(err) {
    if (err) return res.render('deals/new', { deal: deal, errors: err.errors });

    req.flash('info', 'Deal succesfully created.');

    res.redirect('/deals/' + deal.id);
  });
};

exports.edit = function(req, res) {
  res.render('deals/edit', { deal: req.deal });
};

exports.update = function(req, res) {
  var deal = req.deal;
  var deal_attrs = _.cloneDeep(req.body.deal);

  _.extend(deal, deal_attrs);

  deal.save(function(err) {
    if (err) return res.render('deals/edit', { deal: deal, errors: err.errors });

    req.flash('info', 'Deal succesfully updated.');

    res.redirect('/deals/' + deal._id);
  });
};

exports.destroy = function(req, res) {
  var deal = req.deal;

  deal.remove(function(err) {
    if (err) return next(err);

    req.flash('info', 'Deal succesfully removed.');

    res.redirect('/deals');
  });
};

exports.dealById = function(req, res, next, id) {
  Deal.findById(id, function(err, deal) {
    if (err) return next(err);

    req.deal = deal;

    next();
  });
};
