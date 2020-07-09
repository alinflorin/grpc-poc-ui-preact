import * as jspb from "google-protobuf"

export class GetWeatherRequest extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): GetWeatherRequest;

  getUsemetric(): boolean;
  setUsemetric(value: boolean): GetWeatherRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetWeatherRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetWeatherRequest): GetWeatherRequest.AsObject;
  static serializeBinaryToWriter(message: GetWeatherRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetWeatherRequest;
  static deserializeBinaryFromReader(message: GetWeatherRequest, reader: jspb.BinaryReader): GetWeatherRequest;
}

export namespace GetWeatherRequest {
  export type AsObject = {
    address: string,
    usemetric: boolean,
  }
}

export class GetWeatherReply extends jspb.Message {
  getCurrenttemp(): number;
  setCurrenttemp(value: number): GetWeatherReply;

  getCurrentwindspeed(): number;
  setCurrentwindspeed(value: number): GetWeatherReply;

  getSummary(): string;
  setSummary(value: string): GetWeatherReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetWeatherReply.AsObject;
  static toObject(includeInstance: boolean, msg: GetWeatherReply): GetWeatherReply.AsObject;
  static serializeBinaryToWriter(message: GetWeatherReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetWeatherReply;
  static deserializeBinaryFromReader(message: GetWeatherReply, reader: jspb.BinaryReader): GetWeatherReply;
}

export namespace GetWeatherReply {
  export type AsObject = {
    currenttemp: number,
    currentwindspeed: number,
    summary: string,
  }
}

