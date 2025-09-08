import ExpoModulesCore

func convertCircomProof(proof: CircomProof) -> ExpoProof {
  let a = ExpoG1()
  a.x = proof.a.x
  a.y = proof.a.y
  a.z = proof.a.z

  let b = ExpoG2()
  b.x = proof.b.x
  b.y = proof.b.y
  b.z = proof.b.z

  let c = ExpoG1()
  c.x = proof.c.x
  c.y = proof.c.y
  c.z = proof.c.z

  let expoProof = ExpoProof()
  expoProof.a = a
  expoProof.b = b
  expoProof.c = c
  expoProof.protocol = proof.protocol
  expoProof.curve = proof.curve
  return expoProof
}

func convertCircomProofResult(proofResult: ExpoCircomProofResult) -> CircomProofResult {
  guard let proof = proofResult.proof,
    let a = proof.a,
    let b = proof.b,
    let c = proof.c,
    let inputs = proofResult.inputs,
    let `protocol` = proof.protocol,
    let curve = proof.curve
  else {
    fatalError("Invalid proof result")
  }

  let g1a = G1(x: a.x ?? "0", y: a.y ?? "0", z: a.z ?? "1")
  let g2b = G2(x: b.x ?? ["1", "0"], y: b.y ?? ["1", "0"], z: b.z ?? ["1", "0"])
  let g1c = G1(x: c.x ?? "0", y: c.y ?? "0", z: c.z ?? "1")

  let circomProof = CircomProof(
    a: g1a, b: g2b, c: g1c, protocol: `protocol`, curve: curve)
  let circomProofResult = CircomProofResult(proof: circomProof, inputs: inputs)
  return circomProofResult
}

enum CircomError: Error {
  case circomProofGenerationFailed(String)
  case circomProofVerificationFailed(String)
}

enum Halo2Error: Error {
  case halo2ProofGenerationFailed(String)
  case halo2ProofVerificationFailed(String)
}

enum NoirError: Error {
  case noirProofGenerationFailed(String)
  case noirProofVerificationFailed(String)
}

public class MoproModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('Mopro')` in JavaScript.
    Name("Mopro")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    AsyncFunction("generateCircomProof") {
      (zkeyPath: String, circuitInputs: String, expoProofLib: ExpoCircomProofLib) -> ExpoCircomProofResult in

      do {
        let proofLib = expoProofLib.proofLib == ProofLibOption.arkworks ? ProofLib.arkworks : ProofLib.rapidsnark
        let res = try generateCircomProof(
          zkeyPath: zkeyPath, circuitInputs: circuitInputs, proofLib: proofLib)
        let result = ExpoCircomProofResult()
        result.inputs = res.inputs
        result.proof = convertCircomProof(proof: res.proof)
        return result
      } catch {
        throw CircomError.circomProofGenerationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("verifyCircomProof") {
      (zkeyPath: String, proofResult: ExpoCircomProofResult, proofLib: ExpoCircomProofLib) -> Bool in

      do {
        let proofLib = proofLib.proofLib == .arkworks ? ProofLib.arkworks : ProofLib.rapidsnark
        let isValid = try verifyCircomProof(
          zkeyPath: zkeyPath,
          proofResult: convertCircomProofResult(proofResult: proofResult),
          proofLib: ProofLib.arkworks
        )
        return isValid
      } catch {
        throw CircomError.circomProofVerificationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("generateHalo2Proof") {
      (srsPath: String, pkPath: String, circuitInputs: [String: [String]]) throws -> ExpoHalo2ProofResult
      in

      do {
        let res = try generateHalo2Proof(
          srsPath: srsPath, pkPath: pkPath, circuitInputs: circuitInputs)
        let result = ExpoHalo2ProofResult()
        result.inputs = res.inputs
        result.proof = res.proof
        return result
      } catch {
        throw Halo2Error.halo2ProofGenerationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("verifyHalo2Proof") {
      (srsPath: String, vkPath: String, proof: Data, publicInput: Data) throws -> Bool in

      do {
        let isValid = try verifyHalo2Proof(
          srsPath: srsPath, vkPath: vkPath, proof: proof, publicInput: publicInput)
        return isValid
      } catch {
        throw Halo2Error.halo2ProofVerificationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("generateNoirProof") {
      (circuitPath: String, srsPath: String?, inputs: [String], onChain: Bool, vk: Data, lowMemoryMode: Bool) throws -> Data in

      do {
        let res = try generateNoirProof(circuitPath: circuitPath, srsPath: srsPath, inputs: inputs, onChain: onChain, vk: vk, lowMemoryMode: lowMemoryMode)
        return res
      } catch {
        print("error", error)
        throw NoirError.noirProofGenerationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("verifyNoirProof") {
      (circuitPath: String, proof: Data, onChain: Bool, vk: Data, lowMemoryMode: Bool) throws -> Bool in

      do {
        let isValid = try verifyNoirProof(circuitPath: circuitPath, proof: proof, onChain: onChain, vk: vk, lowMemoryMode: lowMemoryMode)
        return isValid
      } catch {
        throw NoirError.noirProofVerificationFailed(error.localizedDescription)
      }
    }

    AsyncFunction("getNoirVerificationKey") {
      (circuitPath: String, srsPath: String?, onChain: Bool, lowMemoryMode: Bool) throws -> Data in

      do {
        let vk = try getNoirVerificationKey(circuitPath: circuitPath, srsPath: srsPath, onChain: onChain, lowMemoryMode: lowMemoryMode)
        return vk
      } catch {
        throw NoirError.noirProofGenerationFailed(error.localizedDescription)
      }
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent(
        "onChange",
        [
          "value": value
        ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(MoproView.self) {
      // Defines a setter for the `name` prop.
      Prop("name") { (view: MoproView, prop: String) in
        print(prop)
      }
    }
  }
}
