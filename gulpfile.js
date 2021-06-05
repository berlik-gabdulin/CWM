var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	cleanCSS = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	browserSync = require("browser-sync").create(),
	concat = require("gulp-concat"),
	uglify = require("gulp-uglify-es").default;

gulp.task("browser-sync", function () {
	browserSync.init({
		server: {
			baseDir: "docs",
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	});
});
function bsReload(done) {
	browserSync.reload();
	done();
}

gulp.task("styles", function () {
	return gulp
		.src("scss/**/*.scss")
		.pipe(
			sass({
				outputStyle: "expanded",
				includePaths: require("node-bourbon").includePaths,
			}).on("error", sass.logError)
		)
		.pipe(rename({ suffix: ".min", prefix: "" }))
		.pipe(
			autoprefixer({
				// grid: true, // Optional. Enable CSS Grid
				overrideBrowserslist: ["last 10 versions"],
			})
		)
		.pipe(cleanCSS())
		.pipe(gulp.dest("docs/css"))
		.pipe(browserSync.stream());
});

gulp.task("scripts", function () {
	return gulp
		.src([
			"docs/libs/modernizr/modernizr.js",
			"docs/libs/jquery/jquery-1.11.2.min.js",
			"docs/libs/waypoints/waypoints.min.js",
			"docs/libs/animate/animate-css.js",
		])
		.pipe(concat("libs.js"))
		.pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest("docs/js/"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task("code", function () {
	return gulp.src("docs/**/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", function () {
	gulp.watch("scss/**/*.scss", gulp.parallel("styles"));
	gulp.watch(
		["docs/js/common.js", "docs/libs/**/*.js"],
		gulp.parallel("scripts")
	);
	gulp.watch("docs/*.html", gulp.parallel("code"));
});

gulp.task(
	"default",
	gulp.parallel("styles", "scripts", "browser-sync", "watch")
);
