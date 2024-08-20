package expo.modules.mopro

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import uniffi.mopro.generateCircomProof
import uniffi.mopro.toEthereumInputs

fun generateProof(circuitInputs: Map<String, List<String>>): List<String> {

  val zkeyPath = "/data/user/0/expo.modules.mopro/files/multiplier2_final.zkey"
  var res = generateCircomProof(zkeyPath, circuitInputs)
  return toEthereumInputs(res.inputs)
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

    Function("generateCircomProof") { circuitInputs: Map<String, List<String>> ->
      generateProof(circuitInputs)
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
