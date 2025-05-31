# Organizational use-cases

Repo with use-cases from organizations (within their hackathon guides, githubs etc)

## Contents

- [Waku](#Waku)
- [Aztec](#Aztec)

## Waku

[source](https://github.com/waku-org/ideas/)

<details>
<summary><b>Polling/Voting</b></summary>
<br>
Enable polling or voting off-chain, vote results could be aggregated and submitted on-chain in one transaction.
</details>

<details>
<summary><b>Marketplace (buy/sell goods or NFTs, ride-share, llm, etc)</b></summary>
<br>
Send offer and negotiate off-chain. Highest bids sent over Waku could be binding and submitted to the contract by the seller.
This could include using Waku to enable LLM marketplace where several providers compete to be the one to generate a user's request.
</details>

<details>
<summary><b>Collaborative Editing</b></summary>
<br>
Use Waku for live collaborative editing of documents, saved versions of documents can then be stored on decentralized storage.
</details>

<details>
<summary><b>Multiplayer Games</b></summary>
<br>
Waku can be used to communicate game moves off-chain, the final state (e.g., winner) can then be submitted on-chain for a reward (e.g., NFT mint or winner takes stake).
</details>

<details>
<summary><b>IoT Systems</b></summary>
<br>
Enable devices to communicate or report small data payloads in a decentralized manner.
This can be an interesting way for a government agency or health organization to collect data from the population to study, in a privacy preserving manner.
For example, indoor air quality sensors could be distributed to residents across a city.
The authentication for data push could be done using zk tech: zk credentials of a given device is added to a zk group for a postcode, when pushing data to Waku, zk proof is used so that agency can auth the data and assign it to the right area/postcode but individual indentification or IP harvesting cannot be done.
This can also become an open data initiative: anyone can collect the data from the Waku network for study (DeSci).
</details>

<details>
<summary><b>Decentralized Wallet Address Ownership Verification</b></summary>
<br>
Use Waku to enable communication between dApps and wallets, such as signature or zero-knowledge proof exchange to prove identity.
</details>

<details>
<summary><b>Notifications Centre</b></summary>
<br>
Use an SDK (probably go-waku?) to build a general Notification protocol over Waku and a mobile app allowing you to replace centralized Push Notifications provided by Apple/Google.
</details>

<details>
<summary><b>API Generator</b></summary>
<br>
Build a tool to generate a Waku protocol (and code) from a provided OpenAPI specification.
</details>

<details>
<summary><b>Leader Election Protocol</b></summary>
<br>
Leader election can be viewed as a soft consensus mechanism. Implement something like [RAFT](https://raft.github.io/) as a library on top of Waku (using any SDK), so that users can easily plug it into their applications.
</details>

<details>
<summary><b>Reputation Systems</b></summary>
<br>
Using Waku to create reputation systems that can provide a reputation score for a particular identity (wallets, smart contracts etc.,)
</details>

<details>
<summary><b>Censorship-Resistant Reviews Plugin</b></summary>
<br>
An embeddable plugin which can be used for collecting and displaying censorship-resistant reviews
</details>

<details>
<summary><b>Privacy-Preserving Location Tracker</b></summary>
<br>
A location tracker that does not expose user's location and enables them to share it with each other provided that they are shared access
</details>

<details>
<summary><b>Medical Systems for Remote Diagnosis</b></summary>
<br>
Tracking medical data from sensors and IoT devices and sending them to a doctor for remote diagnosis
</details>

<details>
<summary><b>Decentralized Smart Grid System</b></summary>
<br>
Decentralized smart grid system optimizes energy distribution and consumption by leveraging Waku to efficiently manage energy resources across a network of users and devices
</details>

<details>
<summary><b>Decentralized Autonomous Vehicle Coordination</b></summary>
<br>
Decentralized Autonomous Vehicle Coordination powered by Waku enables self-driving vehicles to securely communicate and coordinate their actions, enhancing traffic efficiency and safety within a decentralized network</details>

<details>
<summary><b>Crowd-Sourced Weather Data Network</b></summary>
<br>
A Crowd-Sourced Weather Data Network utilizes Waku to collect and share real-time weather information from diverse sources, creating a comprehensive and accurate weather data resource for enhanced forecasts and monitoring while maintaining decentralization and privacy.
</details>

<details>
<summary><b>P2P Chess</b></summary>
<br>
A simple 2 player game where users can stake crypto and winner gets the stake
</details>

<details>
<summary><b>P2P TicTacToe</b></summary>
<br>
A simple 2 player game where users can stake crypto and play to win
</details>

<details>
<summary><b>Privacy-Focused Fitness Tracker</b></summary>
<br>
A fitness tracker which stores your health metrics and allows you to securely share it with your friends
</details>

<details>
<summary><b>Decentralized and Privacy-Focused Hiring Platform (Web3 version of BambooHR)</b></summary>
<br>
A bias-less HR platform that does not discriminate applicants based on diversifying factors
</details>

<details>
<summary><b>DAO/Governance Tooling</b></summary>
<br>
Using Waku to create, vote or approve proposals passed in a governance system
</details>

<details>
<summary><b>Satellite Communication Systems</b></summary>
<br>
Using Waku to harness satellite based communication systems that do not rely on a centralised provider
</details>

<details>
<summary><b>Decentralized Web Walkie-Talkie</b></summary>
<br>
Real-time audio communication channels built on Waku
</details>

<details>
<summary><b>Crypto ATMs</b></summary>
<br>
Decentralised ATM cards that can be used to withdraw / approve transactions at POCs
</details>

<details>
<summary><b>Smart Access Cards</b></summary>
<br>
NFC cards that can be used for various use cases like unlocking devices, signing transactions or interacting with real life elements
</details>

<details>
<summary><b>Secure DeFi</b></summary>
<br>
When a user wants to perform a transaction, ensure the transaction is made to the correct counter-party address within the correct chain.
</details>

<details>
<summary><b>News over Waku</b></summary>
<br>
Platform where people can publish news which can be voted and commented.
</details>

<details>
<summary><b>Budget approval app</b></summary>
<br>
Allow a community to approve and decide the best way to handle the common funds, and make the transactions transparent to the community.
</details>

<details>
<summary><b>Privacy preserving AI assistant</b></summary>
<br>
A privacy preserving AI assistant that does not reveal the identity of the user who sends prompts to the AI model.
</details>

<details>
<summary><b>Federated Learning Platform</b></summary>
<br>
A federated learning platform leveraging Waku for communication among edge devices. Waku ensures privacy by enabling encrypted communication channels, allowing devices to collaborate on model training tasks without sharing raw data.
</details>

<details>
<summary><b>Supply Chain Transparency Solution</b></summary>
<br>
A supply chain transparency solution incorporating Waku for secure communication and data sharing among stakeholders. Waku enables encrypted communication channels, allowing participants to exchange information about product origins, manufacturing processes, and logistics while maintaining data privacy and integrity.
</details>

<details>
<summary><b>Decentralised brainstorming tool</b></summary>
<br>
An anonymous tool for collaborative brainstorming where users can describe their ideas without having to worry about them being judged when they share ideas.
</details>

<details>
<summary><b>Privacy preserving confessions board</b></summary>
<br>
An anonymous and gamified tool for sharing confessions to other users.
</details>

<details>
<summary><b>Privacy preserving governance platform</b></summary>
<br>
A governance platform where votes are not linked to Wallets. ZK can be used to find if a wallet has the voting power but the user's vote is not transparent to other users.</details>

<details>
<summary><b>Privacy preserving APIs and Data sources</b></summary>
<br>
REST APIs can log IP addresses of the data source and the receiver. Building a decentralized layer for enabling privacy preserving APIs alongside rate-limiting with RLN can be quite impactful</details>

<details>
<summary><b>Decentralised and censorship resistant GitHub</b></summary>
<br>
The codebases on GitHub are vulnerable to censorship as they are stored and retrieved from a centralized source. A git client built on top of Waku is definitely an amazing idea.
</details>

## Aztec

[source](https://github.com/AztecProtocol/dev-rel/blob/main/hackathons/INSPIRATION.md)

## DeFi 💸

The lack of privacy is consistently brought up as one of the main reasons we are yet to see mass onboarding to crypto and DeFi. There are so many opportunities within the DeFi space to implement privacy measures, especially in user-friendly ways.

### Ideas

These projects would be implemented as, or in conjunction with, Aztec contracts:

- **ZK UniSwap frontend -** develop a frontend for our uniswap smart contract found [here](https://github.com/AztecProtocol/aztec-packages/tree/master/noir-projects/noir-contracts/contracts/uniswap_contract)
- **Shielding** - an app that allows users to convert public tokens into a private form, perform an action, and then unshield back into original token. This could build on the existing token contract implementation, see the [tutorial here](https://docs.aztec.network/dev_docs/tutorials/writing_token_contract).
- **ZK stablecoin** - build a stablecoin that allows you to wrap a stablecoin so it can be privately transferred
- **Private lending front end** - you can see an example [here](https://github.com/AztecProtocol/aztec-packages/tree/master/noir-projects/noir-contracts/contracts/lending_contract)
- **ZKollateral** - privately prove assets for collateral or creditworthiness for a loan
- **Proof of Liquidity** - privately prove solvency and/or compliance without exposing the underlying assets or trades
- **Private DEX** - allow users to trade assets without revealing the accounts that the assets originate from.
- **Oracles** - private and/or public price oracles will be critical infrastructure for building DeFi on Aztec.

## Tooling 🔧

Aztec and Noir are new protocols, so we’re always updating the developer tooling. There is a lot we can do here so don’t let these ideas limit you!

### Ideas

These projects would be implemented for Noir, but could be used for Aztec contracts as well:

- **IDE language support** - we have some support with VSCode but would love to expand this through IDE features like auto-complete, hover for documentation, go-to function definition/references, etc. You can find our Language Server protocol [here](https://noir-lang.org/docs/nargo/language_server/)
- **Ethereum History API** - trustlessly and optionally privately prove any piece of information that exists on Ethereum (e.g. token ownership, historical prices, protocol interactions, etc.) using Ethereum Storage Proofs in Noir - find example [here](https://github.com/Maddiaa0/noir-storage-proofs-demo)
- **Regex support in Noir** - regular expression (regex) in Noir that provides a mechanism to perform searches, manipulations, and evaluations using regex patterns within the language; more info [here](https://speakerdeck.com/sorasuegami/ethcon-korea-2023-zk-email-on-chain-verification-of-emails-using-zkp)
- **Hash Maps in Noir** - incorporate hash maps into Noir to allow devs to store and manipulate key-value pairs more efficiently

These projects could be done for Noir or Aztec contracts:

- **Boilerplates for more frameworks** - there are [Noir boilerplates](https://github.com/noir-lang/awesome-noir#boilerplates) and [Aztec boilerplates](https://github.com/AztecProtocol/aztec-packages/tree/master/boxes) for a number of popular frameworks already. Consider creating one for your favorite framework if there isn't one yet.

These projects would be specific to Noir:

- **Noir Foundry Integration Tests** - setting up integration tests in Foundry using [ffi](https://book.getfoundry.sh/cheatcodes/ffi) is tricky, but may be necessary because of the lack of ZK friendly cryptographic libraries in Solidity. Adding boilerplate code and a simple example of this to [`with-foundry`](https://github.com/noir-lang/noir-starter/tree/main/with-foundry) in the noir-starter repo would be useful.

### Proving backends

Noir does not compile to a specific proof system, so you can implement an entirely different proving system such as Halo2 or Marlin.

### Verifiers

The default UltraPlonk proving backend of Noir, [barretenberg](https://github.com/AztecProtocol/barretenberg), is currently capable of generating verifiers in [C++](https://github.com/noir-lang/aztec-connect/blob/kw/noir-dsl/barretenberg/src/aztec/plonk/proof_system/verifier/verifier.cpp) and [Solidity](https://github.com/noir-lang/aztec_backend/blob/master/common/src/contract/turbo_verifier.rs). You could extend barretenberg to generate verifiers implementable on other execution environments like Solana, Cosmos, Aptos, Sui, NEAR, Algorand, etc.

This is only relevant for Noir specifically (not Aztec).

## DAOs 🤝

Imagine if DAOs could take privacy-preserving measures like anonymous voting and confidential proposal submission.

### Ideas

You could try to implement these in vanilla Noir, or as Aztec contracts.

- **zkVoting** - a protocol that anyone can easily implement into their DAO for privacy-preserving voting
- **Private payments / payroll -** a system that allows DAOs to pay their contributors without revealing the amounts. This would greatly improve the UX and privacy of contributors.

## Data Protecting Proof of Concepts 🔓

We’re always looking to support applications that utilize privacy and ZK proofs in interesting and useful ways.

### Ideas

You could try to implement these in vanilla Noir, or as Aztec contracts.

- **zkPatreon** - privately unlock token-gated content by using Ethereum Storage Proofs in Noir
- **zkEmail** - privately prove that some email was received, while hiding any private data in the e-mail, without trusting a centralized server to keep your privacy. Inspired by this [great blog post](https://blog.aayushg.com/posts/zkemail)
- **Privacy Preserving Rewards Protocol** - an app or protocol that rewards participants for doing a specific on-chain action without revealing how much

## Gaming 👾

### Ideas

You could try to implement these in vanilla Noir, or as Aztec contracts.

- **ZK Poker**
- **ZK Chess**
- **ZK Scrabble**
- **ZK Quests** - players can prove they have achieved a specific action or quest within a game without revealing the quest, preventing spoilers
- **ZK Treasure Hunt** - irl experience that validates a user has found a clue/treasure without revealing their location to other players

## Identity 🕴️

Being able to have a private identity on the blockchain will become increasingly important as more & more use-cases come on chain.

### Ideas

Relevant for Aztec contracts or Noir:

- **Privacy-preserving KYC protocol**

Relevant for Aztec specifically:

- **Private Account Abstraction Wallet using Touch or Face ID** - user logs in with TouchID/FaceID using AA, and zk proofs are generated to confirm that correct biometric data has been provided

---

## Cool Noir projects

A curated list of existing projects building with Noir

### Authentication

- Anonymous proof of token ownership on Aztec for token-gated access
  - [Sequi](https://github.com/sequi-xyz)
  - [Cyclone](https://github.com/TalDerei/cyclone)
- [SafeRecover](https://github.com/porco-rosso-j/safe-recovery-noir) - Recovery of ownership of Gnosis Safe accounts

### Gaming

- [Mastermind](https://github.com/vezenovm/mastermind-noir) - Mastermind in Noir
- [BattleZips](https://battlezips.com/) ([Source Code](https://github.com/BattleZips/BattleZips-Noir)) - On-chain Battleship
- [Sudoku, Wordle, and Trivia](https://github.com/ruizehung/Zero-Knowledge-Sudoku-Wordle-Trivia) - Sudoku, Wordle, and Trivia games
- [ZCaptcha](https://github.com/signorecello/zcaptcha) - A ZK version of Captcha
- [Hangman](https://github.com/resurgencelabs/hangman) - Simple implementation of the Hangman game

### Governance

- [MeloCafe](https://github.com/MeloCafe) - Anonymous on-chain voting
- [Nouns Research Sprint](https://github.com/aragonzkresearch/nouns-anonymous-voting) - Anonymous voting research sprint solution with NounsDAO

### Social

- [FruityFriends](https://github.com/guelowrd/fruity-lib) - Various circuits (Proof of Intersection, Proof of Proximity, Proof of Proper Secret) to be used in social applications

### Payments

- [Private token](https://github.com/jat9292/Private-token) - Token with private balances using zkSNARKs and Homomorphic Encryption, inspired by Zeestar and Zether, implemented in Noir (and Rust).
