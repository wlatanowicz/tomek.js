var gulp = require('gulp');

gulp.task('tomek-test-create', function () {
	var path = require('path');
	var minimist = require('minimist');
	var glob = require('glob');
	var fs = require('fs');
	var mkdirp = require('mkdirp');
    var gutil = require('gulp-util');

	var argv = minimist(process.argv.slice(2));
	if (argv['name'] && argv['name'].length > 0) {
		var test_name = argv['name'];
	}
	else {
		gutil.log(gutil.colors.red('ERROR:'), gutil.colors.cyan('--name'), "argument needed");
		process.exit(1);
	}
	var base_dir = path.resolve("./test/");
	var source_dir = path.join(base_dir, "test_template");
	var tests_dir = path.join(base_dir, "tests");
	var existing_tests = glob.sync(path.join(tests_dir, '*'));
	var last_num = 0;
	for (var i = 0; i < existing_tests.length; i++) {
		var num = parseInt(existing_tests[i].substr(tests_dir.length + 1).split("_")[0]);
		last_num = num > last_num
				? num
				: last_num;
	}
	var test_num = ("00000" + (last_num + 1)).slice(-3);
	var test_full_name = test_num + "_" + test_name;
	var test_dir = path.join(tests_dir, test_full_name);
	var files = glob.sync(path.join(source_dir, '**'));
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var relPath = file.substr(source_dir.length);
		relPath = relPath.replace("__NUM__", test_num);
		var target = path.join(test_dir, relPath);
		var targetDir = path.dirname(target);
		if (!fs.lstatSync(file).isDirectory()) {
			mkdirp.sync(targetDir);
			var fileContent = fs.readFileSync(file, "utf-8");
			fileContent = fileContent.replace("__NUM__", test_num);
			fs.writeFileSync(target, fileContent, "utf-8");
		}
	}
});