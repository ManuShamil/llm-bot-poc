---
description: Options to try in order to possibly resolve an issue you're experiencing.
---

# Troubleshooting

### I'm logged into MetaMask and connected to the PLAYA3ULL GAMES network, but my wallet won't connect to the dApp.

This issue often occurs due to a user having selected a wallet in their MetaMask that is not connected to the dApp, but they have another wallet that has previously been connected to the dApp.

To resolve this issue, you need to manually connect your wallet to the dApp, or switch accounts in MetaMask to the account that was previously connected.

#### Manually connect wallet to dApp

1. ![](<../.gitbook/assets/image (20).png>)
2. ![](<../.gitbook/assets/image (22).png>)

Your wallet is now connected to the dApp.



### My transactions are stuck as 'Pending' in MetaMask.

This often occurs due to your MetaMask's internal nonce being out of sync with the current connected blockchain's nonce.

To resolve this issue, try resetting your account in MetaMask by following the below step-by-step guide.

1. Click your account icon in MetaMask. This is located in the top-right of the MetaMask extension window.
2. Click the "Settings" button.\
   ![](<../.gitbook/assets/image (19).png>)
3. Click the "Advanced" button.\
   ![](<../.gitbook/assets/image (16).png>)
4. Scroll down until you see the "Reset account" button, and click it.\
   ![](<../.gitbook/assets/image (13).png>)
5. Confirm the resetting of your account.

Once you've completed the above steps, you should now see an empty transaction list in your MetaMask. This will have also resynced the MetaMask nonce with the blockchain, ensuring that your future requests will be submitted in sync.
