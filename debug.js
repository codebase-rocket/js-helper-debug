// Info: Boilerplate library. Contains Functions related to logging for debugging
'use strict';

// Shared Dependencies (Managed by Loader)
var Lib = {};

// Exclusive Dependencies
var CONFIG = require('./config'); // Loader can override it with Custom-Config


/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Must be loaded in memory already)
    Lib.Utils = shared_libs.Utils;

    // Override default configuration
    if( !Lib.Utils.isNullOrUndefined(config) ){
      Object.assign(CONFIG, config); // Merge custom configuration with defaults
    }

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const Debug = { // Public functions accessible by other modules

  /********************************************************************
  Interface to original 'console.log' function

  @param {...} - Forward all arguments as-it-is

  @return {void}
  *********************************************************************/
  log: function(){

    if(!CONFIG.NO_CASUAL_LOGGING){
      console.log(...arguments);
    }

  },


  /********************************************************************
  Log error for reserch. Use this to log errors that should not have occured.

  @param {Error} error - Error object to be logged
  @param {String} [extra_info] - (optional) Extra information for logging along the error
  @param {Boolean} [print_stack_trace] - (optional) Also print stack trace for error if true

  @return {void}
  *********************************************************************/
  logErrorForResearch: function(error, extra_info, print_stack_trace){

    if(!CONFIG.NO_ERROR_LOGGING){

      console.log(
        '==Error for research==\n' +
        '**Error**\n' +
        error +
        ( extra_info ? '\n**Error Extra Info**\n' + extra_info : '' ) +
        ( print_stack_trace ? '\n**Error Stack**\n' + error.stack : '' )
      );

    }

  },


  /********************************************************************
  Internal Timelogging for Auditing

  @param {String} action - Some name to identify this action (Ex: Init Start | Init End)
  @param {String} process - Some name to identify the process which is being audited (Ex: Cache-Server Connection | SQL-Server Connection | ...)
  @param {reference} reference_time - (Optional) Start time of the parent-request in Unix-time-milliseconds

  @return {void}
  *********************************************************************/
  timingAuditLog: function(action, routine, reference_time){

      if(!CONFIG.NO_TIME_AUDITING){

        // Calculation
        const current_time_in_ms = Lib.Utils.getUnixTimeInMilliSeconds();
        const time_diff_in_ms = !Lib.Utils.isNullOrUndefined(reference_time) ? (current_time_in_ms - reference_time) : null;
        let heap_used_in_mb = 'Unknown';

        // Calculate memory Usage only if js is running in compatible javascript engine
        if(
          !Lib.Utils.isNullOrUndefined(process) &&
          Lib.Utils.isFunction(process.memoryUsage)
        ){
          const memory_usage = process.memoryUsage();
          heap_used_in_mb = Lib.Utils.round( (memory_usage.heapUsed / 1024 / 1024), 3 );
        }

        console.log(
          '[AUDIT] ' +
          `[${action}] ` +
          `[${routine}] ` +
          `[` + ( Lib.Utils.isNullOrUndefined(reference_time) ? `Unknown` : `${time_diff_in_ms} ms` ) + `] ` +
          `[Heap: ${heap_used_in_mb} mb] ` +
          `[${Lib.Utils.getUnixTimeInMilliSeconds()} ms]`
        );

      }

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////////Module Exports START//////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return Debug;

};/////////////////////////////Module Exports END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _Debug = {  // Private methods accessible within this modules only
  // None
};//////////////////////////Private Functions END///////////////////////////////
