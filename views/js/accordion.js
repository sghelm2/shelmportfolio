/**
 * code originally created by Rob Schmuecker at http://jsfiddle.net/hEApL/147/
 */
$(document).ready(function () {
    $(".accordion").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });
    var icons = $(".accordion").accordion("option", "icons");
    $('.ui-accordion-header').click(function () {
        $('.open').removeAttr("disabled");
        $('.close').removeAttr("disabled");

    });
});

