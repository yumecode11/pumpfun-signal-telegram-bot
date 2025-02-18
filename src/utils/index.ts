import { Metaplex } from "@metaplex-foundation/js";
import { connection } from "../config";
import { ConfirmedSignatureInfo, PublicKey } from "@solana/web3.js";

const metaplex = Metaplex.make(connection);

const getMetaData = async (mintAddress: PublicKey) => {

  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });

    return token
  }
}

async function getMintTransaction(mintPublicKey: PublicKey, txs?: ConfirmedSignatureInfo[], beforeSignatures?: string) {
  try {
    if (txs == undefined) {
      txs = []
    }
    let signatures;
    // Get the transaction signatures for the mint address
    if (beforeSignatures == null || beforeSignatures == "") {
      signatures = await connection.getSignaturesForAddress(mintPublicKey, {}, "confirmed");
    } else {
      signatures = await connection.getSignaturesForAddress(mintPublicKey, { before: beforeSignatures }, "confirmed");
    }
    if (signatures.length === 0) {
      console.log("No transactions found for this mint address.");
      return null;
    }
    const mintSignature = signatures[signatures.length - 1].signature; // Oldest signature
    console.log("Mint Transaction Signature:", mintSignature);
    const mintTransaction = await connection.getParsedTransaction(mintSignature, { commitment: 'confirmed', maxSupportedTransactionVersion: 0 });

    if (mintTransaction == null || mintTransaction.meta?.logMessages == null) return null
    if (mintTransaction.meta?.logMessages.join("").includes("Instruction: InitializeMint2")) {
      console.log("Mint Transaction Details:", mintTransaction);

      return [...txs, signatures];
    }
    else {
      return await getMintTransaction(mintPublicKey, signatures, mintSignature)
    }
  } catch (error) {
    console.error("Error fetching mint transaction:", error);
    return null;
  }
}

export {
  getMetaData,
  getMintTransaction
}