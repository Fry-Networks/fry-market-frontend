import { useEffect } from 'react'
import EventsBanner from '../components/events/eventsBanner'
import EventsList from '../components/events/eventsList'

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <EventsBanner />
      <EventsList />
    </div>
  )
}

export default Events
