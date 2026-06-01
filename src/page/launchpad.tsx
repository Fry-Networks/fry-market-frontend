import { useEffect } from 'react'
import LaunchpadBanner from '../components/launchpad/launchpadBanner'
import LaunchpadList from '../components/launchpad/launchpadList'

const Launchpad = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <LaunchpadBanner />
      <LaunchpadList />
    </div>
  )
}

export default Launchpad
