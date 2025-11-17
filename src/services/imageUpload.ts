// Define the interface for the File object we expect
// Note: In a browser environment, the global 'File' type is already available.
// This is for clarity if you were using a mock or a different environment.

import type { Order } from "../hooks/useOrderBySuppliers";

/**
 * Handles the file selection, saves the file object, and starts the upload.
 * This function should be directly tied to the input's onChange event.
 * * @param event The change event from the HTMLInputElement.
 */
export const handleFileSelect = (
  event: React.ChangeEvent<HTMLInputElement>,
  order: Order | undefined
) => {
  // Use React.ChangeEvent<HTMLInputElement> for React, or cast the target for plain JS/TS
  const inputElement = event.target as HTMLInputElement;
  const fileList: FileList | null = inputElement.files;

  if (fileList && fileList.length > 0) {
    const fileToUpload: File = fileList[0];

    console.log(
      `File selected: ${fileToUpload.name}. Starting immediate upload...`
    );

    // ⭐ Key Step: Immediately call the upload function with the File object
    uploadFile(fileToUpload, "orderpaymentproof", order);

    // Optional: Clear the input value so the user can re-upload the same file
    // and trigger the change event again if needed (e.g., if the first attempt failed).
    inputElement.value = "";
  } else {
    console.log("No file was selected.");
  }
};
export const handleFileSelectB = (
  event: React.ChangeEvent<HTMLInputElement> | Event,
  order: Order
) => {
  // Use React.ChangeEvent<HTMLInputElement> for React, or cast the target for plain JS/TS
  const inputElement = event.target as HTMLInputElement;
  const fileList: FileList | null = inputElement.files;

  if (fileList && fileList.length > 0) {
    const fileToUpload: File = fileList[0];

    console.log(
      `File selected: ${fileToUpload.name}. Starting immediate upload...`
    );

    // ⭐ Key Step: Immediately call the upload function with the File object
    uploadFile(fileToUpload, "orderrecepts", order);

    // Optional: Clear the input value so the user can re-upload the same file
    // and trigger the change event again if needed (e.g., if the first attempt failed).
    inputElement.value = "";
  } else {
    console.log("No file was selected.");
  }
};

/**
 * Executes the actual network request to send the file to the server.
 * * @param file The File object to be uploaded.
 */
export const uploadFile = async (
  file: File,
  endpoint: string,
  order: Order | undefined
) => {
  // 1. Prepare data using FormData
  const formData = new FormData();
  formData.append("fileData", file, file.name); // 'fileData' is the expected server key

  try {
    // 2. Send the request
    const response = await fetch(`/ladyfish/orders/${order?.id}/${endpoint}`, {
      method: "POST",
      body: formData,
      // The Content-Type header is handled automatically by the browser for FormData
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ Upload successful! Server response:", result);
      // Update UI with success message or image preview URL
    } else {
      console.error("❌ Upload failed with status:", response.status);
      // Display error message to the user
    }
  } catch (error) {
    console.error("🌐 Network error during upload:", error);
  }
};
