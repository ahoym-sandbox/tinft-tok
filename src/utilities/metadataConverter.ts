import { convertStringToHex } from 'xrpl';
import { NFTMetadata } from '../XrplSandbox/types';

export function convertNFTMetadatToHex(medadata: NFTMetadata) {
    const metadataSize = new Blob([JSON.stringify(medadata)]).size;
    console.log(metadataSize)

    if (metadataSize > 256) throw new Error('Metadasize cannot be greater than 256 byte.');

    return convertStringToHex(JSON.stringify(medadata));
} 

export function generateNFTMemos(URI: string) {
    return [
        {
          "Memo": {
            "MemoType": "687474703a2f2f6578616d706c652e636f6d2f6d656d6f2f67656e65726963",
            "MemoData": URI
          }
        }
      ]
}