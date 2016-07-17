var hasher = require('sha1');

var puzzle = {
    entropySet: [
        'Sprinkles',
        'Plain',
        'Jelly',
        'Chocolate',
        'French Cruller',
        'Old Fashioned'
    ],
    isMatchPosition: 0,
    isMatch: function (donuts) {
        return donuts[this.isMatchPosition] == this.entropySet[0];
    },
    mapToSet: function(number) {
        // This maps the hash results to our donut set
        var mod = number % 24;
        if (mod < 4) {
            return this.entropySet[0];
        }

        if (mod < 8) {
            return this.entropySet[1];
        }

        if (mod < 12) {
            return this.entropySet[2];
        }

        if (mod < 16) {
            return this.entropySet[3];
        }

        if (mod < 20) {
            return this.entropySet[4];
        }

        if (mod < 24) {
            return this.entropySet[5];
        }
    },
    dmm: function(input) {
        if(input.length == 0)
            return [];
        var reversed = Array.prototype.slice.call(input).reverse();
        input = input.concat(reversed);
        var toHash = input.join(' ');
        var hash = hasher(toHash);
        var output = [];
        var split = hash.match(/[a-z0-9A-Z]{8}/g);
        for (var i in split) {
            var item = split[i];
            var number = parseInt(item, 16);
            var mapped = this.mapToSet(number);
            output.push(mapped);
        }
        return output;
    }
};


module.exports = puzzle;
