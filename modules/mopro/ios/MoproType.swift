import ExpoModulesCore

struct ExpoG1: Record {
  @Field
  var x: String?

  @Field
  var y: String?
}

struct ExpoG2: Record {
  @Field
  var x: [String]?

  @Field
  var y: [String]?
}

struct ExpoProof: Record {
  @Field
  var a: ExpoG1?

  @Field
  var b: ExpoG2?

  @Field
  var c: ExpoG1?
}

struct Result: Record {
  @Field
  var inputs: [String]?

  @Field
  var proof: ExpoProof?

}
