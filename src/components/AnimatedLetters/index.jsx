import './index.scss'

const AnimatedLetters = ({ letterClass, strArray, idx }) => (
  <span>
    {strArray.map((char, i) => (
      <span key={char + i} className={`${letterClass} _${i + idx}`}>
        {char === ' ' ? ' ' : char}
      </span>
    ))}
  </span>
)

export default AnimatedLetters
