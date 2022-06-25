
/**
 * @filename car.js
 * @author Kristi Goxhaj
 * @studentID 301147545
 * @Web App name COMP229003-M2022-MidTerm-301147545
 */


var express = require('express');
var router = express.Router();
let carController = require('../controllers/car');
let passport = require('passport');

// Helper function for guard purposes
function requireAuth(req, res, next)
{
       if (req.isAuthenticated()) {
         return next()
       }else{
        req.session.url=req.originalUrl;
        res.redirect('/users/signin');
     }

}

/* GET list of items */
router.get('/list', carController.carList);

// Route for Details
router.get('/details/:id', carController.details);

// Routers for edit
router.get('/edit/:id',requireAuth, carController.displayEditPage);
router.post('/edit/:id',requireAuth, carController.processEditPage);

// Delete
router.get('/delete/:id',requireAuth, carController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',requireAuth, carController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',requireAuth, carController.processAddPage);

module.exports = router;