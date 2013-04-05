module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });


  grunt.registerTask("preview", "Calls through to the wintersmith preview function", function (prop) {
    var done = this.async();

    grunt.log.write("Calling wintersmith preview: ");

    grunt.util.spawn({
      cmd : "wintersmith",
      args : [ "preview" ]
    }, function (err, result) {
      if (err) {
        grunt.log.error("holy crap!" + err);
        return done(false);
      }

      grunt.log.writeln(result).ok();
      done(true);
    });
  });
};