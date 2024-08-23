package expo.modules.mopro

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class ExpoG1 : Record {
    @Field var x: String?

    @Field var y: String?

    constructor(_x: String, _y: String) {
        x = _x
        y = _y
    }
}

class ExpoG2 : Record {
    @Field var x: List<String>?

    @Field var y: List<String>?

    constructor(_x: List<String>, _y: List<String>) {
        x = _x
        y = _y
    }
}

class ExpoProof : Record {
    @Field var a: ExpoG1?

    @Field var b: ExpoG2?

    @Field var c: ExpoG1?

    constructor(_a: ExpoG1, _b: ExpoG2, _c: ExpoG1) {
        a = _a
        b = _b
        c = _c
    }
}

class Result : Record {
    @Field var proof: ExpoProof?

    @Field var inputs: List<String>?

    constructor(_proof: ExpoProof, _inputs: List<String>) {
        proof = _proof
        inputs = _inputs
    }
}
