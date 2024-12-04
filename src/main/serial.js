import { SerialPort } from "serialport";
import {
  MavLinkPacketSplitter,
  minimal,
  common,
  ardupilotmega,
  MavLinkPacketParser,
  MavLinkProtocolV2,
} from "node-mavlink";

export class MavLinkSerialConnection {
  constructor() {
    this.port = null;
    this.REGISTRY = {
      ...minimal.REGISTRY,
      ...common.REGISTRY,
      ...ardupilotmega.REGISTRY,
    };
  }

  async listSerialPorts() {
    try {
      const ports = await SerialPort.list();
      return ports;
    } catch (err) {
      throw err;
    }
  }

  connectPort(portName, baudRate = 115200) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({ path: portName, baudRate: baudRate });

      this.port.on("open", () => {
        resolve(true);
      });

      this.port.on("error", (err) => {
        reject(false);
      });
    });
  }

  disconnectPort() {
    return new Promise((resolve, reject) => {
      if (this.port && this.port.isOpen) {
        this.port.close((err) => {
          if (err) {
            reject(err);
          } else {
            this.port = null;
            resolve(true);
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  isPortOpen() {
    return this.port && this.port.isOpen;
  }

  parseMavLinkData(sender) {
    if (!this.port) {
      return;
    }

    this.reader = this.port
      .pipe(new MavLinkPacketSplitter())
      .pipe(new MavLinkPacketParser());

    this.reader.on("data", (packet) => {
      const clazz = this.REGISTRY[packet.header.msgid];
      if (clazz) {
        const data = packet.protocol.data(packet.payload, clazz);
        data.className = clazz.name;
        sender(data);
      } else {
        console.log(
          `Received packet with unknown msgid: ${packet.header.msgid}`
        );
      }
    });
    this.reader.on("error", (err) => {});
  }
}
