import { IncomingMessage } from 'http';
import ws from 'nodejs-websocket';
class wsService {
  public ws: ws.Server<typeof ws, typeof IncomingMessage>
  constructor(socket: ws.Server<typeof ws, typeof IncomingMessage>) {
    this.ws = socket
    this.ws
  }

  public getInfo() {
    return this.ws
  }

}
export default wsService
