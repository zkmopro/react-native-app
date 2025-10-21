import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';

import {
  CircomProof,
  CircomProofResult,
  // Calculator,
  // type BinaryOperator,
  // SafeAddition,
  // ComputationResult,
  generateCircomProof,
  generateHalo2Proof,
  generateNoirProof,
  getNoirVerificationKey,
  Halo2ProofResult,
  ProofLib,
  verifyCircomProof,
  verifyHalo2Proof,
  verifyNoirProof,
} from 'my-test-library';
import RNFS from 'react-native-fs';
import { useEffect, useState } from 'react';

type ProofType = 'circom' | 'halo2' | 'noir';

async function loadAssets(fileName: string) {
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  const fileExists = await RNFS.exists(filePath);
  if (!fileExists) {
    try {
      let sourcePath = '';

      if (Platform.OS === 'android') {
        // File bundled in android assets folder (via react-native.config.js)
        sourcePath = `custom/${fileName}`;
        await RNFS.copyFileAssets(sourcePath, filePath);
      } else {
        // File bundled in iOS bundle (via react-native.config.js)
        sourcePath = `${RNFS.MainBundlePath}/${fileName}`;
        await RNFS.copyFile(sourcePath, filePath);
      }
    } catch (error) {
      console.error('Error copying file:', error);
      throw error;
    }
  }
  return filePath;
}

function CircomProofComponent() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [inputs, setInputs] = useState<string[]>([]);
  const [proof, setProof] = useState<CircomProof>({
    a: { x: '', y: '', z: '' },
    b: { x: [], y: [], z: [] },
    c: { x: '', y: '', z: '' },
    protocol: '',
    curve: '',
  });
  const [isValid, setIsValid] = useState<string>('');

  async function genProof(): Promise<void> {
    const circuitInputs = {
      a: [a],
      b: [b],
    };
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const filePath = await loadAssets('multiplier2_final.zkey');

      try {
        // DO NOT change the proofLib if you don't build for rapidsnark
        const res: CircomProofResult = await generateCircomProof(
          filePath.replace('file://', ''),
          JSON.stringify(circuitInputs),
          ProofLib.Arkworks
        );
        setProof(res.proof);
        setInputs(res.inputs);
      } catch (error) {
        console.error('Error generating proof:', error);
      }
    }
  }

  async function verifyProof(): Promise<void> {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const filePath = await loadAssets('multiplier2_final.zkey');

      try {
        const circomProofResult: CircomProofResult = {
          proof: proof,
          inputs: inputs,
        };
        // DO NOT change the proofLib if you don't build for rapidsnark
        const res: boolean = await verifyCircomProof(
          filePath.replace('file://', ''),
          circomProofResult,
          ProofLib.Arkworks
        );
        setIsValid(res.toString());
      } catch (error) {
        console.error('Error verifying proof:', error);
      }
    }
  }

  return (
    <View style={styles.proofContainer} testID="circom-proof-container">
      <View style={styles.inputContainer}>
        <Text style={styles.label}>a</Text>
        <TextInput
          testID="circom-input-a"
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
          testID="circom-input-b"
          style={styles.input}
          placeholder="Enter value for b"
          value={b}
          onChangeText={setB}
          keyboardType="numeric"
        />
      </View>
      <Button
        testID="circom-gen-proof-button"
        title="Generate Circom Proof"
        onPress={() => genProof()}
      />
      <Button
        testID="circom-verify-proof-button"
        title="Verify Circom Proof"
        onPress={() => verifyProof()}
      />
      <Text>Proof is Valid:</Text>
      <Text testID="circom-valid-output" style={styles.output}>
        {isValid}
      </Text>
      <Text>Public Signals:</Text>
      <ScrollView style={styles.outputScroll}>
        <Text testID="circom-inputs-output" style={styles.output}>
          {JSON.stringify(inputs)}
        </Text>
      </ScrollView>
      <Text>Proof:</Text>
      <ScrollView style={styles.outputScroll}>
        <Text testID="circom-proof-output" style={styles.output}>
          {JSON.stringify(proof)}
        </Text>
      </ScrollView>
    </View>
  );
}

function Halo2ProofComponent() {
  const [out, setOut] = useState('55');
  const [inputs, setInputs] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [proof, setProof] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [isValid, setIsValid] = useState<string>('');

  async function genProof(): Promise<void> {
    const circuitInputs = new Map<string, string[]>();
    circuitInputs.set('out', [out]);

    if (Platform.OS === 'web') {
      console.log('not implemented');
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const srsFileName = 'plonk_fibonacci_srs.bin';
      const pkFileName = 'plonk_fibonacci_pk.bin';
      const srsFilePath = await loadAssets(srsFileName);
      const pkFilePath = await loadAssets(pkFileName);

      try {
        const res: Halo2ProofResult = generateHalo2Proof(
          srsFilePath.replace('file://', ''),
          pkFilePath.replace('file://', ''),
          circuitInputs
        );
        setProof(res.proof);
        setInputs(res.inputs);
      } catch (error) {
        console.error('Error generating proof:', error);
      }
    }
  }

  async function verifyProof(): Promise<void> {
    if (Platform.OS === 'web') {
      console.log('not implemented');
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const srsFileName = 'plonk_fibonacci_srs.bin';
      const vkFileName = 'plonk_fibonacci_vk.bin';
      const srsFilePath = await loadAssets(srsFileName);
      const vkFilePath = await loadAssets(vkFileName);

      try {
        const res: boolean = verifyHalo2Proof(
          srsFilePath.replace('file://', ''),
          vkFilePath.replace('file://', ''),
          proof,
          inputs
        );
        setIsValid(res.toString());
      } catch (error) {
        console.error('Error verifying proof:', error);
      }
    }
  }

  return (
    <View style={styles.proofContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>a</Text>
        <TextInput
          testID="halo2-input-out"
          style={styles.input}
          placeholder="Enter value for out"
          value={out}
          onChangeText={setOut}
          keyboardType="numeric"
        />
      </View>
      <Button title="Generate Halo2 Proof" onPress={() => genProof()} />
      <Button title="Verify Halo2 Proof" onPress={() => verifyProof()} />
      <View style={styles.stepContainer}>
        <Text style={styles.label}>Proof is Valid:</Text>
        <Text style={styles.output}>{isValid}</Text>
        <Text style={styles.label}>Public Signals:</Text>
        <ScrollView style={styles.outputScroll}>
          <Text style={styles.output}>{new Uint8Array(inputs)}</Text>
        </ScrollView>
        <Text style={styles.label}>Proof:</Text>
        <ScrollView style={styles.outputScroll}>
          <Text style={styles.output}>{new Uint8Array(proof)}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

function NoirProofComponent() {
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [inputs, setInputs] = useState<string[]>([]);
  const [proof, setProof] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [isValid, setIsValid] = useState<string>('');
  const [vk, setVk] = useState<ArrayBuffer>(new ArrayBuffer(0));

  async function genProof(): Promise<void> {
    const circuitInputs = [a, b];
    if (Platform.OS === 'web') {
      console.log('not implemented');
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const circuitName = 'noir_multiplier2.json';
      const newFilePath = await loadAssets(circuitName);

      try {
        const onChain = true; // Use Keccak for Solidity compatibility
        const lowMemoryMode = false;

        // Generate or get existing verification key
        let verificationKey: ArrayBuffer;
        if (vk.byteLength === 0) {
          console.log('Generating verification key...');
          verificationKey = getNoirVerificationKey(
            newFilePath.replace('file://', ''),
            undefined,
            onChain,
            lowMemoryMode
          );
          setVk(verificationKey);
        } else {
          verificationKey = vk;
        }

        console.log('Generating proof with verification key...');
        const res: ArrayBuffer = generateNoirProof(
          newFilePath.replace('file://', ''),
          undefined,
          circuitInputs,
          onChain,
          verificationKey,
          lowMemoryMode
        );
        setProof(res);
      } catch (error) {
        console.error('Error generating proof:', error);
      }
    }
  }

  async function verifyProof(): Promise<void> {
    if (Platform.OS === 'web') {
      setIsValid('not implemented');
    } else if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (proof.byteLength === 0) {
        setIsValid('Error: Proof data is not available. Generate proof first.');
        return;
      }

      if (vk.byteLength === 0) {
        setIsValid(
          'Error: Verification key is not available. Generate proof first.'
        );
        return;
      }

      const circuitName = 'noir_multiplier2.json';
      const newFilePath = await loadAssets(circuitName);

      try {
        const onChain = true; // Use Keccak for Solidity compatibility
        const lowMemoryMode = false;

        const res: boolean = verifyNoirProof(
          newFilePath.replace('file://', ''),
          proof,
          onChain,
          vk,
          lowMemoryMode
        );
        setIsValid(res.toString());
      } catch (error) {
        console.error('Error verifying proof:', error);
      }
    }
  }

  return (
    <View style={styles.proofContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>a</Text>
        <TextInput
          testID="noir-input-a"
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
          testID="noir-input-b"
          style={styles.input}
          placeholder="Enter value for b"
          value={b}
          onChangeText={setB}
          keyboardType="numeric"
        />
      </View>
      <Button title="Generate Noir Proof" onPress={() => genProof()} />
      <Button title="Verify Noir Proof" onPress={() => verifyProof()} />
      <View style={styles.stepContainer}>
        <Text style={styles.label}>Proof is Valid:</Text>
        <Text style={styles.output}>{isValid}</Text>
        {/* TODO: add public signals */}
        {/* <ThemedText type="subtitle">Public Signals:</ThemedText>
              <ScrollView style={styles.outputScroll}>
                  <Text style={styles.output}>{JSON.stringify(inputs)}</Text>
              </ScrollView> */}
        <Text style={styles.label}>Proof:</Text>
        <ScrollView style={styles.outputScroll}>
          <Text style={styles.output}>{new Uint8Array(proof)}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ProofType>('circom');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === 'circom' && styles.activeTab]}
          onPress={() => setActiveTab('circom')}
        >
          <Text style={styles.tabText}>Circom Proof</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'halo2' && styles.activeTab]}
          onPress={() => setActiveTab('halo2')}
        >
          <Text style={styles.tabText}>Halo2 Proof</Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'noir' && styles.activeTab]}
          onPress={() => setActiveTab('noir')}
        >
          <Text style={styles.tabText}>Noir Proof</Text>
        </Pressable>
      </View>

      {activeTab === 'circom' ? (
        <CircomProofComponent />
      ) : activeTab === 'halo2' ? (
        <Halo2ProofComponent />
      ) : (
        <NoirProofComponent />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
  outputScroll: {
    maxHeight: 150,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  output: {
    fontSize: 14,
    padding: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  activeTab: {
    borderBottomColor: '#A1CEDC',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  proofContainer: {
    padding: 10,
  },
});
