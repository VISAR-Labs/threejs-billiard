(function(W, T, Hooray) {
    "use strict";

    var Rules = Hooray.Namespace('Billiard.Rules', 'Billiard');
    Rules.EightBall = Hooray.Class({
        init: function() {
            Hooray.log('A new Billiard.Rules.EightBall instance has been created!');

            this.balls = {
                'images/ball0.jpg' : {x: 0, y: 0},
                'images/ball1.jpg' : {x: 0, y: 0},
                'images/ball2.jpg' : {x: 0, y: 0},
                'images/ball3.jpg' : {x: 0, y: 0},
                'images/ball4.jpg' : {x: 0, y: 0},
                'images/ball5.jpg' : {x: 0, y: 0},
                'images/ball6.jpg' : {x: 0, y: 0},
                'images/ball7.jpg' : {x: 0, y: 0},
                'images/ball8.jpg' : {x: 0, y: 0},
                'images/ball9.jpg' : {x: 0, y: 0},
                'images/ball10.jpg': {x: 0, y: 0},
                'images/ball11.jpg': {x: 0, y: 0},
                'images/ball12.jpg': {x: 0, y: 0},
                'images/ball13.jpg': {x: 0, y: 0},
                'images/ball14.jpg': {x: 0, y: 0},
                'images/ball15.jpg': {x: 0, y: 0}
            };

            this.radius = 20;
        },

        getBalls: function() {
            // return a cloned object
            var obj = {},
                prop;

            for (prop in this.balls) {
                if (this.balls.hasOwnProperty(prop)) {
                    obj[prop] = this.balls[prop];
                }
            }

            return obj;
        },

        getBallRadius: function() {
            return this.radius;
        }
    });
})(window, THREE, Hooray);
