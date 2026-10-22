import { useEffect, useState } from 'react'
import { fetchPhotos } from './photos'

export default function usePhotos() {
  const [state, setState] = useState({ photos: [], loading: true, error: null })

  useEffect(() => {
    let alive = true
    fetchPhotos()
      .then((photos) => alive && setState({ photos, loading: false, error: null }))
      .catch((error) => alive && setState({ photos: [], loading: false, error }))
    return () => {
      alive = false
    }
  }, [])

  return state
}
