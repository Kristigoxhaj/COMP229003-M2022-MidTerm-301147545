/**
 * @filename car.js
 * @author Kristi Goxhaj
 * @studentID 301147545
 * @Web App name COMP229003-M2022-MidTerm-301147545
 */


// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = function(req, res, next) {  
    CarModel.find((err, carsList) => {
        //console.log(carList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('cars/list', {
                title: 'Cars List', 
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}


// Gets a car by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('cars/details', {
                title: 'Car Details', 
                car: carToShow,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    
     let newCar = CarModel();

     res.render('cars/add_edit', {
       title: 'Add Edit Car Form',
       messages: req.flash('error'),
       car: newCar,
       userName: req.user ? req.user.username : ''
     });



}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {

    let car = new CarModel(req.body);
    car.save((err) => {
          if (err) {
            let message = getErrorMessage(err);
            req.flash('error', message);
            return res.render('cars/add_edit', {
                      title: 'Add Edit Car Form',
                      messages: req.flash('error'),
                      car: car,
                      userName: req.user ? req.user.username : ''
                    });

          }else{

           return res.redirect('/cars/list');

          }

   })



}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    
       let id = req.params.id;

       CarModel.findById(id, (err, carToEdit) => {
           if(err)
           {
               console.log(err);
               res.end(err);
           }
           else
           {
               //show the edit view
               res.render('cars/add_edit', {
                   title: 'Add Edit Car Form',
                   car: carToEdit,
                   userName: req.user ? req.user.username : ''
               })
           }
       });

}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {

   let id = req.params.id;
    
   CarModel.findOneAndUpdate({_id: id}, req.body, {upsert: true}, function(err, doc) {
       if (err) {

        let message = getErrorMessage(err);
                   req.flash('error', message);
                   return res.render('cars/add_edit', {
                             title: 'Add Edit Car Form',
                             messages: req.flash('error'),
                             car: car,
                             userName: req.user ? req.user.username : ''
                   });

       }
       else
       {
       return res.redirect('/cars/list');

       }

   });


    
}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    
       let id = req.params.id;

       CarModel.findOneAndDelete({_id: id}, function (err, car) {
           if (err){
               console.log(err);

           }
           else{
               console.log("Deleted Car : ", car);

           }

           return res.redirect('/cars/list');
       });


}