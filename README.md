# JWK Creator

A simple, secure, and modern web application that converts an existing RSA private or public key into a [JSON Web Key (JWK)](https://tools.ietf.org/html/rfc7517).

## Why does this exist?
Most online JWK tools generate a brand *new* private key and create a JWK from that. This tool was built specifically for the scenario where you already have an *existing* RSA key (in PEM format) and simply need to format it as a JWK. 

## Features
- **100% Client-Side & Secure:** All cryptographic parsing and formatting happens directly in your browser. Your sensitive private keys are **never** transmitted over the internet or sent to a server.
- **Modern Tech Stack:** Built with Vite and Vanilla TypeScript for maximum performance and a lightweight footprint.
- **Premium UI:** Features a sleek, responsive dark-mode interface with glassmorphism effects and one-click clipboard copying.

## Tech Stack
* **Vite** (Bundler & Development Server)
* **TypeScript** (Application Logic)
* **HTML/CSS** (Vanilla, no heavy frameworks)
* **pem-jwk** (Cryptographic conversion library)

## Getting Started Locally

To run this project on your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run start
   # or npm run dev
   ```

3. Open your browser to the local address provided in the terminal (usually `http://localhost:5173`).

## Usage

This tool expects RSA keys encoded in **PEM format**. 
If you have a certificate and need to extract the public key, you can use OpenSSL in your terminal:
```bash
openssl x509 -in certificate.pem -pubkey -noout
```

Simply paste your PEM key into the tool, configure any optional parameters (like Public Key Use, Algorithm, or Key ID), and click **Convert to JWK**.

## Deployment

Because this is a static single-page application with no backend, it can be deployed for free on Vercel with zero configuration.

### Deploy via Vercel CLI
```bash
npx vercel
```

### Deploy via GitHub
1. Push this repository to GitHub.
2. Log into [Vercel](https://vercel.com).
3. Import the repository. Vercel will automatically detect the Vite framework and handle the build commands (`npm run build` and the `dist` directory) for you.
