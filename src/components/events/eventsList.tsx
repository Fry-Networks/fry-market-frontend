import { Icon } from '@iconify/react'
import { Select, Tag } from 'antd'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useChain } from '../../contexts/ChainContext'
import Loader from '../Loader'

const baseUrl = import.meta.env.VITE_API_BASE_URL

export interface MarketEvent {
  _id: string
  title: string
  description: string
  event_type: 'drop' | 'launch' | 'collab' | 'community'
  chain_id: string
  start_date: string
  end_date: string
  image_url?: string
  creator_wallet?: string
  featured_nfts?: string[]
  featured_collections?: string[]
  participation_url?: string
  status: 'upcoming' | 'live' | 'ended'
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  drop: 'magenta',
  launch: 'blue',
  collab: 'purple',
  community: 'green',
}

const EVENT_TYPE_ICONS: Record<string, string> = {
  drop: 'material-symbols:parachute',
  launch: 'material-symbols:rocket-launch',
  collab: 'material-symbols:handshake',
  community: 'material-symbols:groups',
}

const EventCard = ({ event }: { event: MarketEvent }) => {
  const startDate = new Date(event.start_date)
  const endDate = new Date(event.end_date)
  const now = new Date()
  const isLive = now >= startDate && now <= endDate
  const isUpcoming = now < startDate

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div
        className="h-[180px] relative flex items-center justify-center"
        style={{
          background: event.image_url
            ? `url(${event.image_url}) center/cover`
            : 'linear-gradient(135deg, var(--primary) 0%, #ff6b6b 100%)',
        }}
      >
        <div className="absolute top-3 left-3 flex gap-2">
          <Tag color={EVENT_TYPE_COLORS[event.event_type]}>
            <Icon icon={EVENT_TYPE_ICONS[event.event_type]} width={14} height={14} className="inline mr-1" />
            {event.event_type.toUpperCase()}
          </Tag>
          {isLive && <Tag color="red">LIVE</Tag>}
          {isUpcoming && <Tag color="orange">UPCOMING</Tag>}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-Apex text-lg uppercase mb-2" style={{ color: 'var(--text-primary)' }}>
          {event.title}
        </h3>
        <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
          {event.description}
        </p>

        <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-1">
            <Icon icon="material-symbols:calendar-month" width={16} height={16} />
            <span>
              {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="material-symbols:schedule" width={16} height={16} />
            <span>
              {startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {event.participation_url && (
          <a
            href={event.participation_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
            style={{ color: 'var(--primary)' }}
          >
            Participate <Icon icon="material-symbols:arrow-outward" width={14} height={14} />
          </a>
        )}
      </div>
    </div>
  )
}

const EventsList = () => {
  const { chainId } = useChain()
  const [events, setEvents] = useState<MarketEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/events`, {
        params: { chain_id: chainId },
      })
      setEvents(response.data || [])
    } catch {
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [chainId])

  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.event_type === filter)

  return (
    <div className="container pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-Apex text-2xl uppercase" style={{ color: 'var(--text-primary)' }}>
          All Events
        </h2>
        <Select
          value={filter}
          onChange={setFilter}
          style={{ width: 160 }}
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'drop', label: 'Drops' },
            { value: 'launch', label: 'Launches' },
            { value: 'collab', label: 'Collaborations' },
            { value: 'community', label: 'Community' },
          ]}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader />
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20" style={{ color: 'var(--text-muted)' }}>
          <Icon icon="material-symbols:event-busy" width={64} height={64} className="mb-4 opacity-40" />
          <p className="text-lg font-Apex uppercase">No events found</p>
          <p className="text-sm mt-2">Check back later for upcoming events on this chain.</p>
        </div>
      )}
    </div>
  )
}

export default EventsList
