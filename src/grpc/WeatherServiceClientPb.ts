/**
 * @fileoverview gRPC-Web generated client stub for weather
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import {
  GetWeatherReply,
  GetWeatherRequest} from './weather_pb';

export class WeatherClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoGetWeather = new grpcWeb.AbstractClientBase.MethodInfo(
    GetWeatherReply,
    (request: GetWeatherRequest) => {
      return request.serializeBinary();
    },
    GetWeatherReply.deserializeBinary
  );

  getWeather(
    request: GetWeatherRequest,
    metadata: grpcWeb.Metadata | null): Promise<GetWeatherReply>;

  getWeather(
    request: GetWeatherRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: GetWeatherReply) => void): grpcWeb.ClientReadableStream<GetWeatherReply>;

  getWeather(
    request: GetWeatherRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: GetWeatherReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/weather.Weather/GetWeather',
        request,
        metadata || {},
        this.methodInfoGetWeather,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/weather.Weather/GetWeather',
    request,
    metadata || {},
    this.methodInfoGetWeather);
  }

}

