import { Image, StyleSheet, Platform, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateCircomProof } from "@/modules/mopro";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { Asset } from "expo-asset";

const circuitInputs = {
    a: ["3"],
    b: ["5"],
};

export default function HomeScreen() {
    const [proof, setProof] = useState<string[]>([]);
    async function genProof(circuitInputs: {
        [key: string]: string[];
    }): Promise<void> {
        const asset = Asset.fromURI(
            "https://github.com/zkmopro/mopro/raw/ae88356e680ac4d785183267d6147167fabe071c/test-vectors/circom/multiplier2_final.zkey"
        );
        const file = await asset.downloadAsync();
        if (file.localUri === null) {
            return;
        } else {
            const newFileName = "multiplier2_final.zkey";
            const newFilePath = `${FileSystem.documentDirectory}${newFileName}`;

            try {
                await FileSystem.moveAsync({
                    from: file.localUri,
                    to: newFilePath,
                });
            } catch (error) {
                console.error("Error renaming the file:", error);
            }

            const res = generateCircomProof(
                newFilePath.replace("file://", ""),
                circuitInputs
            );
            setProof(res);
        }
    }
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
            <Button title="Proof" onPress={() => genProof(circuitInputs)} />
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Public Signals:</ThemedText>
                <ThemedText>{JSON.stringify(proof)}</ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
