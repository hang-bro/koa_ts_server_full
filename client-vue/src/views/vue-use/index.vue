<script setup lang="ts">
import { useBluetooth } from '@vueuse/core'

const { isSupported, isConnected, device, requestDevice, server } = useBluetooth({
  acceptAllDevices: true,
})
const req=()=>{
 requestDevice()
 .then(res=>{
  alert(res)
 })
}
</script>

<template>
  <main>
      <button @click="req">Request Bluetooth Device</button>
  </main>
</template>
