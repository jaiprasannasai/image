// Convert the image to an array buffer (this could be done via File API, canvas, etc.)
async function encryptImage(imageBuffer, key) {
    // Generate a random initialization vector
    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    // Encrypt the image using AES-GCM
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        imageBuffer
    );

    // Return the IV and encrypted data
    return {
        iv: iv,
        data: new Uint8Array(encrypted)
    };
}

// Generate an AES-GCM key
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256
        },
        true, // whether the key is extractable (i.e., can be used in exportKey)
        ["encrypt", "decrypt"]
    );
}

async function decryptImage(encryptedData, iv, key) {
    // Decrypt the image using AES-GCM
    const decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encryptedData
    );

    // Return the decrypted image as an array buffer
    return new Uint8Array(decrypted);
}

