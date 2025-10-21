import { type UniffiByteArray, type UniffiRustArcPtr, type UnsafeMutableRawPointer, FfiConverterObject, FfiConverterObjectWithCallbacks, RustBuffer, UniffiAbstractObject, destructorGuardSymbol, pointerLiteralSymbol, uniffiTypeNameSymbol } from 'uniffi-bindgen-react-native';
export declare function safeAdditionOperator(): BinaryOperator;
export declare function safeDivisionOperator(): BinaryOperator;
export type ComputationResult = {
    value: bigint;
};
/**
 * Generated factory for {@link ComputationResult} record objects.
 */
export declare const ComputationResult: Readonly<{
    /**
     * Create a frozen instance of {@link ComputationResult}, with defaults specified
     * in Rust, in the {@link foobar} crate.
     */
    create: (partial: Partial<ComputationResult> & Required<Omit<ComputationResult, never>>) => ComputationResult;
    /**
     * Create a frozen instance of {@link ComputationResult}, with defaults specified
     * in Rust, in the {@link foobar} crate.
     */
    new: (partial: Partial<ComputationResult> & Required<Omit<ComputationResult, never>>) => ComputationResult;
    /**
     * Defaults specified in the {@link foobar} crate.
     */
    defaults: () => Partial<ComputationResult>;
}>;
export declare enum ComputationError_Tags {
    DivisionByZero = "DivisionByZero",
    Overflow = "Overflow",
    IllegalComputationWithInitState = "IllegalComputationWithInitState"
}
export declare const ComputationError: Readonly<{
    instanceOf: (obj: any) => obj is ComputationError;
    DivisionByZero: {
        new (): {
            readonly tag: ComputationError_Tags.DivisionByZero;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(): {
            readonly tag: ComputationError_Tags.DivisionByZero;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: ComputationError_Tags.DivisionByZero;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: ComputationError_Tags.DivisionByZero;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    Overflow: {
        new (): {
            readonly tag: ComputationError_Tags.Overflow;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(): {
            readonly tag: ComputationError_Tags.Overflow;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: ComputationError_Tags.Overflow;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: ComputationError_Tags.Overflow;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
    IllegalComputationWithInitState: {
        new (): {
            readonly tag: ComputationError_Tags.IllegalComputationWithInitState;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        "new"(): {
            readonly tag: ComputationError_Tags.IllegalComputationWithInitState;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        instanceOf(obj: any): obj is {
            readonly tag: ComputationError_Tags.IllegalComputationWithInitState;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        hasInner(obj: any): obj is {
            readonly tag: ComputationError_Tags.IllegalComputationWithInitState;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationError";
            name: string;
            message: string;
            stack?: string;
            cause?: unknown;
        };
        isError(error: unknown): error is Error;
        captureStackTrace(targetObject: object, constructorOpt?: Function): void;
        prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
        stackTraceLimit: number;
    };
}>;
export type ComputationError = InstanceType<(typeof ComputationError)[keyof Omit<typeof ComputationError, 'instanceOf'>]>;
export declare enum ComputationState_Tags {
    Init = "Init",
    Computed = "Computed"
}
export declare const ComputationState: Readonly<{
    instanceOf: (obj: any) => obj is ComputationState;
    Init: {
        new (): {
            readonly tag: ComputationState_Tags.Init;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
        "new"(): {
            readonly tag: ComputationState_Tags.Init;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
        instanceOf(obj: any): obj is {
            readonly tag: ComputationState_Tags.Init;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
    };
    Computed: {
        new (inner: {
            result: ComputationResult;
        }): {
            readonly tag: ComputationState_Tags.Computed;
            readonly inner: Readonly<{
                result: ComputationResult;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
        "new"(inner: {
            result: ComputationResult;
        }): {
            readonly tag: ComputationState_Tags.Computed;
            readonly inner: Readonly<{
                result: ComputationResult;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
        instanceOf(obj: any): obj is {
            readonly tag: ComputationState_Tags.Computed;
            readonly inner: Readonly<{
                result: ComputationResult;
            }>;
            /**
             * @private
             * This field is private and should not be used, use `tag` instead.
             */
            readonly [uniffiTypeNameSymbol]: "ComputationState";
        };
    };
}>;
export type ComputationState = InstanceType<(typeof ComputationState)[keyof Omit<typeof ComputationState, 'instanceOf'>]>;
/**
 * A binary operator that performs some mathematical operation with two numbers.
 */
export interface BinaryOperator {
    perform(lhs: bigint, rhs: bigint): bigint;
}
/**
 * A binary operator that performs some mathematical operation with two numbers.
 */
export declare class BinaryOperatorImpl extends UniffiAbstractObject implements BinaryOperator {
    readonly [uniffiTypeNameSymbol] = "BinaryOperatorImpl";
    readonly [destructorGuardSymbol]: UniffiRustArcPtr;
    readonly [pointerLiteralSymbol]: UnsafeMutableRawPointer;
    private constructor();
    perform(lhs: bigint, rhs: bigint): bigint;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is BinaryOperatorImpl;
}
/**
 * A somewhat silly demonstration of functional core/imperative shell in the form of a calculator with arbitrary operators.
 *
 * Operations return a new calculator with updated internal state reflecting the computation.
 */
export interface CalculatorInterface {
    /**
     * Performs a calculation using the supplied binary operator and operands.
     */
    calculate(op: BinaryOperator, lhs: bigint, rhs: bigint): CalculatorInterface;
    /**
     * Performs a calculation using the supplied binary operator, the last computation result, and the supplied operand.
     *
     * The supplied operand will be the right-hand side in the mathematical operation.
     */
    calculateMore(op: BinaryOperator, rhs: bigint): CalculatorInterface;
    lastResult(): ComputationResult | undefined;
}
/**
 * A somewhat silly demonstration of functional core/imperative shell in the form of a calculator with arbitrary operators.
 *
 * Operations return a new calculator with updated internal state reflecting the computation.
 */
export declare class Calculator extends UniffiAbstractObject implements CalculatorInterface {
    readonly [uniffiTypeNameSymbol] = "Calculator";
    readonly [destructorGuardSymbol]: UniffiRustArcPtr;
    readonly [pointerLiteralSymbol]: UnsafeMutableRawPointer;
    constructor();
    /**
     * Performs a calculation using the supplied binary operator and operands.
     */
    calculate(op: BinaryOperator, lhs: bigint, rhs: bigint): CalculatorInterface;
    /**
     * Performs a calculation using the supplied binary operator, the last computation result, and the supplied operand.
     *
     * The supplied operand will be the right-hand side in the mathematical operation.
     */
    calculateMore(op: BinaryOperator, rhs: bigint): CalculatorInterface;
    lastResult(): ComputationResult | undefined;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is Calculator;
}
export interface SafeAdditionInterface {
    perform(lhs: bigint, rhs: bigint): bigint;
}
export declare class SafeAddition extends UniffiAbstractObject implements SafeAdditionInterface {
    readonly [uniffiTypeNameSymbol] = "SafeAddition";
    readonly [destructorGuardSymbol]: UniffiRustArcPtr;
    readonly [pointerLiteralSymbol]: UnsafeMutableRawPointer;
    constructor();
    perform(lhs: bigint, rhs: bigint): bigint;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is SafeAddition;
}
export interface SafeDivisionInterface {
    perform(lhs: bigint, rhs: bigint): bigint;
}
export declare class SafeDivision extends UniffiAbstractObject implements SafeDivisionInterface {
    readonly [uniffiTypeNameSymbol] = "SafeDivision";
    readonly [destructorGuardSymbol]: UniffiRustArcPtr;
    readonly [pointerLiteralSymbol]: UnsafeMutableRawPointer;
    constructor();
    perform(lhs: bigint, rhs: bigint): bigint;
    /**
     * {@inheritDoc uniffi-bindgen-react-native#UniffiAbstractObject.uniffiDestroy}
     */
    uniffiDestroy(): void;
    static instanceOf(obj: any): obj is SafeDivision;
}
/**
 * This should be called before anything else.
 *
 * It is likely that this is being done for you by the library's `index.ts`.
 *
 * It checks versions of uniffi between when the Rust scaffolding was generated
 * and when the bindings were generated.
 *
 * It also initializes the machinery to enable Rust to talk back to Javascript.
 */
declare function uniffiEnsureInitialized(): void;
declare const _default: Readonly<{
    initialize: typeof uniffiEnsureInitialized;
    converters: {
        FfiConverterTypeBinaryOperator: FfiConverterObjectWithCallbacks<BinaryOperator>;
        FfiConverterTypeCalculator: FfiConverterObject<CalculatorInterface>;
        FfiConverterTypeComputationError: {
            read(from: RustBuffer): ComputationError;
            write(value: ComputationError, into: RustBuffer): void;
            allocationSize(value: ComputationError): number;
            lift(value: UniffiByteArray): ComputationError;
            lower(value: ComputationError): UniffiByteArray;
        };
        FfiConverterTypeComputationResult: {
            read(from: RustBuffer): ComputationResult;
            write(value: ComputationResult, into: RustBuffer): void;
            allocationSize(value: ComputationResult): number;
            lift(value: UniffiByteArray): ComputationResult;
            lower(value: ComputationResult): UniffiByteArray;
        };
        FfiConverterTypeComputationState: {
            read(from: RustBuffer): ComputationState;
            write(value: ComputationState, into: RustBuffer): void;
            allocationSize(value: ComputationState): number;
            lift(value: UniffiByteArray): ComputationState;
            lower(value: ComputationState): UniffiByteArray;
        };
        FfiConverterTypeSafeAddition: FfiConverterObject<SafeAdditionInterface>;
        FfiConverterTypeSafeDivision: FfiConverterObject<SafeDivisionInterface>;
    };
}>;
export default _default;
//# sourceMappingURL=foobar.d.ts.map