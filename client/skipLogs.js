//PRODUCTION MODE, SKIPPING LOGS
if (window && window.console && window.console.log) {
    window.console.log = window.console.warn = window.console.error = window.console.dir = function() {};
}