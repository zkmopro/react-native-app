describe('Circom Proof UI Flow', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('should generate and verify proof with inputs', async () => {
        // Fill in input a
        await element(by.id('circom-input-a')).tap();
        await element(by.id('circom-input-a')).replaceText('3');

        // Fill in input b
        await element(by.id('circom-input-b')).tap();
        await element(by.id('circom-input-b')).replaceText('11');

        await element(by.id('circom-gen-proof-button')).tap();

        // Tap Generate Proof
        await element(by.id('circom-gen-proof-button')).tap();

        // Wait for proof to appear using proper Detox waiting
        await waitFor(element(by.id('circom-inputs-output')))
            .toHaveText('["33","3"]')
            .withTimeout(10000);

        // Tap Verify Proof
        await element(by.id('circom-verify-proof-button')).tap();

        // Wait for valid output
        await waitFor(element(by.id('circom-valid-output')))
            .toHaveText('true')
            .withTimeout(1000);
    });
});
