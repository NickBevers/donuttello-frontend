<script setup>
    import { watch, ref, defineProps, onMounted } from 'vue';
    import * as THREE from 'three';
    import { useDonutStore } from "../stores/donutConf.js";
    import {storeToRefs} from "pinia";
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
    import donutModel from "../assets/models/compressed/dough.glb";
    import glazeModel from "../assets/models/compressed/glaze.glb";
    import donutLogo from "../assets/images/donuttello-logo.png";
    const donutStore = useDonutStore();
    const { glazeColor, extraWishes } = storeToRefs(donutStore);
    const color = ref("");
    watch(
        glazeColor,
        (newVal) => {
          color.value = newVal;
          console.log(color.value);
        },
    );
    const text = ref("");
    watch(
        extraWishes,
        (newVal) => {
          text.value = newVal;
          console.log(text.value);
        },
    );
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    
    const props = defineProps({
        donutData: {
            type: Object,
            required: false
        }
    })
    const donut = props.donutData;

    onMounted(() => {
        const domElement = document.querySelector(".configurator__canvas");
        console.log(domElement);
        const sizes = { width: domElement.offsetWidth, height: domElement.offsetHeight - 92 }
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xCAE3E8 );
        const camera = new THREE.PerspectiveCamera( 50, domElement.offsetWidth / domElement.offsetHeight, 0.01, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        const controls = new OrbitControls( camera, renderer.domElement );
        dracoLoader.setDecoderConfig({ type: 'js' });
        // dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
        dracoLoader.setDecoderPath( '/node_modules/three/examples/js/libs/draco/' );
        loader.setDRACOLoader(dracoLoader);

        const logoTexture = [
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( donutLogo ), transparent: true, opacity: 1, }),
            // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(donutLogo) }),
            new THREE.MeshBasicMaterial({ color: 0xffffff }),
        ];


        //Loading the model and adding it to the scene
        const loadDonut = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
            // Load the donut model
            loader.load(
                donutModel,

                ( gltf ) => {
                    const root = gltf.scene;
                    root.scale.set(...scale);
                    root.position.set(...position);
                    scene.add( root );
                },

                ( xhr ) => {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },

                ( error ) => {
                    console.log( 'An error happened' );
                    console.error( error );
                }
            );

            // Load the donut logo
            const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
            const cube = new THREE.Mesh( cubeGeometry, logoTexture );
            cube.position.set(0, 0.05, -0.045);
            cube.rotation.set(2.007, 3.14, 3.14);
            cube.scale.set(0.05, 0.03, 0.001);
            scene.add( cube );
        }

        const loadGlaze = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
            // Load the glaze model
            loader.load(
                glazeModel,

                ( gltf ) => {
                    const root = gltf.scene;
                    root.traverse( ( child ) => {
                        if ( child.name === "glaze" ) { child.material.color.set(0xffffff) }
                    });
                    root.scale.set(...scale);
                    root.position.set(...position);
                    scene.add( root );
                },

                ( xhr ) => {
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },

                ( error ) => {
                    console.log( 'An error happened' );
                    console.error( error );
                }
            );
        }


        // Setting up the lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.position.set(2, 2, 5);
        scene.add(ambientLight);


        // Setting up the camera
        camera.position.set( 0, 0, 0.5 );
        controls.update();
        controls.autoRotate = true;


        // Setting up the renderer
        renderer.setSize( sizes.width, sizes.height );
        renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
        renderer.shadowMap.enabled = true;
        renderer.gammaOutput = true;
        document.querySelector(".configurator__canvas").appendChild( renderer.domElement );
        renderer.render( scene, camera );


        // Animating the scene
        const animate = () => {
            requestAnimationFrame( animate );
            controls.update();
            renderer.render( scene, camera );
        }

        // Calling the functions
        loadDonut();
        loadGlaze();
        animate();
    })


</script>

<template>
    
</template>

<style scoped>

</style>