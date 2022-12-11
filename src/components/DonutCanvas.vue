<script setup>
import { watch, ref, defineProps, onMounted } from 'vue';
import * as THREE from 'three';
import { useDonutStore } from "../stores/donutConf.js";
import { storeToRefs } from "pinia";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import donutModel from "../assets/models/compressed/dough.glb";
import glazeModel from "../assets/models/compressed/glaze.glb";
import donutLogo from "../assets/images/donuttello-logo.png";
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
const donutStore = useDonutStore();
const { glazeColor, extraWishes, toppings } = storeToRefs(donutStore);
const color = ref("");
const topping = ref("");
const text = ref("");
let oldTopping = "";
let bounty = "", brownie = "", caramel = "", chocolateOrbs = "", coconut = "", coffeeBean = "", glazeLines = "", leo = "", maltesers = "", marshmallow = "", oreo = "", nuts = "", orangePeel = "", pistachio = "", twix = "";
let toppingArray = [
    {
        name: "bounty",
        model: bountyModel,
        variable: bounty
    },
    {
        name: "brownie",
        model: brownieModel,
        variable: brownie
    },
    {
        name: "caramel",
        model: caramelModel,
        variable: caramel
    },
    {
        name: "chocolateOrbs",
        model: chocolateOrbsModel,
        variable: chocolateOrbs
    },
    {
        name: "coconut",
        model: coconutModel,
        variable: coconut
    },
    {
        name: "coffeeBean",
        model: coffeeBeanModel,
        variable: coffeeBean
    },
    {
        name: "glazeLines",
        model: glazeLinesModel,
        variable: glazeLines
    },
    {
        name: "leo",
        model: leoModel,
        variable: leo
    },
    {
        name: "maltesers",
        model: maltesersModel,
        variable: maltesers
    },
    {
        name: "marshmallow",
        model: marshmallowModel,
        variable: marshmallow
    },
    {
        name: "oreo",
        model: oreoModel,
        variable: oreo
    },
    {
        name: "nuts",
        model: nutsModel,
        variable: nuts
    },
    {
        name: "orangePeel",
        model: orangePeelModel,
        variable: orangePeel
    },
    {
        name: "pistachio",
        model: pistachioModel,
        variable: pistachio
    },
    {
        name: "twix",
        model: twixModel,
        variable: twix
    }
];

// update the glaze color when changed in the color picker
watch(
    glazeColor,
    (newVal) => {
        color.value = newVal;
        console.log(color.value);
    },
);

// update the topping (hide/show) when changed
watch(
    toppings,
    (newVal) => {
        oldTopping = topping.value;
        topping.value = newVal;
        console.log(newVal);
    },
);

// update the comment when edited
watch(
    extraWishes,
    (newVal) => {
        text.value = newVal;
        console.log(text.value);
    },
);

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
    const sizes = { width: domElement.offsetWidth, height: domElement.offsetHeight }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xCAE3E8);
    const camera = new THREE.PerspectiveCamera(50, domElement.offsetWidth / domElement.offsetHeight, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    dracoLoader.setDecoderConfig({ type: 'js' });
    // dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
    dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    const logoTexture = [
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( donutLogo ), transparent: true, opacity: 1, }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
    ];


    //load only the donut model
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

        // Load the donut logo
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cube = new THREE.Mesh(cubeGeometry, logoTexture);
        cube.position.set(0, 0.05, -0.045);
        cube.rotation.set(2.007, 3.14, 3.14);
        cube.scale.set(0.05, 0.03, 0.001);
        scene.add(cube);
    }

    // Load only the glaze model
    const loadGlaze = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
        // Load the glaze model
        loader.load(
            glazeModel,

            (gltf) => {
                const root = gltf.scene;
                root.traverse((child) => {
                    if (child.name === "glaze") { child.material.color.set(0xffffff) }
                });
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
    // load all topping dynamically
    const loadModel = (position = [0, 0, 0], scale = [1, 1, 1], model, arrayItem) => {
        loader.load(
            model,

            (gltf) => {
                arrayItem.variable = gltf.scene;
                arrayItem.variable.visible = false;
                arrayItem.variable.scale.set(...scale);
                arrayItem.variable.position.set(...position);
                scene.add(arrayItem.variable);
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

    // update the color of the glaze
    const updateColor = () => {
        scene.traverse((child) => {
            if (child.name === "glaze") { child.material.color.set(color.value) }
        });
    }



    // Animating the scene
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    // Calling the functions
    loadDonut();
    loadGlaze();
    animate();
    // update glaze color
    watch(color, updateColor);

    // update topping
    watch(topping, updateTopping);

})


</script>

<template>

</template>

<style scoped>

</style>