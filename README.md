# C2C Buyer Flow Prototype

A clickable prototype for CertifID's Cash to Close buyer payment experience. Built in React with Vite for design validation and engineering handoff.

**Live prototype:** [buyer-flow-prototype-c2c.vercel.app](https://buyer-flow-prototype-c2c.vercel.app/)

## What it covers

- **Verification** — Phone number verification and SMS code entry with masked phone numbers
- **Landing page** — Payment request details from the title company, with an ineligible closing date variant
- **Payment method selection** — Digital payment vs. wire transfer, with an ineligible variant when closing date disqualifies digital
- **Digital path** — KYC identity verification, Plaid bank connection, eligibility check, 3 PM ET cutoff alert, and payment review
- **Wire path** — Wire instruction review, optional CertifID Protection payment form, and verified wire details
- **Confirmation** — Payment success screen with share modal
- **Error states** — Plaid connection failed, savings account detected, closing too soon, insufficient funds, and balance unavailable — all routing to wire instructions as the universal fallback

## Screen Navigator

A sidebar (left) lets engineers click through every screen without manually navigating. Screens are organized by flow section: Verification, Entry, Digital Path, Success, Wire, and Errors.

## Deep Linking

URLs update as you navigate and can be shared directly. For example, `/landing-page` opens the landing page, `/payment-methods` opens method selection, and `/wire-instructions` opens the wire details screen.

## Tech

React, Vite, deployed on Vercel. All data is mock. No backend.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.
