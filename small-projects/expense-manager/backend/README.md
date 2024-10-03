# Firebase Project Setup

This guide walks you through the steps to run the Firebase project locally using the **Firebase Emulator Suite**, as well as how to trigger and test Cloud Functions.

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v16 or later)
2. **Firebase CLI**: Install it globally using:
    ```bash
    npm install -g firebase-tools
    ```

## Project Setup

### 1. Clone the Project

Clone the repository or download the project to your local machine.

### 2. Install Dependencies

Navigate to the `backend/functions` directory and install the required dependencies:

```bash
cd backend/functions
npm install
```

Make sure that `firebase-functions` and `firebase-admin` are properly installed. These will allow you to run Firebase Cloud Functions locally.

### 3. Firebase Configuration

Ensure that the `firebase.json` and `.firebaserc` files are located in the `backend` folder and are properly configured.

Your `firebase.json` should look like this:

```json
{
  "functions": {
    "source": "functions"
  },
  "emulators": {
    "firestore": {
      "port": 8080
    },
    "functions": {
      "port": 5001
    },
    "auth": {
      "port": 9099
    },
    "ui": {
      "enabled": true,
      "port": 4000
    },
    "singleProjectMode": true
  }
}
```

Your `.firebaserc` should look like this:

```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 4. Start the Firebase Emulators

You can run the Firebase Emulator Suite to simulate Firestore, Cloud Functions, Authentication, and more on your local machine.

To start the emulators, run the following command from the `backend` folder:

```bash
firebase emulators:start
```

This command will start all configured emulators (Firestore, Functions, Auth, etc.) and make them available locally.

You can access the Firebase Emulator UI at: `http://localhost:4000`.

### 5. Using the Firebase Functions Shell

The **Firebase Functions Shell** allows you to invoke functions locally without waiting for scheduled triggers or HTTP requests. To use the shell, run:

```bash
firebase functions:shell
```

Once the shell is running, you can manually invoke your functions. For example, to invoke a scheduled function:

```bash
scheduledRecurringTransactions()
```

This allows you to test your scheduled function locally.

### 6. Manually Triggering Functions in the Emulator

If you want to trigger functions through the emulator itself (such as HTTP-triggered or Firestore-triggered functions), you can make requests directly or simulate Firestore data changes through the Emulator UI.

For scheduled functions, you can also invoke them manually using the `functions:shell` as shown above.

### 7. Deploy to Firebase

When you're ready to deploy your functions to Firebase, run the following command from the `backend` directory:

```bash
firebase deploy --only functions
```

This will deploy the Cloud Functions defined in your project to your Firebase environment.

## Additional Commands

-   **Stop the Emulators**: To stop the emulators, press `Ctrl + C` in the terminal running the emulator. If you want to stop them programmatically, use:

    ```bash
    firebase emulators:stop
    ```

-   **Check Emulator Logs**: Emulator logs can be viewed directly in the terminal or in the **Firebase Emulator UI** at `http://localhost:4000`.

## Notes

-   Make sure your Node.js version is **16 or later**, as Firebase Cloud Functions requires Node.js 16+.
-   Use the `firebase.json` to configure any additional emulators (e.g., Firestore, Auth, etc.) as needed.

---

### Troubleshooting

If you encounter issues, check the following:

-   Ensure that all dependencies (`firebase-functions`, `firebase-admin`, etc.) are installed properly.
-   Make sure that the **Firebase CLI** is up to date.
-   Ensure you have the correct permissions for Firebase project access.

---

That's it! You should now be able to run and test your Firebase functions locally using the Emulator Suite and Functions Shell.
