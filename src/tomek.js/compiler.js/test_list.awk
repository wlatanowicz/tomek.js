BEGIN {
	print "var TESTS = [];"
}
{
	print "TESTS.push( \"" $1 "\" );"
}
