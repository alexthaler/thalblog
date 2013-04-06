module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
      grunt.log.write('Logging some stuff...').ok();
  });


  grunt.registerTask("preview", "Calls through to wintersmith preview", function (prop) {
      var done = this.async();
      grunt.log.write("Calling wintersmith preview: check localhost:8080");

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

  grunt.registerTask("build", "Calls through to wintersmith build, builds out the generated site", function (prop) {
      var done = this.async();
      grunt.log.write("Calling wintersmith build");

      grunt.util.spawn({
        cmd : "wintersmith",
        args : ["build"]
      }, function(err, result) {
        if(err) {
          grunt.log.error("holy crap!" + err).fail();
          return done(false);
        }
          grunt.log.writeln("generating site").ok();
          done(true);
      });
  });

  grunt.registerTask("publish", "publish", function() {
      var done = this.async();
  });
};