import * as jspb from "google-protobuf"

export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LoginReply extends jspb.Message {
  getUser(): User | undefined;
  setUser(value?: User): LoginReply;
  hasUser(): boolean;
  clearUser(): LoginReply;

  getErrorsList(): Array<string>;
  setErrorsList(value: Array<string>): LoginReply;
  clearErrorsList(): LoginReply;
  addErrors(value: string, index?: number): LoginReply;

  getSuccesful(): boolean;
  setSuccesful(value: boolean): LoginReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginReply.AsObject;
  static toObject(includeInstance: boolean, msg: LoginReply): LoginReply.AsObject;
  static serializeBinaryToWriter(message: LoginReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginReply;
  static deserializeBinaryFromReader(message: LoginReply, reader: jspb.BinaryReader): LoginReply;
}

export namespace LoginReply {
  export type AsObject = {
    user?: User.AsObject,
    errorsList: Array<string>,
    succesful: boolean,
  }
}

export class User extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): User;

  getFullname(): string;
  setFullname(value: string): User;

  getIsadmin(): boolean;
  setIsadmin(value: boolean): User;

  getEmail(): string;
  setEmail(value: string): User;

  getAvatarurl(): string;
  setAvatarurl(value: string): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    username: string,
    fullname: string,
    isadmin: boolean,
    email: string,
    avatarurl: string,
  }
}

