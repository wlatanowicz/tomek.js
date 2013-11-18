#!/bin/bash

#
# This will work, although a proper Makefile or latexmk is recommended.
# latexmk -pvc -pdf thesis-master-english.tex
#

cd tmp

rm -f *

ln -s ../figures
cp ../*.tex .
cp ../*.cls .
cp ../*.bib .

#wstawienie twardych spacji:
for f in *.tex
do
  php -r 'file_put_contents( $argv[1], eregi_replace( "([[:space:]]+[azoiw])[[:space:]]+", "\\1~", file_get_contents( $argv[1] ) ) );'  $f
  php -r 'file_put_contents( $argv[1], eregi_replace( "([[:space:]~]+[azoiw])[[:space:]]+", "\\1~", file_get_contents( $argv[1] ) ) );'  $f
done

pdflatex 00-praca.tex
bibtex   00-praca
pdflatex 00-praca.tex
pdflatex 00-praca.tex

#rm -f *.aux *.bak *.log *.blg *.bbl *.toc *.out

mv *.pdf ..

#rm -f *

