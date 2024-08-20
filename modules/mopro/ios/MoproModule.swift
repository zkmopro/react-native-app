import ExpoModulesCore
import moproFFI

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

    Function("generateCircomProof") { (circuitInputs: [String: [String]]) -> [String] in
      var inputs = [String: [String]]()
      let a = 3  // First input
      let b = 5  // Second input
      inputs["a"] = [String(a)]  // Numbers should be passed as strings
      inputs["b"] = [String(b)]

      // Begin timing our proof generation
      let start = CFAbsoluteTimeGetCurrent()

      // Call into the compiled static library
      let zkeyPath = Bundle.main.path(forResource: "multiplier2_final", ofType: "zkey")!
      do {
        let generateProofResult = try generateCircomProof(zkeyPath: zkeyPath, circuitInputs: inputs)
        let end = CFAbsoluteTimeGetCurrent()
        let timeTaken = end - start
        print("built proof in \(String(format: "%.3f", timeTaken))s")
        return toEthereumInputs(inputs: generateProofResult.inputs)
      } catch {
        print("Error generate a proof: \(error)")
      }
      return []
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
