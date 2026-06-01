import BackButton from '../shared/backButton'

const EventsBanner = () => {
  return (
    <div className="my-40 relative pb-7">
      <div className="container">
        <div className="backButtonSection mb-6">
          <BackButton />
        </div>
        <div className="flex flex-col items-center justify-start gap-4">
          <h1
            className="text-[100px] md:text-[150px] font-bold font-Apex text-center tracking-[6px] uppercase"
            style={{ color: 'var(--primary)' }}
          >
            Events
          </h1>
          <p className="text-center max-w-[600px] font-Roboto" style={{ color: 'var(--text-muted)' }}>
            Discover upcoming NFT drops, launches, collaborations, and community events across the Fry ecosystem.
          </p>
        </div>
      </div>
    </div>
  )
}

export default EventsBanner
