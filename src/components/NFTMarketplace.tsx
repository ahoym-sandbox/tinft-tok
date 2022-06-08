import * as React from 'react';
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Button from '@mui/material/Button';
import { convertHexToString, NFTokenMint } from "xrpl";
import { NFTMetadata } from "../XrplSandbox/types";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { nftDevNetXrplClient1, nftDevNetXrplClient2 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET, CLIENT_TWO_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";
import { AccountNFTsResponse } from 'xrpl';

const getNftMetadata = (URI: string): NFTMetadata => {
    return JSON.parse(convertHexToString(URI));
};

// const purchaseNFT = ({ user, owner }) => {
//     user.createNftBuyOffer
//     owner.acceptNftBuyOffer
// }   

const NFTMarketplace = () => {
    const [nfts, setNfts] = useState<any>([]);
    const accounts = [nftDevNetXrplClient1, nftDevNetXrplClient2];
    const secrets = [CLIENT_ONE_FAUCET_WALLET_SECRET, CLIENT_TWO_FAUCET_WALLET_SECRET];

    useEffect(() => {
        async function getNFTs() {
            const nftlist = await Promise.all(
                accounts.map(async (account, index) => {
                    const res = await account.generateWallet(secrets[index])
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

    }, []);

    useEffect(() => {
        console.log('NFTs: ', nfts)

    })


    return (
        <div className="UserNFTGallery mt-10 flex flex-col mx-10">
            <h1>NFT Marketplace</h1>
            <div className="w-full inline-block p-3 align-middle rounded-md shadow-md">
                {!!nfts.length ? (
                    <ImageList
                        sx={{ height: 650 }}
                        variant="quilted"
                        cols={3}
                        rowHeight={200}
                    >
                        {nfts.map((nft: NFTokenMint, idx) =>
                            nft.URI ? (
                                <ImageListItem key={getNftMetadata(nft.URI).url + idx}>
                                    <img
                                        src={getNftMetadata(nft.URI).url}
                                        alt="alt"
                                        style={{ maxWidth: '400px' }}
                                    />
                                    <ImageListItemBar
                                        title={getNftMetadata(nft.URI).author}
                                        position="below"
                                    />
                                    {/* <Button variant="contained" onClick={purchaseNFT}>Buy</Button> */}

                                </ImageListItem>
                            ) : null
                        )}
                    </ImageList>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    );
}

export default NFTMarketplace;