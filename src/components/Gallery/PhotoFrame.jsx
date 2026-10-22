import './PhotoFrame.scss'


// Shows the photo, or a sunset gradient placeholder until a real `src` is added.
const PhotoFrame = ({ photo, index = 0, className = '' }) => {
  if (photo.src) {
    return (
      <img
        className={`photo-frame ${className}`}
        src={photo.src}
        alt={photo.title}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className={`photo-frame placeholder theme-${(index % 5) + 1} ${className}`}
      role="img"
      aria-label={`${photo.title} (placeholder)`}
    />
  )
}

export default PhotoFrame
