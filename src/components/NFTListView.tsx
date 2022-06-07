import * as React from 'react';
import { AccountNFTsResponse, Wallet } from 'xrpl';

interface NFTListViewProps {
    mintedNFTs: AccountNFTsResponse["result"]["account_nfts"] | [];
}

const NFTListView: React.FC<NFTListViewProps> = (props) => {
    const { mintedNFTs } = props;

    return (
        <div className="mt-8 flex flex-col mx-8">
            <div className="w-full inline-block py-2 align-middle rounded-md shadow-md">
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-2 px-2 font-semibold text-gray-700">Issuer</th>
                            <th className="py-2 px-2 font-semibold text-gray-700">NFTokenID</th>
                            {/* <th className="py-2 px-2 font-semibold text-gray-700">NFToken Taxon</th> */}
                            <th className="py-2 pl-2 pr-4 font-semibold text-gray-700">URI</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                        {mintedNFTs.map((nft) => (
                            <tr key={nft.Issuer}>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500">{nft.Issuer}</td>
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500">{nft.NFTokenID}</td>
                                {/* <td className="whitespace-nowrap py-4 text-sm text-gray-500">{nft.NFTokenTaxon}</td> */}
                                <td className="whitespace-nowrap py-4 text-sm text-gray-500">{nft.URI ? nft.URI : 'URI is unavailable for this NFT'}</td>
                                {/* <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-500">
                                    <button className="uppercase">Buy</button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NFTListView
