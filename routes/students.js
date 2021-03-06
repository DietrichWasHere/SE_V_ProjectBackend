var express = require('express');
const { authenticate, isAdmin, isSameUser, isNewUser, isAdminOrSupervisorWithOrg } = require('../controllers/auth');
var router = express.Router();

/* GET student listing for org. */
router.get('/org/:orgID', [authenticate, isAdminOrSupervisorWithOrg], function(req, res, next) {
  res.locals.connection.query("SELECT * FROM students where orgID = ?", req.params.orgID, function(error, results, fields) {
    if (error) {
      res.status(500);
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.status(200);
      res.send(JSON.stringify(results));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});

/* GET student listing for user. */
router.get('/user/:userID', [authenticate, isSameUser], function(req, res, next) {
  res.locals.connection.query("SELECT * FROM students WHERE userID = ?", req.params.userID, function(error, results, fields) {
    if (error) {
      res.status(500);
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
    } else {
      res.status(200);
      res.send(JSON.stringify(results));
    }
    res.locals.connection.end();
  });
});

/*router.put('/:userID/:orgID', [authenticate, isAdminOrSameAdvisor], function(req, res, next) {
  var errorMessage = validate(req.body);
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  }
  else {
    res.locals.connection.query("UPDATE tutors SET ? WHERE userID=? and orgID = ?", [req.body, req.params.advisorID], function(error, results, fields) {
      if (error) {
        res.status(500);
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    });
  }
});

router.post('/', [authenticate, isAdmin], function(req, res, next) {
  var errorMessage = validate(req.body);
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  }
  else {
      res.locals.connection.query("INSERT INTO tutors SET ?", req.body, function(error, results, fields) {
      if (error) {
        res.status(500);
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.status(201);
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    });
  }
});*/


router.put('/:userID/:orgID', [authenticate, isSameUser], function(req, res, next) {
  /*var errorMessage = validate(req.body);
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  }
  else {*/
    res.locals.connection.query("UPDATE students SET ? WHERE userID=? and orgID=?", [req.body, req.params.userID, req.params.orgID], function(error, results, fields) {
      if (error) {
        res.status(500);
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    });
  //}
});


router.delete('/:orgID/:userID', [authenticate, isAdminOrSupervisorWithOrg], function(req, res, next) {
  res.locals.connection.query("DELETE FROM students WHERE userID = ? AND orgID = ?", [req.params.userID, req.params.orgID], function(error, results, fields) {
    if (error) {
      res.status(500);
      res.send(JSON.stringify({ status: 500, error: error, response: null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      res.status(200);
      res.send(JSON.stringify(results));
      //If there is no error, all is good and response is 200OK.
    }
    res.locals.connection.end();
  });
});

module.exports = router;
