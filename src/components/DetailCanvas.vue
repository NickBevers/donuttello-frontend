<script setup>
    import { watch, ref, reactive, defineProps, onMounted } from 'vue';
    import * as THREE from 'three';
    import { useDonutStore } from "../stores/donutConf.js";
    import { storeToRefs } from "pinia";
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    import donutModel from "../assets/models/compressed/dough.glb";
    import glazeModel from "../assets/models/compressed/glaze.glb";
    import donutLogo from "../assets/images/donuttello-logo.png";
    import sprinklesModel from "../assets/models/sprinkles.glb";
    import bountyModel from "../assets/models/compressed/bounty.glb";
    import brownieModel from "../assets/models/compressed/brownie.glb";
    import caramelModel from "../assets/models/compressed/caramel.glb";
    import chocolateOrbsModel from "../assets/models/compressed/chocolateOrbs.glb";
    import coconutModel from "../assets/models/compressed/coconut.glb";
    import coffeeBeanModel from "../assets/models/compressed/coffeeBean.glb";
    import glazeLinesModel from "../assets/models/glazeLines.glb";
    import leoModel from "../assets/models/compressed/leo.glb";
    import maltesersModel from "../assets/models/compressed/maltesers.glb";
    import marshmallowModel from "../assets/models/compressed/marshmallow.glb";
    import oreoModel from "../assets/models/compressed/oreo.glb";
    import nutsModel from "../assets/models/compressed/nuts.glb";
    import orangePeelModel from "../assets/models/compressed/orangePeel.glb";
    import pistachioModel from "../assets/models/compressed/pistachio.glb";
    import twixModel from "../assets/models/compressed/twix.glb";
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    let detailData = reactive( {} );
    let glaze, sprinkles;

    const detailProps = defineProps({
        donut: {
            type: Object,
            required: true
        }
    });

    onMounted(() => {
        const domElement = document.querySelector(".configurator__canvas");
        const sizes = { width: domElement.offsetWidth, height: domElement.offsetHeight }
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xCAE3E8);
        const camera = new THREE.PerspectiveCamera(50, domElement.offsetWidth / domElement.offsetHeight, 0.01, 1000);
        const controls = new OrbitControls(camera, renderer.domElement);
        dracoLoader.setDecoderConfig({ type: 'js' });
        // dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');
        loader.setDRACOLoader(dracoLoader);

        watch(detailProps, () => {
            detailData = detailProps.donut;

            if (detailData.glaze) {

                loadLogoShape(detailData.logoShape);

                if(!glaze){
                    setTimeout(() => {
                        glaze.traverse((child) => {
                            if (child.name === "glaze") {
                                child.material.color.set(detailData.glaze)
                            }
                        });

                        sprinkles.traverse((child) => {
                            if (child.name === "sprinkles") {
                                child.material.color.set(detailData.topping1.split(" ")[1]);
                            }
                        });
                    }, 1000);
                } else{
                    glaze.traverse((child) => {
                        if (child.name === "glaze") {
                            child.material.color.set(detailData.glaze)
                        }
                    });

                    sprinkles.traverse((child) => {
                            if (child.name === "sprinkles") {
                                child.material.color.set(detailData.topping1.split(" ")[1]);
                            }
                        });
                }

            }
        });

        
        const loadLogoShape = (shape) => {
            var geometry, texture, logoShape;
            switch (shape) {
                case "circle":
                    geometry = new THREE.CircleGeometry(1, 32);
                    texture = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
                    logoShape = new THREE.Mesh(geometry, texture);
                    logoShape.position.set(0, 0.038, -0.045);
                    logoShape.rotation.set(2.007, 3.14, 3.14);
                    logoShape.scale.set(0.025, 0.025, 0.002);
                    break;

                case "oval":
                    geometry = new THREE.CircleGeometry(1, 32);
                    texture = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
                    logoShape = new THREE.Mesh(geometry, texture);
                    logoShape.position.set(0, 0.038, -0.045);
                    logoShape.rotation.set(2.007, 3.14, 3.14);
                    logoShape.scale.set(0.03, 0.02, 0.002);
                    break;

                case "square":
                    geometry = new THREE.BoxGeometry(1, 1, 1);
                    texture = [
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                    ];
                    logoShape = new THREE.Mesh(geometry, texture);
                    logoShape.position.set(0, 0.038, -0.045);
                    logoShape.rotation.set(2.007, 3.14, 3.14);
                    logoShape.scale.set(0.04, 0.04, 0.001);
                    break;

                case "rectangle":
                    geometry = new THREE.BoxGeometry(1, 1, 1);
                    texture = [
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                        new THREE.MeshBasicMaterial({ color: 0xffffff }),
                    ];
                    logoShape = new THREE.Mesh(geometry, texture);
                    logoShape.position.set(0, 0.038, -0.045);
                    logoShape.rotation.set(2.007, 3.14, 3.14);
                    logoShape.scale.set(0.05, 0.03, 0.001);
                    break;
                default:
                    break;
            }

            // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(donutLogo), transparent: true, opacity: 1, }),
            // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(donutLogo) }),
            
            scene.add(logoShape);
        }


        //Loading the model and adding it to the scene
        const loadDonut = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
            // Load the donut model
            loader.load(
                donutModel,

                (gltf) => {
                    const root = gltf.scene;
                    root.scale.set(...scale);
                    root.position.set(...position);
                    scene.add(root);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        const loadGlaze = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
            // Load the glaze model
            loader.load(
                glazeModel,

                (gltf) => {
                    glaze = gltf.scene;
                    glaze.traverse((child) => {
                        if (child.name === "glaze") { child.material.color.set(0xffffff) }
                    });
                    glaze.scale.set(...scale);
                    glaze.position.set(...position);
                    scene.add(glaze);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }

        const loadSprinkles = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
            // Load the glaze model
            loader.load(
                sprinklesModel,

                (gltf) => {
                    sprinkles = gltf.scene;
                    console.log(sprinkles);
                    sprinkles.traverse((child) => {
                        if (child.name === "sprinkles") { child.material.color.set("#ffffff") }
                    });
                    sprinkles.scale.set(...scale);
                    sprinkles.position.set(...position);
                    scene.add(sprinkles);
                },

                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },

                (error) => {
                    console.log('An error happened');
                    console.error(error);
                }
            );
        }


        // Setting up the lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.position.set(2, 2, 5);
        scene.add(ambientLight);


        // Setting up the camera
        camera.position.set(0, 0, 0.5);
        controls.update();
        controls.autoRotate = true;


        // Setting up the renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.gammaOutput = true;
        document.querySelector(".configurator__canvas").appendChild(renderer.domElement);
        renderer.render(scene, camera);

        // Animating the scene
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        // Calling the functions
        loadDonut();
        loadGlaze();
        loadSprinkles();
        animate();

    })
</script>

<template>

</template>

<style scoped>

</style>