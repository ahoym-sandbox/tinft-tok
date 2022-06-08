import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { convertHexToString, NFTokenMint } from "xrpl";
import { NFTMetadata } from "../XrplSandbox/types";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { nftDevNetXrplClient1, nftDevNetXrplClient2 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET, CLIENT_TWO_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";

const getNftMetadata = (URI: string): NFTMetadata => {
    return JSON.parse(convertHexToString(URI));
};


const NFTMarketplace = () => {
    const [nfts, setNfts] = useState<any>([]);
    const accounts = [nftDevNetXrplClient1, nftDevNetXrplClient2];
    const secrets = [CLIENT_ONE_FAUCET_WALLET_SECRET, CLIENT_TWO_FAUCET_WALLET_SECRET];

    useEffect(() => {
        async function getNFTs() {
            const nftlist = await Promise.all(
                accounts.map(async (account, index) => {
                    await account.generateWallet(secrets[index])
                    return account.viewOwnNfts()

                }))
            console.log('LIST: ', nftlist)
            let all: any[] = [];
            nftlist.forEach(a => {
                all = [...all, ...a.result.account_nfts]
            })
            setNfts(all)
        }

        getNFTs();

    });

    useEffect(() => {
        console.log('NFTs: ', nfts)

    })


    return (
        <div className="px-4">
            <h2 className="mb-4 font-semibold">Marketplace</h2>
            <hr className="my-4" />
            {!!nfts.length ? (
                <ImageList
                    className="ImageList"
                    cols={2}
                    gap={4}
                    variant="standard"
                >
                    {nfts.map((nft: NFTokenMint, idx: any) =>
                        nft.URI ? (
                            <ImageListItem key={getNftMetadata(nft.URI).url + idx} className="m-2">
                                <img
                                    src={getNftMetadata(nft.URI).url}
                                    alt="alt"
                                    style={{ maxWidth: '400px' }}
                                />
                                <ImageListItemBar
                                    title={getNftMetadata(nft.URI).author}
                                    position="below"
                                />

                            </ImageListItem>
                        ) : null
                    )}
                </ImageList>
            ) : (
                <EmptyState />
            )}
        </div >
    );
}


export default NFTMarketplace;

