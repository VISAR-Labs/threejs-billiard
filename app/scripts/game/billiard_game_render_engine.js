(function(W, Hooray) {
    "use strict";

    var Billiard = Hooray.Namespace('Billiard', 'Billiard');
    Billiard.GameRenderEngine = Hooray.Class({
        init: function(gameContainerId) {
            Hooray.log('A new Billiard.GameRenderEngine instance has been created within "'+gameContainerId+'"!');

            // init gameContainer
            this.gameContainer = this.initGameContainer(gameContainerId);

            // init asset loader
            this.assetLoader = new Billiard.AssetLoader();

            // init renderer
            this.renderer = this.initRenderer(this.gameContainer);

            // init scene
            this.scene = new THREE.Scene();

            // create a camera, position it and add it to the scene
            this.camera = this.initCamera(this.gameContainer, this.scene);

            // create data structure for meshes (balls, etc.)
            this.meshes = {};

            // init light
            this.light = this.initLight();
        },

        initGameRenderEngine: function(assets) {
            var that = this;
            var assetId, geometry, material, sphere;

            return this.assetLoader.getMaps(Object.keys(assets)).then(function(mapHash) {
                // create three.js sphere that represents a ball and add it to the scene
                for (assetId in assets) {
                    if (assets.hasOwnProperty(assetId)) {
                        geometry = new THREE.SphereGeometry(assets[assetId].radius, 32, 32);
                        material = new THREE.MeshPhongMaterial({
                            map: mapHash[assetId]
                            //shininess: 52
                            //color: 0x00FF00
                        });
                        sphere = new THREE.Mesh(geometry, material);
                        sphere.position.x = assets[assetId].x;
                        sphere.position.y = assets[assetId].y;

                        that.scene.add(sphere);
                        that.meshes[assetId] = sphere;
                    }
                }

                return function() {
                    that.render();
                };
            });
        },

        render: function() {
            this.renderer.render(this.scene, this.camera);
        },

        initGameContainer: function(gameContainerId) {
            var gameContainer = W.document.getElementById(gameContainerId);
            return {
                domElement: gameContainer,
                width: gameContainer.offsetWidth,
                height: gameContainer.offsetHeight
            };
        },

        initRenderer: function(gameContainer) {
            var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
            renderer.setSize(gameContainer.width, gameContainer.height);
            gameContainer.domElement.appendChild(renderer.domElement);

            return renderer;
        },

        initCamera: function(gameContainer, scene) {
            var width   = gameContainer.width,
                height  = gameContainer.height,
                left    = width / -2,
                right   = width / 2,
                top     = height / 2,
                bottom  = height / -2,
                near    = 1,
                far     = 1000,
                camera  = new THREE.OrthographicCamera(
                    left, right,
                    top, bottom,
                    near, far
                );

            camera.position.z = 400;
            scene.add(this.camera);

            Hooray.log(
                'Initializing camera! [left, right, top, bottom, near, far]',
                left, right, top, bottom, near, far
            );

            return camera;
        },

        initLight: function() {
            var light = new THREE.DirectionalLight(0xFFFFFF, 1);
            light.position.set(0, 0, 1);
            this.scene.add(light);

            return light;
        }
    });
})(window, Hooray);
