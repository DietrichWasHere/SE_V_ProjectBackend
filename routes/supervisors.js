var express = require('express');
const { authenticate, isAdminOrSupervisorWithOrg, isAdmin } = require('../controllers/auth');
var router = express.Router();

function validate(course) {
  var errorMessage = "[";
  errorMessage += "]";
  return errorMessage;
}

/* GET supervisors listing. */
router.get('/:orgID', [authenticate, isAdminOrSupervisorWithOrg], function(req, res, next) {
  res.locals.connection.query("SELECT * FROM supervisors where orgID = ?", req.params.orgID, function(error, results, fields) {
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


/*router.get('/:userID/:orgID', [authenticate, isAdminOrAdvisor], function(req, res, next) {
  res.locals.connection.query("SELECT * FROM supervisors WHERE userID = ? and  orgID = ?", req.params.advisorID, function(error, results, fields) {
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

router.put('/:userID/:orgID', [authenticate, isAdminOrSameAdvisor], function(req, res, next) {
  var errorMessage = validate(req.body);
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  }
  else {
    res.locals.connection.query("UPDATE supervisors SET ? WHERE userID=? and orgID = ?", [req.body, req.params.advisorID], function(error, results, fields) {
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
});*/

router.post('/:orgID', [authenticate, isAdminOrSupervisorWithOrg], function(req, res, next) {
  var errorMessage = validate(req.body);
  if (errorMessage.length > 2) {
    res.status(406);
    res.send(errorMessage);
  }
  else {
      res.locals.connection.query("INSERT INTO supervisors SET ?", req.body, function(error, results, fields) {
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
});

router.delete('/:userID/:orgID', [authenticate, isAdmin], function(req, res, next) {
  res.locals.connection.query("DELETE FROM supervisors WHERE userID = ? AND orgID = ?", [req.params.majorID, req.params.courseNo], function(error, results, fields) {
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
