var attachFastClick = require('fastclick');
attachFastClick(document.body);
var donuts = require('./donuts');
var previouslyRan = false;
$(document).ready(function() {
    var resetInputOutput = function() {
        $('#input ol li').remove();
        $('#output ol li').remove();
    };

    for (var i in donuts.entropySet) {
        var donut = donuts.entropySet[i];
        var cssClass = donut.toLowerCase().replace(' ', '-');
        $('<li><a href="#">' + donut + '</a></li>')
            .addClass('donut ' + cssClass)
            .attr('data-donut', donut)
            .appendTo('#donut-basket ul');
    }

    $('#donut-basket li a')
        .click(function(e) {
            e.preventDefault();
            if (previouslyRan) {
                resetInputOutput();
            }

            previouslyRan = false;

            $(this)
                .parent() // Get the li tag
                .clone()
                .html('') // Remove the text and a tags
                .appendTo('#input ol');
        });

    $('#reset')
        .click(function() {
            resetInputOutput();
        });

    $('#run')
        .click(function() {
            previouslyRan = true;
            $('#output ol li').remove();
            var input = [];
            $('#input ol li').each(function() {
                input.push($(this).attr('data-donut'));
            });

            var output = donuts.dmm(input);

            for (var i in output) {
                var donut = output[i];
                var cssClass = donut.toLowerCase().replace(' ', '-');

                if (i == donuts.isMatchPosition && donuts.isMatch(output)) {
                    console.log('in');
                    console.log(donuts.isMatch(donuts));
                    cssClass = cssClass + ' match';
                }
                $('<li></li>')
                    .addClass('donut ' + cssClass)
                    .appendTo('#output ol');
            }
        });

});
