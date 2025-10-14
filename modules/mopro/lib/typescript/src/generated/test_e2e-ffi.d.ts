import { type UniffiRustCallStatus } from 'uniffi-bindgen-react-native';
interface NativeModuleInterface {
    ubrn_uniffi_internal_fn_func_ffi__string_to_byte_length(string: string, uniffi_out_err: UniffiRustCallStatus): number;
    ubrn_uniffi_internal_fn_func_ffi__string_to_arraybuffer(string: string, uniffi_out_err: UniffiRustCallStatus): Uint8Array;
    ubrn_uniffi_internal_fn_func_ffi__arraybuffer_to_string(buffer: Uint8Array, uniffi_out_err: UniffiRustCallStatus): string;
    ubrn_uniffi_test_e2e_fn_func_greet(name: Uint8Array, uniffi_out_err: UniffiRustCallStatus): Uint8Array;
    ubrn_uniffi_test_e2e_fn_func_hello_uniffi(uniffi_out_err: UniffiRustCallStatus): Uint8Array;
    ubrn_uniffi_test_e2e_checksum_func_greet(): number;
    ubrn_uniffi_test_e2e_checksum_func_hello_uniffi(): number;
    ubrn_ffi_test_e2e_uniffi_contract_version(): number;
}
declare const getter: () => NativeModuleInterface;
export default getter;
export type UniffiRustFutureContinuationCallback = (data: bigint, pollResult: number) => void;
type UniffiForeignFutureFree = (handle: bigint) => void;
export type UniffiForeignFuture = {
    handle: bigint;
    free: UniffiForeignFutureFree;
};
export type UniffiForeignFutureStructU8 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU8 = (callbackData: bigint, result: UniffiForeignFutureStructU8) => void;
export type UniffiForeignFutureStructI8 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI8 = (callbackData: bigint, result: UniffiForeignFutureStructI8) => void;
export type UniffiForeignFutureStructU16 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU16 = (callbackData: bigint, result: UniffiForeignFutureStructU16) => void;
export type UniffiForeignFutureStructI16 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI16 = (callbackData: bigint, result: UniffiForeignFutureStructI16) => void;
export type UniffiForeignFutureStructU32 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU32 = (callbackData: bigint, result: UniffiForeignFutureStructU32) => void;
export type UniffiForeignFutureStructI32 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI32 = (callbackData: bigint, result: UniffiForeignFutureStructI32) => void;
export type UniffiForeignFutureStructU64 = {
    returnValue: bigint;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteU64 = (callbackData: bigint, result: UniffiForeignFutureStructU64) => void;
export type UniffiForeignFutureStructI64 = {
    returnValue: bigint;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteI64 = (callbackData: bigint, result: UniffiForeignFutureStructI64) => void;
export type UniffiForeignFutureStructF32 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteF32 = (callbackData: bigint, result: UniffiForeignFutureStructF32) => void;
export type UniffiForeignFutureStructF64 = {
    returnValue: number;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteF64 = (callbackData: bigint, result: UniffiForeignFutureStructF64) => void;
export type UniffiForeignFutureStructPointer = {
    returnValue: bigint;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompletePointer = (callbackData: bigint, result: UniffiForeignFutureStructPointer) => void;
export type UniffiForeignFutureStructRustBuffer = {
    returnValue: Uint8Array;
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteRustBuffer = (callbackData: bigint, result: UniffiForeignFutureStructRustBuffer) => void;
export type UniffiForeignFutureStructVoid = {
    callStatus: UniffiRustCallStatus;
};
export type UniffiForeignFutureCompleteVoid = (callbackData: bigint, result: UniffiForeignFutureStructVoid) => void;
//# sourceMappingURL=test_e2e-ffi.d.ts.map