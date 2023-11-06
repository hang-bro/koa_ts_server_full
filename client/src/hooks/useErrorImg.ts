import defautImg from '@/assets/images/default.png'

const useErrorImg = (e: Event, src = defautImg) => {
  ;(e.target as HTMLImageElement).src = src
  ;(e.target as HTMLImageElement).title = 'title'
  ;(e.target as HTMLImageElement).onerror = null
}

export default useErrorImg
