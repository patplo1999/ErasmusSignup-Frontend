/* eslint-disable @typescript-eslint/no-explicit-any */
import { Buffer } from "buffer";

const decodeJwt = (token: string): any => {
  const base64Payload = token.split(".")[1];
  const payloadBuffer = Buffer.from(base64Payload, "base64");
  return JSON.parse(payloadBuffer.toString());
};

export default decodeJwt;
