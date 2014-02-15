(function(W, Hooray) {
    "use strict";

    Hooray.defineClass('Billiard', '', 'Ball', {
        init: function(id, initX, initY, radius, mass) {
            Hooray.log('A new Billiard.Ball instance has been created with id "'+id+'"!');
            this.id     = id;
            this.initX  = initX;
            this.initY  = initY;
            this.radius = radius;
            this.mass   = mass;

            this.vX     = 1;
            this.vY     = 1;

            this.rotationHelper = Billiard.Helper.RotationHelper;

            //this.coordsRotationHelper = Billiard.Helper.CoordsRotationHelper;

            /*this.collisionHelper = {
                ball0Center: new THREE.Vector2(0, 0),
                ball1Center: new THREE.Vector2(0, 0),
                v0: new THREE.Vector2(0, 0),
                v1: new THREE.Vector2(0, 0),
                n: new THREE.Vector2(0, 0),
                tmp: new THREE.Vector2(0, 0)

            };*/

            // !!! A Billiard.Ball object will be augmented with a mesh property during initialization !!!
        },

        translate: function() {
            this.mesh.position.x += this.vX;
            this.mesh.position.y += this.vY;
        },

        rotate: function() {
            this.rotationHelper.rotateAroundWorldAxisX(this.mesh, -this.vY / this.radius);
            this.rotationHelper.rotateAroundWorldAxisY(this.mesh, this.vX / this.radius);
        },

        handleCushionCollision: function(table) {
            var m = this.mesh,
                r = this.radius,
                halfWidth  = table.getPlayingFieldWidth()  / 2,
                halfHeight = table.getPlayingFieldHeight() / 2;

            if (m.position.x+r > halfWidth) {
                m.position.x = halfWidth - r;
                this.vX *= -1;
            }
            else if (m.position.x-r < -halfWidth) {
                m.position.x = -halfWidth + r;
                this.vX *= -1;
            }

            if (m.position.y+r > halfHeight) {
                m.position.y = halfHeight - r;
                this.vY *= -1;
            }
            else if (m.position.y-r < -halfHeight) {
                m.position.y = -halfHeight + r;
                this.vY *= -1;
            }
        },

        handleBallCollision: function(anotherBall) {
            var ball0 = this.mesh.position,
                ball1 = anotherBall.mesh.position;

            var dx = ball1.x - ball0.x,
                dy = ball1.y - ball0.y,
                dist = Math.sqrt(dx * dx + dy * dy);

            // check for collision based on radius
            if (dist < this.radius + anotherBall.radius) {


                var angle = Math.atan2(dy, dx),
                    sin = Math.sin(angle),
                    cos = Math.cos(angle),
                    e = 1;

                // rotate velocity vectors
                var ball0vXr = this.vX * cos + this.vY * sin;
                var ball0vYr = -this.vX * sin + this.vY * cos;

                var ball1vXr = anotherBall.vX * cos + anotherBall.vY * sin;
                var ball1vYr = -anotherBall.vX * sin + anotherBall.vY * cos;

                // apply conservation of momentum
                var tmp = 1 / (this.mass + anotherBall.mass);
                var newVxBall0 = (this.mass - e * anotherBall.mass) * ball0vXr * tmp
                                    + (1 + e) * anotherBall.mass * ball1vXr * tmp;

                var newVxBall1 = (1 + e) * this.mass * ball0vXr * tmp
                                    + (anotherBall.mass - e * this.mass) * ball1vXr * tmp;

                // rotate velocity vectors back
                this.vX = newVxBall0 * cos - ball0vYr * sin;
                this.vY = newVxBall0 * sin + ball0vYr * cos;

                anotherBall.vX = newVxBall1 * cos - ball1vYr * sin;
                anotherBall.vY = newVxBall1 * sin + ball1vYr * cos;



                /*var crh = this.coordsRotationHelper;

                // calculate angle, sine, and cosine
                var angle = Math.atan2(dy, dx),
                    sin = Math.sin(angle),
                    cos = Math.cos(angle),
                // rotate ball0's position
                    pos0 = {x: 0, y: 0}, //point
                // rotate ball1's position
                    pos1 = crh.rotateCoords(dx, dy, sin, cos, true),
                // rotate ball0's velocity
                    vel0 = crh.rotateCoords(this.vX, this.vY, sin, cos, true),
                // rotate ball1's velocity
                    vel1 = crh.rotateCoords(anotherBall.vX, anotherBall.vY, sin, cos, true);

                // collision reaction is as easy as swapping the two velocities
                // because we deal with same mass objects
                var temp = vel0;
                vel0 = vel1;
                vel1 = temp;


                // update position avoiding objects becoming stuck together
                var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
                    overlap = (this.radius + anotherBall.radius) - Math.abs(pos0.x - pos1.x);
                pos0.x += vel0.x / absV * overlap;
                pos1.x += vel1.x / absV * overlap;

                // rotate positions back
                var pos0F = crh.rotateCoords(pos0.x, pos0.y, sin, cos, false),
                    pos1F = crh.rotateCoords(pos1.x, pos1.y, sin, cos, false);

                // adjust positions to actual screen positions
                ball1.x = ball0.x + pos1F.x;
                ball1.y = ball0.y + pos1F.y;
                ball0.x = ball0.x + pos0F.x;
                ball0.y = ball0.y + pos0F.y;

                // rotate velocities back
                var vel0F = crh.rotateCoords(vel0.x, vel0.y, sin, cos, false),
                    vel1F = crh.rotateCoords(vel1.x, vel1.y, sin, cos, false);
                this.vX = vel0F.x;
                this.vY = vel0F.y;
                anotherBall.vX = vel1F.x;
                anotherBall.vY = vel1F.y;*/
            }
        }
    });

})(window, Hooray);
