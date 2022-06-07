

const EmptyState = () => {
    return (
        <div className="mt-8">
            <h2 className="mb-4">Nothing is here. You have not created any NFTs ¯\_(ツ)_/¯</h2>
            <button type="button" className="bg-blue-400 py-3 px-4 rounded-md text-white hover:bg-blue-500 hover:ring-1 focus:ring-1 focus:ring-offset-1 focus:border-2">Create NFT</button>
        </div>
    )
}

export default EmptyState;