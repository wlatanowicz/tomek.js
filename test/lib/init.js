Namespace.use('jasmine.grammar.FeatureStory.*');
Namespace.use('jasmine.grammar.GWT.*');
Namespace.use('jasmine.grammar.Meta.*');

var jasmineEnv = jasmine.getEnv();
var styledReporter = new jasmine.reporting.StyledHtmlReporter();

jasmineEnv.addReporter(styledReporter);

jasmineEnv.specFilter = function(spec) {
	return styledReporter.specFilter(spec);
};

window.onload = function() {
	jasmineEnv.execute(); 
}