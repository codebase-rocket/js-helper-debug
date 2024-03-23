// Info: Test Cases
'use strict';

// Shared Dependencies
var Lib = {};

// Set Configrations
const debug_config = {
  'NO_CASUAL_LOGGING': false,
  'NO_ERROR_LOGGING': false, // Turn off 'Error' logging
  'NO_TIME_AUDITING': false
};

// Dependencies
Lib.Utils = require('js-helper-utils');
Lib.Debug = require('js-helper-debug')(Lib, debug_config);


////////////////////////////SIMILUTATIONS//////////////////////////////////////

// function to simulate an async function
var fake_asyncFunction = function(cb){

  setTimeout( // 3 second delay
    cb,
    3000
  );

}

///////////////////////////////////////////////////////////////////////////////


/////////////////////////////STAGE SETUP///////////////////////////////////////

// Dummy Error
var err = new Error('Intentional error for testing.');

// Dummy Extra Information for error
var error_extra_info =
  'Cause: EXAMPLE MODULE' +
  '\ncmd: some command' +
  '\nparams: some data';

///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////TESTS/////////////////////////////////////////

// Test .log() function
Lib.Debug.log('hello world');


// Test .logErrorForResearch() function
Lib.Debug.logErrorForResearch(err, error_extra_info, true);


// Test .timingAuditLog() function
const reference_time = Lib.Utils.getUnixTimeInMilliSeconds();

Lib.Debug.timingAuditLog('Start', 'My Process', reference_time);
fake_asyncFunction( function(){
  Lib.Debug.timingAuditLog('End', 'My Process', reference_time);
});

///////////////////////////////////////////////////////////////////////////////
