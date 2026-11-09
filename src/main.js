import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xadd8e6)

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(7, 5, 10)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.style.margin = '0'
document.body.appendChild(renderer.domElement)

// Axes helper
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
directionalLight.position.set(5, 10, 5)
scene.add(directionalLight)

// Snowman material
const snowMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff
})

// Bottom snowball
const bottom = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 32, 32),
  snowMaterial
)
bottom.position.y = 1.2
scene.add(bottom)

// Middle snowball
const middle = new THREE.Mesh(
  new THREE.SphereGeometry(0.9, 32, 32),
  snowMaterial
)
middle.position.y = 3
scene.add(middle)

// Head
const head = new THREE.Mesh(
  new THREE.SphereGeometry(0.65, 32, 32),
  snowMaterial
)
head.position.y = 4.4
scene.add(head)

// Black material for eyes and mouth
const blackMaterial = new THREE.MeshStandardMaterial({
  color: 0x111111
})

// Left eye
const leftEye = new THREE.Mesh(
  new THREE.SphereGeometry(0.09, 16, 16),
  blackMaterial
)
leftEye.position.set(-0.23, 4.55, 0.59)
scene.add(leftEye)

// Right eye
const rightEye = new THREE.Mesh(
  new THREE.SphereGeometry(0.09, 16, 16),
  blackMaterial
)
rightEye.position.set(0.23, 4.55, 0.59)
scene.add(rightEye)

// Orange carrot nose
const noseMaterial = new THREE.MeshStandardMaterial({
  color: 0xff7700
})

const nose = new THREE.Mesh(
  new THREE.ConeGeometry(0.13, 0.65, 32),
  noseMaterial
)

nose.rotation.x = Math.PI / 2
nose.position.set(0, 4.35, 0.92)
scene.add(nose)

// Snowman smile
for (let i = 0; i < 5; i++) {
  const mouth = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    blackMaterial
  )

  const x = (i - 2) * 0.13
  const y = 4.12 + 0.035 * Math.pow(i - 2, 2)
  const z = Math.sqrt(0.65 * 0.65 - x * x - (y - 4.4) ** 2) + 0.015

  mouth.position.set(x, y, z)
  scene.add(mouth)
}

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.target.set(0, 2.5, 0)
controls.update()

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Animation
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}

animate()