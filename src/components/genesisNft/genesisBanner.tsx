import BackButton from '../shared/backButton'

const GenesisBanner = () => {
  return (
    <div className="my-40 relative pb-7">
      <div className="container">
        <div className="backButtonSection mb-6">
          <BackButton />
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <h1
            className="text-[70px] md:text-[120px] font-bold font-Apex text-center tracking-[6px] uppercase"
            style={{ color: 'var(--primary)' }}
          >
            Genesis NFT
          </h1>
          <p className="text-center max-w-[700px] font-Roboto" style={{ color: 'var(--text-muted)' }}>
            The Fry Networks Genesis NFT collection — 1,000 unique pieces granting holders access to epoch-based FRY reward distributions.
          </p>
          <div className="flex items-center gap-6 mt-2">
            <div className="text-center">
              <span className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
                1,000
              </span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Supply</p>
            </div>
            <div
              className="w-px h-10"
              style={{ background: 'var(--border-color)' }}
            />
            <div className="text-center">
              <span className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
                175
              </span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>USDC Mint Price</p>
            </div>
            <div
              className="w-px h-10"
              style={{ background: 'var(--border-color)' }}
            />
            <div className="text-center">
              <span className="text-2xl font-bold font-Apex" style={{ color: 'var(--text-primary)' }}>
                ARC-72
              </span>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Standard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenesisBanner
