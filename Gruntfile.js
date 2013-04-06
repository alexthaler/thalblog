module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
      grunt.log.write('Logging some stuff...').ok();
  });

  grunt.registerTask("clean", "cleans up generated files", function() {
    grunt.file.delete('build');
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

  grunt.registerTask("prebuild", "tasks that need to be done before calling build", function() {
      grunt.file.copy('config.json', 'config.json.bak');
      grunt.file.copy('publishConfig.json', 'config.json');
  });

  grunt.registerTask("postbuild", "tasks that need to be done after calling build", function() {
      grunt.file.copy('config.json.bak', 'config.json');
      grunt.file.delete('config.json.bak');
  });

  grunt.registerTask("build", "Calls through to wintersmith build, builds out the generated site", function (prop) {
      var done = this.async();
      grunt.log.write("Calling wintersmith build");

      grunt.util.spawn({
        cmd : "wintersmith",
        args : ["build"]
      }, function (err, result) {
        if(err) {
          grunt.log.error("holy crap!" + err).fail();
          return done(false);
        }
          grunt.log.writeln("generating site").ok();
          done(true);
      });
  });

  grunt.registerTask("copyPublish", "task that copies build directory to another directory", function() {
      var done = this.async();
      var localConfig = grunt.file.readJSON('gruntConfig.js');
      grunt.log.writeln("publshing site to " + localConfig.publish.gitdir);

      grunt.util.spawn({
        cmd : "cp",
        args : ["-r", 'build/.', localConfig.publish.gitdir]
      }, function (err, result) {
        if(err) {
          grunt.log.error("holy crap!" + err);
          return done(false);
        }
        grunt.log.writeln("building complete").ok();
        return done(true);
      });
  });

  grunt.registerTask("gitCommitPush", "task that goes to the gitdir and commits and pushes the changes", function() {
    var done = this.async();
      var localConfig = grunt.file.readJSON('gruntConfig.js');
      grunt.log.writeln("commiting and pushing changes to master in " + localConfig.publish.gitdir);

      grunt.util.spawn({
        cmd : localConfig.publish.gitdir + 'commitandpush.sh',
      }, function (err, result) {
        if(!err) {
          git.log.writeln('success!').ok();
          return done(true);
        }
        return done(false);
      });    
  });

  grunt.registerTask('publish', 'docs', function() {
    grunt.task.run('prebuild', 'build', 'copyPublish', 'gitCommitPush', 'postbuild');
  })

};