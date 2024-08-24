import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Mopro.web.ts
// and on native platforms to Mopro.ts
import MoproModule from './src/MoproModule';
import MoproView from './src/MoproView';
import { ChangeEventPayload, MoproViewProps } from './src/Mopro.types';

// Define the G1 type
export type G1 = {
  x: string;
  y: string;
}

// Define the G2 type
export type G2 = {
  x: string[];
  y: string[];
}

// Define the ProofCalldata type
export type ProofCalldata = {
  a: G1;
  b: G2;
  c: G1;
}
// Define the Result type
export type Result = {
  proof: ProofCalldata;
  inputs: string[];
}

// Get the native constant value.
export const PI = MoproModule.PI;

export function hello(): string {
  return MoproModule.hello();
}

export function generateCircomProof(zkeyPath: string, circuitInputs: { [key: string]: string[] }): Result {
  return MoproModule.generateCircomProof(zkeyPath, circuitInputs);
}

export async function setValueAsync(value: string) {
  return await MoproModule.setValueAsync(value);
}

const emitter = new EventEmitter(MoproModule ?? NativeModulesProxy.Mopro);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { MoproView, MoproViewProps, ChangeEventPayload };
