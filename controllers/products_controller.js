var models  = require('../models');
var express = require('express');
var router  = express.Router();

console.log("PRODUCTS CONTROLLER LOADED");
router.get('/', function(req, res) {

  // SOLUTION:
  // =========
  // use the Cat model to find all cats,
  // and use the include option to grab info from the User model.
  // This will let us show the cat and it's owner.
  models.Product.findAll({
    include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(products) {
    console.log("Found all products, .then has fired");
    // grab the user info from our req.
    // How is it in our req?
    // This info gets saved to req via the users_controller.js file.
    res.render('products/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      products: products
    })
    console.log("Yup, Logged in = "+ logged_in);
  })
});

router.post('/create', function (req, res) {
    console.log("create route fired off!!!",req.body);
  // SOLUTION:
  // =========
  // use the Cat model to create a cat based on what's
  // passed in req.body (name, sleepy, user_id)
  models.Product.create({
    name: req.body.name,
    description:req.body.description,
    sold: req.body.sold,
    user_id: req.session.user_id
  })
  // connect the .create to this .then
  .then(function() {
    res.redirect('/');
  })
});

router.put('/update/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Product model to update a products sold status
  // based on the boolean passed in req.body.sold
  // and the id of the cat (as passed in the url)
  models.Product.update(
  {
    sold: req.body.sold
  },
  {
    where: { id : req.params.id }
  })
  // connect it to this .then.
  .then(function (result) {
    res.redirect('/');
  })
});


router.delete('/delete/:id', function(req,res) {
  // SOLUTION:
  // =========
  // use the Product model to delete a product
  // based on the id passed in the url
  models.Product.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  })
});


module.exports = router;
