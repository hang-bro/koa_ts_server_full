import defautImg from '@/assets/images/default.png'

const useErrorImg = (e: Event, src = defautImg) => {
  ;(e.target as HTMLImageElement).src = src
}

export default useErrorImg
