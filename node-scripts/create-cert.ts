import 'zx/globals'
import { getLocalIp } from '../server/utils/getIp'
;(async () => {

  await $`mkcert create-ca`
  await $`npx mkcert create-cert 127.0.0.1,localhost,https://${getLocalIp()[0]}:2333`

})()

