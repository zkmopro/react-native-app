package expo.modules.mopro

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.exception.CodedException
import java.io.File
import uniffi.mopro.*

fun convertCircomProof(proof: CircomProof): ExpoProof {
  var a = ExpoG1(proof.a.x, proof.a.y, proof.a.z)
  var b = ExpoG2(proof.b.x, proof.b.y, proof.b.z)
  var c = ExpoG1(proof.c.x, proof.c.y, proof.c.z)
  var output = ExpoProof(a, b, c, proof.protocol, proof.curve)
  return output
}

fun convertCircomProofResult(proofResult: ExpoCircomProofResult): CircomProofResult {
  var g1a = G1(proofResult.proof?.a?.x ?: "0", proofResult.proof?.a?.y ?: "0", proofResult.proof?.a?.z ?: "1")
  var g2b = G2(proofResult.proof?.b?.x ?: listOf("1", "0"), proofResult.proof?.b?.y ?: listOf("1", "0"), proofResult.proof?.b?.z ?: listOf("1", "0"))
  var g1c = G1(proofResult.proof?.c?.x ?: "0", proofResult.proof?.c?.y ?: "0", proofResult.proof?.c?.z ?: "1")
  var circomProof = CircomProof(g1a, g2b, g1c, proofResult.proof?.protocol ?: "groth16", proofResult.proof?.curve ?: "bn128")
  var circomProofResult = CircomProofResult(circomProof, proofResult.inputs ?: listOf("0"))
  return circomProofResult
}

class MoproModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a
    // string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for
    // clarity.
    // The module will be accessible from `requireNativeModule('Mopro')` in JavaScript.
    Name("Mopro")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a
    // dictionary.
    Constants("PI" to Math.PI)

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") { "Hello world! 👋" }

    AsyncFunction("generateCircomProof") { zkeyPath: String, circuitInputs: String, expoProofLib: ExpoCircomProofLib ->
      try {
        val file = File(zkeyPath)
    
        if (!file.exists()) {
          throw CodedException("ZkeyFileNotFound", "The zkey file was not found at path: $zkeyPath", null)
        }
    
        val proofLib = if (expoProofLib.proofLib == ProofLibOption.arkworks) ProofLib.ARKWORKS else ProofLib.RAPIDSNARK
        val res = generateCircomProof(file.absolutePath, circuitInputs, proofLib)
        ExpoCircomProofResult(convertCircomProof(res.proof), res.inputs)
      } catch (e: Exception) {
        throw CodedException("GenerateProofFailed", "Unknown error occurred during proof generation", e)
      }    
    }

    AsyncFunction("verifyCircomProof") { zkeyPath: String, proofResult: ExpoCircomProofResult, expoProofLib: ExpoCircomProofLib ->
      try {
        val file = File(zkeyPath)
        if (!file.exists()) {
          throw CodedException("ZkeyFileNotFound", "The zkey file was not found at path: $zkeyPath", null)
        }
        val proofLib = if (expoProofLib.proofLib == ProofLibOption.arkworks) ProofLib.ARKWORKS else ProofLib.RAPIDSNARK
        val isValid = verifyCircomProof(file.absolutePath, convertCircomProofResult(proofResult), proofLib)
        isValid
    } catch (e: Exception) {
      throw CodedException("VerifyProofFailed", "Unknown error occurred during proof verification", e)
    }   
    }

    AsyncFunction("generateHalo2Proof") { srsPath: String, pkPath: String, circuitInputs: Map<String, List<String>> ->
      try {
        val srsFile = File(srsPath)
        val pkFile = File(pkPath)
        if (!srsFile.exists()) {
          throw CodedException("SrsFileNotFound", "The srs file was not found at path: $srsPath", null)
        }
        if (!pkFile.exists()) {
          throw CodedException("PkFileNotFound", "The pk file was not found at path: $pkPath", null)
        }
        val res = generateHalo2Proof(srsFile.absolutePath, pkFile.absolutePath, circuitInputs)
        ExpoHalo2ProofResult(res.proof, res.inputs)
      } catch (e: Exception) {
        throw CodedException("GenerateProofFailed", "Unknown error occurred during proof generation", e)
      }   
    }

    AsyncFunction("verifyHalo2Proof") { srsPath: String, vkPath: String, proof: ByteArray, publicInput: ByteArray ->
      try {
        val srsFile = File(srsPath)
        val vkFile = File(vkPath)
        if (!srsFile.exists()) {
          throw CodedException("SrsFileNotFound", "The srs file was not found at path: $srsPath", null)
        }
        if (!vkFile.exists()) {
          throw CodedException("VkFileNotFound", "The vk file was not found at path: $vkPath", null)
        }
        val isValid = verifyHalo2Proof(srsFile.absolutePath, vkFile.absolutePath, proof, publicInput)
        isValid
        } catch (e: Exception) {
          throw CodedException("VerifyProofFailed", "Unknown error occurred during proof verification", e)
        }   
    }

    AsyncFunction("generateNoirProof") { circuitPath: String, srsPath: String?, inputs: List<String>, onChain: Boolean, vk: ByteArray, lowMemoryMode: Boolean ->
      try {
        val res = generateNoirProof(circuitPath, srsPath, inputs, onChain, vk, lowMemoryMode)
        res
      } catch (e: Exception) {
        throw CodedException("GenerateProofFailed", "Unknown error occurred during proof generation", e)
      }   
    }

    AsyncFunction("verifyNoirProof") { circuitPath: String, proof: ByteArray, onChain: Boolean, vk: ByteArray, lowMemoryMode: Boolean ->
      try {
        val res = verifyNoirProof(circuitPath, proof, onChain, vk, lowMemoryMode)
        res
      } catch (e: Exception) {
        throw CodedException("VerifyProofFailed", "Unknown error occurred during proof verification", e)
      }   
    }

    AsyncFunction("getNoirVerificationKey") { circuitPath: String, srsPath: String?, onChain: Boolean, lowMemoryMode: Boolean ->
      try {
        val res = getNoirVerificationKey(circuitPath, srsPath, onChain, lowMemoryMode)
        res
      } catch (e: Exception) {
        throw CodedException("GenerateProofFailed", "Unknown error occurred during verification key generation", e)
      }   
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf("value" to value))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as
    // part of
    // the view definition: Prop, Events.
    View(MoproView::class) {
      // Defines a setter for the `name` prop.
      Prop("name") { view: MoproView, prop: String -> println(prop) }
    }
  }
}
