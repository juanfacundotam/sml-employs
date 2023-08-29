const getAuthHandler = () => {
  try {
    (req, res) => {
      res.send('Secured Resource');
    }
  } catch (error) {
    res.send({ error: error.message })
  }
}
module.exports = { getAuthHandler }
