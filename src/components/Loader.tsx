
const Loader = ({ loading }) => {
  if (!loading) return null
  return (
    <div className="loader sp sp-circle" style={{ display: 'block' }}
    ></div>
  )
}

export default Loader