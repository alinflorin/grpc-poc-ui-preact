/**
 * @fileoverview gRPC-Web generated client stub for auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import {
  LoginReply,
  LoginRequest,
  Notification,
  SubscribeToNotificationsRequest} from './auth_pb';

export class AuthClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    LoginReply,
    (request: LoginRequest) => {
      return request.serializeBinary();
    },
    LoginReply.deserializeBinary
  );

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<LoginReply>;

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: LoginReply) => void): grpcWeb.ClientReadableStream<LoginReply>;

  login(
    request: LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: LoginReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoSubscribeToNotifications = new grpcWeb.AbstractClientBase.MethodInfo(
    Notification,
    (request: SubscribeToNotificationsRequest) => {
      return request.serializeBinary();
    },
    Notification.deserializeBinary
  );

  subscribeToNotifications(
    request: SubscribeToNotificationsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/auth.Auth/SubscribeToNotifications',
      request,
      metadata || {},
      this.methodInfoSubscribeToNotifications);
  }

}

