import {
  Client,
  ClientOptions,
  NFTokenBurn,
  NFTokenMint,
  NFTokenMintFlags,
  Payment,
  TxResponse,
  Wallet,
  xrpToDrops,
} from 'xrpl';

export class XrplClient {
  #client: Client;
  #wallet: Wallet | null;

  constructor(server: string, options?: ClientOptions) {
    this.#client = new Client(server, options);
    this.#wallet = null;

    this.connect();
  }

  public client = () => this.#client;
  public wallet = () => this.#wallet;

  private connect = (): Promise<void> => {
    if (this.#client.isConnected()) {
      return Promise.resolve();
    }

    return this.#client.connect();
  };

  public connectAndGetWallet = async (): Promise<Wallet> => {
    await this.connect();

    if (this.#wallet) {
      return Promise.resolve(this.#wallet);
    } else {
      return this.generateWallet();
    }
  };

  public generateWallet = async (fromSeed?: string): Promise<Wallet> => {
    await this.connect();

    if (fromSeed) {
      this.#wallet = Wallet.fromSeed(fromSeed);
    } else {
      // Instantiate a wallet, only for test and devnets. Currently doesn't seem to work for NFT-Devnet.
      const fundResult = await this.#client.fundWallet();
      this.#wallet = fundResult.wallet;
    }

    return this.#wallet;
  };

  public preparePayment = async (
    xrpAmount: number,
    destinationAddress: string
  ): Promise<Payment> => {
    const wallet = await this.connectAndGetWallet();

    return this.#client.autofill({
      TransactionType: 'Payment',
      Account: wallet.address,
      Amount: xrpToDrops(xrpAmount),
      Destination: destinationAddress,
    });
  };

  public sendPayment = async (
    xrpAmount: number,
    destinationAddress: string
  ): Promise<TxResponse> => {
    const wallet = await this.connectAndGetWallet();
    const preparedPayment = await this.preparePayment(
      xrpAmount,
      destinationAddress
    );
    const signed = wallet.sign(preparedPayment);

    return this.#client.submitAndWait(signed.tx_blob);
  };

  /**
   * Specifically mint a transferable NFT
   * {@link https://xrpl.org/nftokenmint.html}
   */
  public mintTransferableNft = async ({
    transferFee,
    URI,
  }: {
    transferFee?: number;
    URI?: string;
  } = {}): Promise<TxResponse> => {
    const wallet = await this.connectAndGetWallet();
    const nfTokenMintTxPayload: NFTokenMint = {
      TransactionType: 'NFTokenMint',
      Account: wallet.address,
      Flags: NFTokenMintFlags.tfTransferable,
      TokenTaxon: 0, // [To-Clarify] What is the practical use case of the TokenTaxon?

      /**
       * Issuer field also requires the AccountRoot to have the `MintAccount` field set to wallet.address.
       * This can be set through the {@link https://xrpl.org/accountset.html} AccountSet Tx.
       */
      // Issuer:     // [To-Clarify] What is the practical use case of having an Issuer account?
    };

    if (URI) {
      nfTokenMintTxPayload.URI = URI;
    }

    // Throw an error instead if desired. See NFTokenMint transaction in jsdoc to see TransferFee constraints.
    const isValidTransferFee =
      !!transferFee && transferFee >= 0 && transferFee <= 9999;
    if (isValidTransferFee) {
      nfTokenMintTxPayload.TransferFee = transferFee;
    }

    return this.#client.submitAndWait(nfTokenMintTxPayload, { wallet });
  };

  public viewOwnNfts = async () => {
    const wallet = await this.connectAndGetWallet();

    return this.#client.request({
      command: 'account_nfts',
      account: wallet.address,
    });
  };

  /**
   * {@link https://xrpl.org/nftokenburn.html}
   */
  public burnNft = async (tokenId: string): Promise<TxResponse> => {
    const wallet = await this.connectAndGetWallet();
    const burnNftTxPayload: NFTokenBurn = {
      TransactionType: 'NFTokenBurn',
      Account: wallet.address,
      TokenID: tokenId,
    };

    return this.#client.submitAndWait(burnNftTxPayload, { wallet });
  };
}