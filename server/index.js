const express = require('express')
const verifyProof = require('../utils/verifyProof')
const niceList = require('../utils/niceList.json')
const MerkleTree = require('../utils/MerkleTree')

const port = 1225

const app = express()
app.use(express.json())

const merkleTree = new MerkleTree(niceList)

const MERKLE_ROOT =
  'ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa'

app.post('/gift', (req, res) => {
  const body = req.body

  // TODO: prove that a name is in the list
  let isInTheList = false
  isInTheList = verifyProof(body.proof, body.name, MERKLE_ROOT)
  if (isInTheList) {
    res.send('You got a toy robot!')
  } else {
    res.send(`You are not  the list :(`)
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
