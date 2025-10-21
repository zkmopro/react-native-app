import { type UniffiRustCallStatus, type UniffiRustArcPtr, type UniffiResult } from 'uniffi-bindgen-react-native';
interface NativeModuleInterface {
    ubrn_uniffi_internal_fn_func_ffi__string_to_byte_length(string: string, uniffi_out_err: UniffiRustCallStatus): number;
    ubrn_uniffi_internal_fn_func_ffi__string_to_arraybuffer(string: string, uniffi_out_err: UniffiRustCallStatus): Uint8Array;
    ubrn_uniffi_internal_fn_func_ffi__arraybuffer_to_string(buffer: Uint8Array, uniffi_out_err: UniffiRustCallStatus): string;
    ubrn_uniffi_foobar_fn_clone_binaryoperator(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_free_binaryoperator(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): void;
    ubrn_uniffi_foobar_fn_init_callback_vtable_binaryoperator(vtable: UniffiVTableCallbackInterfaceBinaryOperator): void;
    ubrn_uniffi_foobar_fn_method_binaryoperator_perform(ptr: bigint, lhs: bigint, rhs: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_clone_calculator(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_free_calculator(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): void;
    ubrn_uniffi_foobar_fn_constructor_calculator_new(uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_method_calculator_calculate(ptr: bigint, op: bigint, lhs: bigint, rhs: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_method_calculator_calculate_more(ptr: bigint, op: bigint, rhs: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_method_calculator_last_result(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): Uint8Array;
    ubrn_uniffi_foobar_fn_clone_safeaddition(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_free_safeaddition(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): void;
    ubrn_uniffi_foobar_fn_constructor_safeaddition_new(uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_method_safeaddition_perform(ptr: bigint, lhs: bigint, rhs: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_clone_safedivision(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_free_safedivision(ptr: bigint, uniffi_out_err: UniffiRustCallStatus): void;
    ubrn_uniffi_foobar_fn_constructor_safedivision_new(uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_method_safedivision_perform(ptr: bigint, lhs: bigint, rhs: bigint, uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_func_safe_addition_operator(uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_fn_func_safe_division_operator(uniffi_out_err: UniffiRustCallStatus): bigint;
    ubrn_uniffi_foobar_checksum_func_safe_addition_operator(): number;
    ubrn_uniffi_foobar_checksum_func_safe_division_operator(): number;
    ubrn_uniffi_foobar_checksum_method_binaryoperator_perform(): number;
    ubrn_uniffi_foobar_checksum_method_calculator_calculate(): number;
    ubrn_uniffi_foobar_checksum_method_calculator_calculate_more(): number;
    ubrn_uniffi_foobar_checksum_method_calculator_last_result(): number;
    ubrn_uniffi_foobar_checksum_method_safeaddition_perform(): number;
    ubrn_uniffi_foobar_checksum_method_safedivision_perform(): number;
    ubrn_uniffi_foobar_checksum_constructor_calculator_new(): number;
    ubrn_uniffi_foobar_checksum_constructor_safeaddition_new(): number;
    ubrn_uniffi_foobar_checksum_constructor_safedivision_new(): number;
    ubrn_ffi_foobar_uniffi_contract_version(): number;
    ubrn_uniffi_internal_fn_method_binaryoperator_ffi__bless_pointer(pointer: bigint, uniffi_out_err: UniffiRustCallStatus): UniffiRustArcPtr;
    ubrn_uniffi_internal_fn_method_calculator_ffi__bless_pointer(pointer: bigint, uniffi_out_err: UniffiRustCallStatus): UniffiRustArcPtr;
    ubrn_uniffi_internal_fn_method_safeaddition_ffi__bless_pointer(pointer: bigint, uniffi_out_err: UniffiRustCallStatus): UniffiRustArcPtr;
    ubrn_uniffi_internal_fn_method_safedivision_ffi__bless_pointer(pointer: bigint, uniffi_out_err: UniffiRustCallStatus): UniffiRustArcPtr;
}
declare const getter: () => NativeModuleInterface;
export default getter;
export type UniffiRustFutureContinuationCallback = (data: bigint, pollResult: number) => void;
type UniffiForeignFutureFree = (handle: bigint) => void;
type UniffiCallbackInterfaceFree = (handle: bigint) => void;
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
type UniffiCallbackInterfaceBinaryOperatorMethod0 = (uniffiHandle: bigint, lhs: bigint, rhs: bigint) => UniffiResult<bigint>;
export type UniffiVTableCallbackInterfaceBinaryOperator = {
    perform: UniffiCallbackInterfaceBinaryOperatorMethod0;
    uniffiFree: UniffiCallbackInterfaceFree;
};
//# sourceMappingURL=foobar-ffi.d.ts.map