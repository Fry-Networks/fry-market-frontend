import BackButton from '../shared/backButton'

const LaunchpadBanner = () => {
  return (
    <div className="my-40 relative pb-7">
      <div className="container">
        <div className="backButtonSection mb-6">
          <BackButton />
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <h1
            className="text-[80px] md:text-[130px] font-bold font-Apex text-center tracking-[6px] uppercase"
            style={{ color: 'var(--primary)' }}
          >
            Launchpad
          </h1>
          <p className="text-center max-w-[600px] font-Roboto" style={{ color: 'var(--text-muted)' }}>
            Discover and participate in NFT launches with whitelist phases, public minting, and reveal mechanics.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LaunchpadBanner
