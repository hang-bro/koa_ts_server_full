<template>
  <main class="w-full h-full">
    <div class="w-full h-full" :style="style" ref="mount"></div>
  </main>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { Color } from 'three'

import { Box, Container, MemoryColorScheme, Point, RandomColorScheme, StackPlacement, StackableRenderer } from './api'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { http } from '@/http'

const style = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
})

const mount = ref()

const state = {
  renderer: null as any,
  scene: null as any,
  frameId: null as any,
}

//Textures.
const ANGULAR_VELOCITY = 0.01

const GRID_SPACING = 10

var camera
var orbit // light orbit
var helvatiker
var mainGroup
var shouldAnimate
var controls
var delta = 0
var visibleContainers

const pointer = new THREE.Vector2()
var raycaster
var INTERSECTED
var stepNumber = -1

var maxStepNumber = 0
var minStepNumber = 0

var points = false

var stackableRenderer = new StackableRenderer()
var memoryScheme = new MemoryColorScheme(new RandomColorScheme())

var gridXZ

/**
 * Boilder plate to add LIGHTS, Renderer, Axis, Grid,
 */

const addScene = () => {
  console.log(`mount.value ==>`, mount.value)
  const width = mount.value.clientWidth
  const height = mount.value.clientHeight
  state.scene = new THREE.Scene()

  // ------- Add RENDERED ------
  state.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
  state.renderer.setClearColor('#263238')
  state.renderer.setSize(width, height)
  mount.value.appendChild(state.renderer.domElement)

  // -------Add CAMERA ------
  camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 100000)
  camera.position.z = -50
  camera.position.y = 50
  camera.position.x = -50
  //    camera.lookAt(new THREE.Vector3(19000, 0, 0));

  //------Add ORBIT CONTROLS--------
  controls = new OrbitControls(camera, state.renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = true
  controls.autoRotate = false
  controls.keys = {
    LEFT: 37, //left arrow
    UP: 38, // up arrow
    RIGHT: 39, // right arrow
    BOTTOM: 40, // down arrow
  }

  controls.addEventListener('change', () => {
    if (state.renderer) state.renderer.render(state.scene, camera)
  })

  raycaster = new THREE.Raycaster()

  var ambientLight = new THREE.AmbientLight(0xffffff, 0.6)

  state.scene.add(toRaw(ambientLight))
}

const addModels = () => {
  // parent group to hold models
  mainGroup = new THREE.Object3D()
  state.scene.add(toRaw(mainGroup))

  var latestData = null as any

  var load = function (packaging) {
    var data = JSON.stringify(packaging)
    if (latestData != null && data == latestData) {
      return
    }
    console.log('Update model')

    latestData = data

    for (var i = 0; i < visibleContainers.length; i++) {
      mainGroup.remove(visibleContainers[i])
    }

    var x = 0

    var minStep = -1
    var maxStep = -1

    var maxX = 0
    var maxY = 0
    var maxZ = 0

    for (var i = 0; i < packaging.containers.length; i++) {
      var containerJson = packaging.containers[i]

      var container = new Container(
        containerJson.name,
        containerJson.id,
        containerJson.step,
        containerJson.dx,
        containerJson.dy,
        containerJson.dz,
        containerJson.loadDx,
        containerJson.loadDy,
        containerJson.loadDz,
      )

      if (container.step < minStep || minStep == -1) {
        minStep = container.step
      }

      if (container.step > maxStep || maxStep == -1) {
        maxStep = container.step
      }

      for (var j = 0; j < containerJson.stack.placements.length; j++) {
        var placement = containerJson.stack.placements[j]
        var stackable = placement.stackable

        if (stackable.step < minStep || minStep == -1) {
          minStep = stackable.step
        }

        if (stackable.step > maxStep || maxStep == -1) {
          maxStep = stackable.step
        }

        var points = new Array()

        for (var l = 0; l < placement.points.length; l++) {
          var point = placement.points[l]

          points.push(new Point(point.x, point.y, point.z, point.dx, point.dy, point.dz))
        }

        if (stackable.type == 'box') {
          var box = new Box(stackable.name, stackable.id, stackable.step, stackable.dx, stackable.dy, stackable.dz)

          container.add(new StackPlacement(box, placement.step, placement.x, placement.y, placement.z, points))
        } else {
          // TODO
        }
      }

      maxStepNumber = maxStep + 1
      minStepNumber = minStep

      stepNumber = maxStepNumber

      // TODO return controls instead

      var visibleContainer = stackableRenderer.add(
        mainGroup,
        memoryScheme,
        new StackPlacement(container, 0, x, 0, 0),
        0,
        0,
        0,
      )

      visibleContainers.push(visibleContainer)

      if (x + container.dx > maxX) {
        maxX = x + container.dx
      }
      if (container.dy > maxY) {
        maxY = container.dy
      }
      if (container.dz > maxZ) {
        maxZ = container.dz
      }

      x += container.dx + GRID_SPACING
      x = x - (x % GRID_SPACING)
    }

    camera.position.z = maxY * 2
    camera.position.y = maxZ * 1.25
    camera.position.x = maxX * 2

    // Add grid corresponding to containers
    var size = Math.max(maxY, maxX) + GRID_SPACING + GRID_SPACING
    let gridXZ = new THREE.GridHelper(
      size,
      size / GRID_SPACING,
      0x42a5f5, // center line color
      0x42a5f5, // grid color,
    ) as any
    state.scene.add(toRaw(gridXZ))
    gridXZ.position.y = 0
    gridXZ.position.x = size / 2 - GRID_SPACING
    gridXZ.position.z = size / 2 - GRID_SPACING
  }

  http.get('/assets/containers.json').then(load)

  // setInterval(function () {
  //   http.get('/assets/containers.json').then(load)
  // }, 5000)
}
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  state.renderer.setSize(window.innerWidth, window.innerHeight)
}

const onDocumentMouseMove = (event) => {
  event.preventDefault()

  if (event && typeof event !== undefined) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }
}

const onDocumentKeyDown = (event) => {
  shouldAnimate = false
  var keyCode = event.which
  switch (keyCode) {
    case 87: {
      // shaderMesh1.rotation.x += ROTATION_ANGLE; //W
      mainGroup.rotation.y += 0.1
      break
    }
    case 83: {
      // shaderMesh1.rotation.x -= ROTATION_ANGLE; //S
      mainGroup.rotation.y -= 0.1
      break
    }
    case 65: {
      stepNumber++
      if (stepNumber > maxStepNumber) {
        stepNumber = 0
      }

      handleStepNumber()

      break
    }
    case 68: {
      stepNumber--
      if (stepNumber < minStepNumber) {
        stepNumber = maxStepNumber
      }
      handleStepNumber()

      break
    }
    case 80: {
      points = !points
      if (points) {
        console.log('Show points')
      } else {
        console.log('Hide points')
      }

      handleStepNumber()
      renderScene()

      break
    }
    default: {
      break
    }
  }
}
const onDocumentKeyUp = (event) => {
  var keyCode = event.which
  shouldAnimate = true
  console.log('onKey Up ' + keyCode)
}

const renderScene = () => {
  if (state.renderer) {
    state.renderer.render(state.scene, camera)
  }
}

const start = () => {
  if (!state.frameId) {
    state.frameId = requestAnimationFrame(animate)
  }
}
const stop = () => {
  cancelAnimationFrame(state.frameId)
}

const handleIntersection = () => {
  raycaster.setFromCamera(pointer, camera)

  var target = null
  for (var i = 0; i < visibleContainers.length; i++) {
    for (var k = 0; k < visibleContainers[i].children.length; k++) {
      var intersects = raycaster.intersectObjects(visibleContainers[i].children[k].children)
      if (intersects.length > 0) {
        target = intersects[0].object
      }
    }
  }

  if (target) {
    if (INTERSECTED != target) {
      if (INTERSECTED) {
        INTERSECTED.material.emissive = new Color('#000000')
      }
      INTERSECTED = target
      INTERSECTED.myColor = INTERSECTED.material.color
      INTERSECTED.material.emissive = new Color('#FF0000')
    }
  } else {
    if (INTERSECTED) {
      INTERSECTED.material.emissive = new Color('#000000')
      INTERSECTED = null
    }
  }
}

const handleStepNumber = () => {
  console.log('Show step number ' + stepNumber)

  for (var i = 0; i < visibleContainers.length; i++) {
    var visibleContainer = visibleContainers[i]

    var visibleContainerUserData = visibleContainer.userData
    visibleContainer.visible = visibleContainerUserData.step < stepNumber

    // adding alle the points is too expensive
    // so add for a single step at a time
    stackableRenderer.removePoints(visibleContainer)
    if (points) {
      stackableRenderer.addPoints(visibleContainer, memoryScheme, stepNumber)
    }

    for (var k = 0; k < visibleContainers[i].children.length; k++) {
      var container = visibleContainers[i].children[k]
      var containerUserData = container.userData

      container.visible = containerUserData.step < stepNumber

      var stackables = container.children
      for (var j = 0; j < stackables.length; j++) {
        var stackable = stackables[j]
        var userData = stackables[j].userData

        if (userData.type == 'box') {
          stackable.visible = userData.step < stepNumber
        }
      }
    }
  }
}

const animate = () => {
  //update Orbit Of Camera
  controls.update()

  //Animate rotation of light
  if (orbit) orbit.rotation.z += ANGULAR_VELOCITY

  // Update Uniform of shader
  delta += 0.01
  //Direct manipulation
  //shaderMaterial.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.0005;
  //shaderMesh.material.uniforms.u_time.value = delta;

  handleIntersection()

  //Redraw scene
  renderScene()
  state.frameId = window.requestAnimationFrame(animate)
}

onMounted(() => {
  state.useWireFrame = false
  visibleContainers = new Array()
  //Add Light & nCamera
  addScene()
  // // Add Box Mesh with shader as texture
  addModels()

  // Add Events
  window.addEventListener('resize', onWindowResize, false)
  document.addEventListener('keyup', onDocumentKeyUp, false)
  document.addEventListener('keydown', onDocumentKeyDown, false)
  document.addEventListener('mousemove', onDocumentMouseMove, false)

  //--------START ANIMATION-----------
  renderScene()
  start()
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onDocumentMouseMove, false)
  window.removeEventListener('resize', onWindowResize, false)
  document.removeEventListener('keydown', onDocumentKeyDown, false)
  document.removeEventListener('keyup', onDocumentKeyUp, false)
  mount.value?.removeChild(state.renderer.domElement)
})
</script>
<style lang="scss" scoped></style>
