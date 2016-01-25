**Disclaimer: This plug-in is not ready for production yet since we still plan some changes in the API calls etc.
If you are interested in using the plug-in in a production environment, contact us first (see contact details below)**

# CTTV Target Genome Browser

Minimal genome browser built for the CTTV web application.


## Installation

From Git

````bash
git clone https://github.com/CTTV/targetGenomeBrowser
cd targetGenomeBrowser
npm install
npm build-browser
````

From npm
````
npm install cttv.genome
````

## Usage

`cttvGenomeBrowser` is based on [tnt.genome](https://github.com/emepyc/tnt.genome), a library for making minimal genome browsers and displaying genome annotation. Check its documentation for more options.
Example of usage:

````javascript
// Define an instance of tnt.genome
var gB = tnt.board.genome()
    .species("human")
    .gene("ENSG00000157764")
    .width(950);

// Define and instance of cttv.targetGenomeBrowser
var cttvGB = targetGenomeBrowser()
    .show_snps(false)
    .show_nav(true);

// Start the genome browser using the tnt.genome in the given div element
cttvGB (gB, document.getElementById("genomeBrowser"));
````
More examples available in the `examples` folder

## API

`cttvGenomeBrowser` exposes the following methods:

#### show_nav
If the buttons-based navigation is included in the display. Defaults to _true_.

````javascript
var cttvGB = targetGenomeBrowser()
    .show_nav(false);
````

#### show_links
If the link to the Ensembl Genome browser in included in the display. Defaults to _true_.

````javascript
var cttvGB = targetGenomeBrowser()
    .show_links(false);
````

#### show_snps
If the SNPs tracks are displayed. Defaults to _true_.

````javascript
var cttvGB = targetGenomeBrowser()
    .show_snps(false);
````


#### track
Returns a given track by name. The following names are available:

| Name           | Track                                                             |
| :------------- | :--------------------------------                                 |
| gene           | The Gene / Transcript track                                       |
| common_snps    | The track containing SNPs associating the gene to common diseases |
| rare_snps      | The track containing SNPs associating the gene to reare diseases  |


````javascript
var cttvGB = targetGenomeBrowser();
var geneTrack = cttvGB.track("gene");

geneTrack.display().on("click", function (gene) {
    var elem = this;
    var tooltip_obj = function (g) {
        var obj = {};
        obj.header = (g.display_name || g.external_name) + " (" + g.id + ")";
        obj.rows = [];

        obj.rows.push( {
            "label" : "Biotype",
            "value" : g.biotype
        });

        obj.rows.push( {
            "label" : "Description",
            "value" : g.description || g.gene.description
        });

        return obj;
    }
    tnt.tooltip.table()
        .call(elem, tooltip_obj(gene));
});
````

If any change is made to the _track_ after the plug-in has been initialised (see [tnt.genome](https://github.com/emepyc/tnt.genome) and [tnt.board](https://github.com/emepyc/tnt.board) for examples), the visualisation needs to be re-started using the `start` method

#### start
Re-start the genome browser after making any change. For example, the following snippet change the gene to be displayed as transcripts when a gene is clicked:

````javascript
gBTheme(gB, document.getElementById("genomeBrowser"));

var geneTrack = gBTheme.track("gene");
geneTrack.display().on("click", function (gene) {
    if (!gene.gene) { // It is not a transcript
        gB.gene (gene.id);
        gBTheme.start();
    }
});
````

## Feedback

Please, send any comments, bug reports or features request to support  (_AT_) targetvalidation.org
