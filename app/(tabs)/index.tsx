import { Image, StyleSheet, Platform, Button } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { generateCircomProof } from "@/modules/mopro";
import { useState } from "react";

const circuitInputs = {
    a: ["3"],
    b: ["5"],
};

export default function HomeScreen() {
    const [proof, setProof] = useState<string[]>([]);
    function genProof(circuitInputs: { [key: string]: string[] }): void {
        const res = generateCircomProof(circuitInputs);
        setProof(res);
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
