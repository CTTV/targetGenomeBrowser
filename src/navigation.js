var genome_browser_nav = function () {
    "use strict";

    var show_options = true;
    var show_title = true;
    var title = "";
    var orig;
    var fgColor = "#586471";
    // var chr = 0;
    var gBrowser;

    var theme = function (gB, container) {
        gBrowser = gB;
        var div = d3.select(container)
            .append("div")
            .attr("class", "tnt_nav_wrapper");

        var opts_pane = div
            .append ("div")
            .attr("class", "tnt_nav_pane")
            .style("display", function() {
                if (show_options) {
                    return "inline-block";
                }
                return "none";
            });

        opts_pane
            .append("span")
            .text("Human Chr: " + gB.chr());

        var left_button = opts_pane
            .append("i")
            .attr("title", "go left")
            .attr("class", "cttvGenomeBrowserIcon fa fa-arrow-circle-left fa-2x")
            .on("click", theme.left);

        var zoomIn_button = opts_pane
            .append("i")
            .attr("title", "zoom out")
            .attr("class", "cttvGenomeBrowserIcon fa fa-search-plus fa-2x")
            .on("click", theme.zoomOut);

        var zoomOut_button = opts_pane
            .append("i")
            .attr("title", "zoom in")
            .attr("class", "cttvGenomeBrowserIcon fa fa-search-minus fa-2x")
            .on("click", theme.zoomIn);

        var right_button = opts_pane
            .append("i")
            .attr("title", "go right")
            .attr("class", "cttvGenomeBrowserIcon fa fa-arrow-circle-right fa-2x")
            .on("click", theme.right);

        var origLabel = opts_pane
            .append("i")
            .attr("title", "reload location")
            .attr("class", "cttvGenomeBrowserIcon fa fa-refresh fa-lt")
            .on("click", function () {
                gBrowser.start(orig)
            });

            // We set up the origin:
        if (!orig) {
            if (gBrowser.gene() !== undefined) {
                orig = {
                    species : gBrowser.species(),
                    gene    : gBrowser.gene()
                };
            } else {
                orig = {
                    species : gBrowser.species(),
                    chr     : gBrowser.chr(),
                    from    : gBrowser.from(),
                    to      : gBrowser.to()
                }
            }
        }
        // orig = {
        //     species : gBrowser.species(),
        //     chr     : gBrowser.chr(),
        //     from    : gBrowser.from(),
        //     to      : gBrowser.to()
        // };
    };

    //// API
    theme.left = function () {
        gBrowser.scroll(1.5);
    };

    theme.right = function () {
        gBrowser.scroll(-1.5);
    };

    theme.zoomIn = function () {
        gBrowser.zoom(0.5);
    };

    theme.zoomOut = function () {
        gBrowser.zoom(1.5);
    };

    theme.show_options = function(b) {
        show_options = b;
        return this;
    };
    theme.show_title = function(b) {
        show_title = b;
        return this;
    };

    theme.title = function (s) {
        if (!arguments.length) {
            return title;
        }
        title = s;
        return this;
    };

    theme.foreground_color = function (c) {
        if (!arguments.length) {
            return fgColor;
        }
        fgColor = c;
        return this;
    };

    theme.orig = function (p) {
        if (!arguments.length) {
            return orig;
        }
        orig = p;
        return this;
    };

    // theme.chr = function (c) {
    //     if (!arguments.length) {
    //         return chr;
    //     }
    //     chr = c;
    //     return this;
    // };


    return theme;
};

module.exports = exports = genome_browser_nav;
