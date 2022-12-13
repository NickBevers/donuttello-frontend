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
import sprinklesModel from "../assets/models/sprinkles.glb";
import bountyModel from "../assets/models/compressed/bounty.glb";
import brownieModel from "../assets/models/compressed/brownie.glb";
import caramelModel from "../assets/models/compressed/caramel.glb";
import chocolateOrbsModel from "../assets/models/compressed/chocolateOrbs.glb";
import coconutModel from "../assets/models/compressed/coconut.glb";
import glazeLinesModel from "../assets/models/compressed/glazeLines.glb";
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
const { glazeColor, comment, toppings, logo, logoShape } = storeToRefs(donutStore);
const color = ref("");
const topping = ref("");
const text = ref("");
const logoUrl = ref("");
let oldTopping = "";
let bounty = "", brownie = "", caramel = "", chocolateOrbs = "", coconut = "", coffeeBean = "", glazeLines = "", leo = "", maltesers = "", marshmallow = "", oreo = "", nuts = "", orangePeel = "", pistachio = "", twix = "";
let toppingArray = [
    {
        name: "bounty",
        model: bountyModel,
        variable: bounty,
        position: [0, 0.002, 0],
        color: 0x583020
    },
    {
        name: "brownie",
        model: brownieModel,
        variable: brownie,
        position: [-0.01, 0, 0.01],
        color: 0x583020
    },
    {
        name: "caramel",
        model: caramelModel,
        variable: caramel,
        position: [0, 0, 0],
        color: ["#f5f5f5", "#d4955b", "#472301"],
    },
    {
        name: "chocolateOrbs",
        model: chocolateOrbsModel,
        variable: chocolateOrbs,
        position: [0, 0, 0],
        color: ["#f5f5f5", "#d4955b", "#472301"],
    },
    {
        name: "coconut",
        model: coconutModel,
        variable: coconut,
        position: [0, -0.001, 0],
        color: 0xf5f5f5
    },
    {
        name: "glazeLines",
        model: glazeLinesModel,
        variable: glazeLines,
        position: [0, 0, 0],
        color: 0xe3f2b1
    },
    {
        name: "leo",
        model: leoModel,
        variable: leo,
        position: [0, 0, 0],
        color: 0xbf804d,
    },
    {
        name: "maltesers",
        model: maltesersModel,
        variable: maltesers,
        position: [0, 0, 0],
        color: 0xbf6d21,
    },
    {
        name: "marshmallow",
        model: marshmallowModel,
        variable: marshmallow,
        position: [0, 0, -0.0017],
        color: 0xfafafa,
    },
    {
        name: "nuts",
        model: nutsModel,
        variable: nuts,
        position: [0, 0, 0],
    },
    {
        name: "oreo",
        model: oreoModel,
        variable: oreo,
        position: [0, 0, 0],
    },
    {
        name: "orangePeel",
        model: orangePeelModel,
        variable: orangePeel,
        position: [0, -0.005, 0.09],
        scale: [1.2, 1.2, 1.2],
        color: 0xf08024,
    },
    {
        name: "pistachio",
        model: pistachioModel,
        variable: pistachio,
        position: [0, -0.001, 0],
        color: 0xcfeb60,
    },
    {
        name: "twix",
        model: twixModel,
        variable: twix,
        position: [0, 0, 0],
        color: 0xb06a25,
    }
];

// update the glaze color when changed in the color picker
watch(
    glazeColor,
    (newVal) => {
        color.value = newVal;
        // console.log(color.value);
    },
);

// update the comment when edited
watch(
    comment,
    (newVal) => {
        text.value = newVal;
        // console.log(text.value);
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
    const sizes = { width: domElement.offsetWidth, height: domElement.offsetHeight }
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xCAE3E8);
    const camera = new THREE.PerspectiveCamera(50, domElement.offsetWidth / domElement.offsetHeight, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    dracoLoader.setDecoderConfig({ type: 'js' });
    // dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
    dracoLoader.setDecoderPath('/node_modules/three/examples/js/libs/draco/');
    loader.setDRACOLoader(dracoLoader);

    // const logoTexture = [
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    //     // new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load( donutLogo ), transparent: true, opacity: 1, }),
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    //     // ↓ FRONT OF THE BOX ↓
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    //     new THREE.MeshBasicMaterial({ color: 0xf5f5f5 }),
    // ];

    // // Load the donut logo
    // const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const cube = new THREE.Mesh(cubeGeometry, logoTexture);
    // cube.position.set(-0.02, 0.038, -0.04);
    // cube.rotation.set(1.9, 3, 3.5);
    // cube.scale.set(0.05, 0.03, 0.001);
    // scene.add(cube);

    
    // update the topping (hide/show) when changed
    watch(
        toppings,
        (newVal) => {
            oldTopping = topping.value;
            topping.value = newVal;
            updateTopping();
        },
    );

    // update the logo when changed in the logo picker
    watch(
        logo,
        (newVal) => {
            logoUrl.value = newVal;
            // console.log(logoUrl.value);
            loadLogo();
        },
    );

    watch(
        logoShape,
        (newVal) => {
            updateShape();
        },
    )

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
    }

    // Load only the glaze model
    const loadGlaze = (position = [0, 0, 0], scale = [1, 1, 1], colors = false) => {
        // Load the glaze model
        loader.load(
            glazeModel,

            (gltf) => {
                const root = gltf.scene;
                root.traverse((child) => {
                    if (child.name === "glaze") { child.material.color.set(0xffebfc) }
                });
                root.receiveShadow = true;
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
    const loadModel = (color, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1], model, arrayItem) => {
        loader.load(
            model,

            (gltf) => {
                arrayItem.variable = gltf.scene;
                // console.log(arrayItem.variable);
                arrayItem.variable.visible = false;
                arrayItem.variable.receiveShadow = false;
                if(Array.isArray(color)){
                    arrayItem.variable.traverse((o) => {
                        if (o.name === "chocolateWhite") {
                            o.material.color.set(color[0]);
                        } else if (o.name === "chocolateMilk") {
                            o.material.color.set(color[1]);
                        } else if (o.name === "chocolateDark") {
                            o.material.color.set(color[2]);
                        }
                    });
                } else if(color){
                    arrayItem.variable.traverse((o) => {
                        if (o.isMesh) {
                            o.material.color.set(color);
                        }
                    });
                }
                arrayItem.variable.scale.set(...scale);
                arrayItem.variable.position.set(...position);
                arrayItem.variable.rotation.set(...rotation);
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

    const loadLogo = () => {
        const geometry = new THREE.PlaneGeometry(0.04, 0.025);
        const material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(logoUrl.value), side: THREE.DoubleSide, transparent: true, opacity: 1, });
        const image = new THREE.Mesh(
            // new THREE.MeshBasicMaterial({ map: new THREE.ImageUtils.loadTexture(detailData.logo) }),
            geometry,
            material
        );
        image.position.set(-0.02, 0.039, -0.04);
        image.rotation.set(1.9, 3, 3.5);
        scene.add(image);
    }

    // Setting up the lights
    const ambientLight = new THREE.AmbientLight(0xffffff,  1);
    ambientLight.name = "ambientLight";
    // ambientLight.position.set(0, 10, 0);
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

    // change topping object
    const updateTopping = () => {
        // when updateing the first time oldTopping is empty, so we need to check if it is empty
        if (oldTopping !== "") {
            // get index from topingArray by name
            const index = toppingArray.findIndex((item) => item.name === oldTopping);

            // Hide the topping that is currently visible
            toppingArray[index].variable.visible = false;
        }

        // get index from topingArray by name
        const newIndex = toppingArray.findIndex((item) => item.name === topping.value);
        // console.log(newIndex);
        // console.log(toppingArray[newIndex]);

        // Show the new topping
        toppingArray[newIndex].variable.visible = true;
    }

    //update the logo shape
    const updateShape = () => {
        let geometry, texture, tempShape;
        scene.traverse((child) => {
            if (child.name === "logoShape") { scene.remove(child) }
        });
       
        switch (logoShape.value) {
            case "circle":
                geometry = new THREE.CircleGeometry(1, 32);
                texture = new THREE.MeshBasicMaterial({ color: 0xffffef, side: THREE.DoubleSide });
                tempShape = new THREE.Mesh(geometry, texture);
                tempShape.name = "logoShape";
                tempShape.castShadow = true;
                tempShape.position.set(-0.02, 0.038, -0.04);
                tempShape.rotation.set(1.9, 3, 3.5);
                tempShape.scale.set(0.025, 0.025, 0.002);
                break;

            case "oval":
                geometry = new THREE.CircleGeometry(1, 32);
                texture = new THREE.MeshBasicMaterial({ color: 0xffffef, side: THREE.DoubleSide });
                tempShape = new THREE.Mesh(geometry, texture);
                tempShape.name = "logoShape";
                tempShape.castShadow = true;
                tempShape.position.set(-0.02, 0.038, -0.04);
                tempShape.rotation.set(1.9, 3, 3.5);
                tempShape.scale.set(0.03, 0.02, 0.002);
                break;

            case "square":
                geometry = new THREE.BoxGeometry(1, 1, 1);
                texture = [
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                ];
                tempShape = new THREE.Mesh(geometry, texture);
                tempShape.name = "logoShape";
                tempShape.castShadow = true;
                tempShape.position.set(-0.02, 0.038, -0.04);
                tempShape.rotation.set(1.9, 3, 3.5);
                tempShape.scale.set(0.04, 0.04, 0.001);
                break;

            case "rectangle":
                geometry = new THREE.BoxGeometry(1, 1, 1);
                texture = [
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                    new THREE.MeshBasicMaterial({ color: 0xffffef }),
                ];
                tempShape = new THREE.Mesh(geometry, texture);
                tempShape.name = "logoShape";
                tempShape.castShadow = true;
                tempShape.position.set(-0.02, 0.038, -0.04);
                tempShape.rotation.set(1.9, 3, 3.5);
                tempShape.scale.set(0.05, 0.03, 0.001);
                break;
            default:
                break;
        }

        scene.add(tempShape);
    }

    // load toppings
    const loadToppings = () => {
        let modelToLoad;
        toppingArray.forEach((item) => {
            modelToLoad = item.model;
            loadModel(item.color, item.position, [0, 0, 0], item.scale || [1, 1, 1], modelToLoad, item);
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
    loadToppings();
    animate();
    // update glaze color
    watch(color, updateColor);
})


</script>

<template>
    
</template>

<style scoped>

</style>