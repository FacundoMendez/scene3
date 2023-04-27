import { gsap } from 'gsap';
import * as THREE from 'three';

const sceneSpace = () => {

    const canvas = document.querySelector('.webGlScene')
    
        // scene setup
        const scene = new THREE.Scene();
        
    
        const size = {
            width :  window.innerWidth,
            height : window.innerHeight
        }
        
        window.addEventListener ('resize', () => {
            size.width = window.innerWidth
            size.height = window.innerHeight
        
            camera.aspect = size.width / size.height
            camera.updateProjectionMatrix()

            renderer.setSize(size.width, size.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })



        const cameraGroup = new THREE.Group()
        scene.add(cameraGroup)

        // Base camera
        const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 0.1, 100)
        camera.position.z = 11
        camera.position.y = 1
        camera.position.x = 1
        cameraGroup.add(camera)
        

        // renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha:true
        });
        
        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




        // Stars 


        const starsGeometry =new THREE.BufferGeometry()
        const count = 2000

        const colors = new Float32Array(count * 3)
        const positions = new Float32Array(count * 3) 
        let geometry = null
        let material = null
        let points = null

        

        for(let i = 0; i < count * 3; i++) {

            if(points !== null)
            {
                geometry.dispose()
                material.dispose()
                scene.remove(points)
            }

            positions[i] = (Math.random() - 0.5) * 25
            colors[i] = Math.random()
        }


        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 2))
        


        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            color: new THREE.Color("#999999"),
        })

        const particles = new THREE.Points(starsGeometry, particlesMaterial)
        particlesMaterial.alphaTest = .1
       /*  particlesMaterial.vertexColors = true */

        scene.add(particles)



        /* aureola  */
        const parameters = {
            count: 100000,
            size: 0.03,
            radius: 18,
            branches: 3,
            spin: 1,
            randomness: 1,
            randomnessPower: 5,
           /*  insideColor: '#ff6030', */
           insideColor: '#FF1044',
            outsideColor: '#4200EA',
          };
          
          let geometryAureola = null;
          let materialAureola = null;
          let pointsAureola = null;
          
          function createAureola() {
            if (pointsAureola !== null) {
              geometryAureola.dispose();
              materialAureola.dispose();
              scene.remove(pointsAureola);
            }
          
            const geometryAureolaStars = new THREE.BufferGeometry();
            const positionsAureola = new Float32Array(parameters.count * 3);
            const colorsAureola = new Float32Array(parameters.count * 3);
          
            for (let i = 0; i < parameters.count; i++) {
              const i3 = i * 3;
              const radius = Math.random() * parameters.radius;
              const spinAngle = radius * parameters.spin;
              const branchAngle = ((i - parameters.branches) / parameters.branches) * Math.PI * 2;
              const randomX =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;
              const randomY =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;
              const randomZ =
                Math.pow(Math.random(), parameters.randomnessPower) *
                (Math.random() < 0.5 ? 1 : -1) *
                parameters.randomness *
                radius;
          
              const colorInside = new THREE.Color(parameters.insideColor);
              const colorOutside = new THREE.Color(parameters.outsideColor);
          
              const mixedColor = colorInside.clone();
              mixedColor.lerp(colorOutside, radius / parameters.radius);
          
              positionsAureola[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
              positionsAureola[i3 + 1] = randomY;
              positionsAureola[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
          
              colorsAureola[i3] = mixedColor.r;
              colorsAureola[i3 + 1] = mixedColor.g;
              colorsAureola[i3 + 2] = mixedColor.b;
            }
          
            geometryAureolaStars.setAttribute('position', new THREE.BufferAttribute(positionsAureola, 3));
            geometryAureolaStars.setAttribute('color', new THREE.BufferAttribute(colorsAureola, 3));
          
            materialAureola = new THREE.PointsMaterial({
              size: parameters.size,
              sizeAttenuation: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
              vertexColors: true,
            });
          
            pointsAureola = new THREE.Points(geometryAureolaStars, materialAureola);
            pointsAureola.position.set(0, 2, -10);
            pointsAureola.rotation.z = -.5;
            scene.add(pointsAureola);
          }
          
          // Llamamos la función para crear la aureola
          createAureola();

        

            const button1 = document.querySelector(".link_button1")
            const button2 = document.querySelector(".link_button2")
            const button3 = document.querySelector(".link_button3")


            const movement = () => {

                button1.addEventListener("click", () => {
                    gsap.to(camera.position, {
                        z: -30 ,
                        duration:6 
                    })
                    gsap.to(camera.rotation, {
                        y: 3 ,
                        duration: 6
                    })
                })

                button2.addEventListener("click", () => {
                    gsap.to(camera.position, {
                        z: 12 ,
                        duration: 6
                    })
                    gsap.to(camera.rotation, {
                        y: 0 ,
                        duration: 6
                    })


                })

                button3.addEventListener("click", () => {
                    gsap.to(camera.position, {
                        z: -1 ,
                        duration: 2  
                    })
                    gsap.to(camera.rotation, {
                        y: 0 ,
                        duration: 2  
                    })
                })
              

            }

            movement()

         
        const animate = () =>{

            particles.rotation.y -= 0.001
            pointsAureola.rotation.y -= 0.005

            renderer.render(scene,camera)
            window.requestAnimationFrame(animate)
            renderer.autoClear = true
        }
        
        animate()
        
        renderer.render(scene,camera)
        
}

export default sceneSpace;