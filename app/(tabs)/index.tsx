import {
    Image,
    StyleSheet,
    Button,
    TextInput,
    View,
    Text,
    Platform,
    Pressable,
    ScrollView,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
    generateCircomProof,
    generateCircomProofWeb,
    CircomProofResult,
    generateHalo2Proof,
    Halo2ProofResult,
    verifyHalo2Proof,
    verifyCircomProof,
    CircomProof,
    generateNoirProof,
    verifyNoirProof,
    getNoirVerificationKey,
    ProofLibOption,
    CircomProofLib,
} from "@/modules/mopro";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Asset } from "expo-asset";

type ProofType = "circom" | "halo2" | "noir";

function CircomProofComponent() {
    const [a, setA] = useState("3");
    const [b, setB] = useState("4");
    const [inputs, setInputs] = useState<string[]>([]);
    const [proof, setProof] = useState<CircomProof>({
        a: { x: "", y: "", z: "" },
        b: { x: [], y: [], z: [] },
        c: { x: "", y: "", z: "" },
        protocol: "",
        curve: "",
    });
    const [isValid, setIsValid] = useState<string>("");

    async function genProof(): Promise<void> {
        const circuitInputs = {
            a: [a],
            b: [b],
        };
        if (Platform.OS === "web") {
            const wasmPath = "https://ci-keys.zkmopro.org/multiplier2.wasm";
            const zkeyPath =
                "https://ci-keys.zkmopro.org/multiplier2_final.zkey";
            const res: CircomProofResult = await generateCircomProofWeb(
                wasmPath,
                zkeyPath,
                circuitInputs
            );
            setProof(res.proof);
            setInputs(res.inputs);
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            const newFileName = "multiplier2_final.zkey";
            const asset = Asset.fromModule(
                require(`@/assets/keys/${newFileName}`)
            );
            const newFilePath = `${FileSystem.documentDirectory}${newFileName}`;
            const fileInfo = await FileSystem.getInfoAsync(newFilePath);
            if (!fileInfo.exists) {
                const file = await asset.downloadAsync();
                if (file.localUri === null) {
                    throw new Error("Failed to download the file");
                }
                try {
                    await FileSystem.moveAsync({
                        from: file.localUri,
                        to: newFilePath,
                    });
                } catch (error) {
                    console.error("Error renaming the file:", error);
                }
            }

            try {
                // DO NOT change the proofLib if you don't build for rapidsnark
                const proofLib: CircomProofLib = {
                    proofLib: ProofLibOption.Arkworks,
                };
                const res: CircomProofResult = await generateCircomProof(
                    newFilePath.replace("file://", ""),
                    JSON.stringify(circuitInputs),
                    proofLib
                );
                setProof(res.proof);
                setInputs(res.inputs);
            } catch (error) {
                console.error("Error generating proof:", error);
            }
        }
    }

    async function verifyProof(): Promise<void> {
        if (Platform.OS === "web") {
            setIsValid("not implemented");
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            const newFileName = "multiplier2_final.zkey";
            const asset = Asset.fromModule(
                require(`@/assets/keys/${newFileName}`)
            );
            const newFilePath = `${FileSystem.documentDirectory}${newFileName}`;
            const fileInfo = await FileSystem.getInfoAsync(newFilePath);
            if (!fileInfo.exists) {
                const file = await asset.downloadAsync();
                if (file.localUri === null) {
                    throw new Error("Failed to download the file");
                }
                try {
                    await FileSystem.moveAsync({
                        from: file.localUri,
                        to: newFilePath,
                    });
                } catch (error) {
                    console.error("Error renaming the file:", error);
                }
            }

            try {
                const circomProofResult: CircomProofResult = {
                    proof: proof,
                    inputs: inputs,
                };
                // DO NOT change the proofLib if you don't build for rapidsnark
                const proofLib: CircomProofLib = {
                    proofLib: ProofLibOption.Arkworks,
                };
                const res: boolean = await verifyCircomProof(
                    newFilePath.replace("file://", ""),
                    circomProofResult,
                    proofLib
                );
                setIsValid(res.toString());
            } catch (error) {
                console.error("Error verifying proof:", error);
            }
        }
    }

    return (
        <View style={styles.proofContainer} testID="proof-container">
            <View style={styles.inputContainer}>
                <Text style={styles.label}>a</Text>
                <TextInput
                    testID="input-a"
                    style={styles.input}
                    placeholder="Enter value for a"
                    value={a}
                    onChangeText={setA}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>b</Text>
                <TextInput
                    testID="input-b"
                    style={styles.input}
                    placeholder="Enter value for b"
                    value={b}
                    onChangeText={setB}
                    keyboardType="numeric"
                />
            </View>
            <Button
                testID="gen-proof-button"
                title="Generate Circom Proof"
                onPress={() => genProof()}
            />
            <Button
                testID="verify-proof-button"
                title="Verify Circom Proof"
                onPress={() => verifyProof()}
            />
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Proof is Valid:</ThemedText>
                <Text testID="valid-output" style={styles.output}>
                    {isValid}
                </Text>
                <ThemedText type="subtitle">Public Signals:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text testID="inputs-output" style={styles.output}>
                        {JSON.stringify(inputs)}
                    </Text>
                </ScrollView>
                <ThemedText type="subtitle">Proof:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text testID="proof-output" style={styles.output}>
                        {JSON.stringify(proof)}
                    </Text>
                </ScrollView>
            </ThemedView>
        </View>
    );
}

function Halo2ProofComponent() {
    const [out, setOut] = useState("55");
    const [inputs, setInputs] = useState<Uint8Array>(new Uint8Array());
    const [proof, setProof] = useState<Uint8Array>(new Uint8Array());
    const [isValid, setIsValid] = useState<string>("");

    async function genProof(): Promise<void> {
        const circuitInputs = {
            out: [out],
        };

        if (Platform.OS === "web") {
            console.log("not implemented");
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            const srsFileName = "plonk_fibonacci_srs.bin";
            const pkFileName = "plonk_fibonacci_pk.bin";
            const srsAsset = Asset.fromModule(
                require(`@/assets/keys/${srsFileName}`)
            );
            const pkAsset = Asset.fromModule(
                require(`@/assets/keys/${pkFileName}`)
            );
            const srsFilePath = `${FileSystem.documentDirectory}${srsFileName}`;
            const pkFilePath = `${FileSystem.documentDirectory}${pkFileName}`;
            const srsFileInfo = await FileSystem.getInfoAsync(srsFilePath);
            const pkFileInfo = await FileSystem.getInfoAsync(pkFilePath);
            if (!srsFileInfo.exists || !pkFileInfo.exists) {
                const srsFile = await srsAsset.downloadAsync();
                const pkFile = await pkAsset.downloadAsync();
                if (srsFile.localUri === null || pkFile.localUri === null) {
                    throw new Error("Failed to download the file");
                }
                try {
                    await FileSystem.moveAsync({
                        from: srsFile.localUri,
                        to: srsFilePath,
                    });
                    await FileSystem.moveAsync({
                        from: pkFile.localUri,
                        to: pkFilePath,
                    });
                } catch (error) {
                    console.error("Error renaming the file:", error);
                }
            }

            try {
                const res: Halo2ProofResult = await generateHalo2Proof(
                    srsFilePath.replace("file://", ""),
                    pkFilePath.replace("file://", ""),
                    circuitInputs
                );
                setProof(res.proof);
                setInputs(res.inputs);
            } catch (error) {
                console.error("Error generating proof:", error);
            }
        }
    }

    async function verifyProof(): Promise<void> {
        if (Platform.OS === "web") {
            console.log("not implemented");
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            const srsFileName = "plonk_fibonacci_srs.bin";
            const vkFileName = "plonk_fibonacci_vk.bin";
            const srsAsset = Asset.fromModule(
                require(`@/assets/keys/${srsFileName}`)
            );
            const vkAsset = Asset.fromModule(
                require(`@/assets/keys/${vkFileName}`)
            );
            const srsFilePath = `${FileSystem.documentDirectory}${srsFileName}`;
            const vkFilePath = `${FileSystem.documentDirectory}${vkFileName}`;
            const srsFileInfo = await FileSystem.getInfoAsync(srsFilePath);
            const vkFileInfo = await FileSystem.getInfoAsync(vkFilePath);
            if (!srsFileInfo.exists || !vkFileInfo.exists) {
                const srsFile = await srsAsset.downloadAsync();
                const vkFile = await vkAsset.downloadAsync();
                if (srsFile.localUri === null || vkFile.localUri === null) {
                    throw new Error("Failed to download the file");
                }
                try {
                    await FileSystem.moveAsync({
                        from: srsFile.localUri,
                        to: srsFilePath,
                    });
                    await FileSystem.moveAsync({
                        from: vkFile.localUri,
                        to: vkFilePath,
                    });
                } catch (error) {
                    console.error("Error renaming the file:", error);
                }
            }
            try {
                const res: boolean = await verifyHalo2Proof(
                    srsFilePath.replace("file://", ""),
                    vkFilePath.replace("file://", ""),
                    proof,
                    inputs
                );
                setIsValid(res.toString());
            } catch (error) {
                console.error("Error verifying proof:", error);
            }
        }
    }

    return (
        <View style={styles.proofContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>a</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value for out"
                    value={out}
                    onChangeText={setOut}
                    keyboardType="numeric"
                />
            </View>
            <Button title="Generate Halo2 Proof" onPress={() => genProof()} />
            <Button title="Verify Halo2 Proof" onPress={() => verifyProof()} />
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Proof is Valid:</ThemedText>
                <Text style={styles.output}>{isValid}</Text>
                <ThemedText type="subtitle">Public Signals:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text style={styles.output}>{inputs}</Text>
                </ScrollView>
                <ThemedText type="subtitle">Proof:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text style={styles.output}>{proof}</Text>
                </ScrollView>
            </ThemedView>
        </View>
    );
}

function NoirProofComponent() {
    const [a, setA] = useState("3");
    const [b, setB] = useState("4");
    const [inputs, setInputs] = useState<string[]>([]);
    const [proof, setProof] = useState<Uint8Array>(new Uint8Array());
    const [isValid, setIsValid] = useState<string>("");
    const [vk, setVk] = useState<Uint8Array>(new Uint8Array());

    async function genProof(): Promise<void> {
        const circuitInputs = [a, b];
        if (Platform.OS === "web") {
            console.log("not implemented");
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            const circuitName = "noir_multiplier2.json";

            const content = require(`@/assets/keys/${circuitName}`);

            const newFilePath = `${FileSystem.documentDirectory}${circuitName}`;

            const fileInfo = await FileSystem.getInfoAsync(newFilePath);
            if (!fileInfo.exists) {
                try {
                    await FileSystem.writeAsStringAsync(
                        newFilePath,
                        JSON.stringify(content)
                    );
                } catch (error) {
                    console.error("Error copying file:", error);
                    throw error;
                }
            }

            try {
                const onChain = true;  // Use Keccak for Solidity compatibility
                const lowMemoryMode = false;
                
                // Generate or get existing verification key
                let verificationKey: Uint8Array;
                if (vk.length === 0) {
                    console.log("Generating verification key...");
                    verificationKey = await getNoirVerificationKey(
                        newFilePath.replace("file://", ""),
                        null,
                        onChain,
                        lowMemoryMode
                    );
                    setVk(verificationKey);
                } else {
                    verificationKey = vk;
                }

                console.log("Generating proof with verification key...");
                const res: Uint8Array = await generateNoirProof(
                    newFilePath.replace("file://", ""),
                    null,
                    circuitInputs,
                    onChain,
                    verificationKey,
                    lowMemoryMode
                );
                setProof(res);
            } catch (error) {
                console.error("Error generating proof:", error);
            }
        }
    }

    async function verifyProof(): Promise<void> {
        if (Platform.OS === "web") {
            setIsValid("not implemented");
        } else if (Platform.OS === "android" || Platform.OS === "ios") {
            if (proof.length === 0) {
                setIsValid("Error: Proof data is not available. Generate proof first.");
                return;
            }
            
            if (vk.length === 0) {
                setIsValid("Error: Verification key is not available. Generate proof first.");
                return;
            }

            const circuitName = "noir_multiplier2.json";

            const content = require(`@/assets/keys/${circuitName}`);

            const newFilePath = `${FileSystem.documentDirectory}${circuitName}`;

            const fileInfo = await FileSystem.getInfoAsync(newFilePath);
            if (!fileInfo.exists) {
                try {
                    await FileSystem.writeAsStringAsync(
                        newFilePath,
                        JSON.stringify(content)
                    );
                } catch (error) {
                    console.error("Error copying file:", error);
                    throw error;
                }
            }

            try {
                const onChain = true;  // Use Keccak for Solidity compatibility
                const lowMemoryMode = false;

                const res: boolean = await verifyNoirProof(
                    newFilePath.replace("file://", ""),
                    proof,
                    onChain,
                    vk,
                    lowMemoryMode
                );
                setIsValid(res.toString());
            } catch (error) {
                console.error("Error verifying proof:", error);
            }
        }
    }

    return (
        <View style={styles.proofContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>a</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value for a"
                    value={a}
                    onChangeText={setA}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>b</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value for b"
                    value={b}
                    onChangeText={setB}
                    keyboardType="numeric"
                />
            </View>
            <Button title="Generate Noir Proof" onPress={() => genProof()} />
            <Button title="Verify Noir Proof" onPress={() => verifyProof()} />
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Proof is Valid:</ThemedText>
                <Text style={styles.output}>{isValid}</Text>
                {/* TODO: add public signals */}
                {/* <ThemedText type="subtitle">Public Signals:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text style={styles.output}>{JSON.stringify(inputs)}</Text>
                </ScrollView> */}
                <ThemedText type="subtitle">Proof:</ThemedText>
                <ScrollView style={styles.outputScroll}>
                    <Text style={styles.output}>{proof}</Text>
                </ScrollView>
            </ThemedView>
        </View>
    );
}

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState<ProofType>("circom");

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
        >
            <View style={styles.tabContainer}>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === "circom" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("circom")}
                >
                    <Text style={styles.tabText}>Circom Proof</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === "halo2" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("halo2")}
                >
                    <Text style={styles.tabText}>Halo2 Proof</Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.tab,
                        activeTab === "noir" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("noir")}
                >
                    <Text style={styles.tabText}>Noir Proof</Text>
                </Pressable>
            </View>

            {activeTab === "circom" ? (
                <CircomProofComponent />
            ) : activeTab === "halo2" ? (
                <Halo2ProofComponent />
            ) : (
                <NoirProofComponent />
            )}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        flex: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    outputScroll: {
        maxHeight: 150,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 10,
    },
    output: {
        fontSize: 14,
        padding: 10,
    },
    tabContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
    },
    activeTab: {
        borderBottomColor: "#A1CEDC",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "500",
    },
    proofContainer: {
        padding: 10,
    },
});
