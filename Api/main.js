import express from 'express'
import cors from 'cors'
import { transporter } from './mail.js'
import { UserModel } from './db.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola! Como estas! Todo bien?')
})

app.get('/loginUser', async (req, res) => {
  const { usernameUsuario, passwordUsuario } = req.query
  try {
    const user = { usernameUsuario, passwordUsuario }
    const response = await UserModel.getUser({ user })

    if (response.message) { throw new Error(response.message) }

    res.send({ info: response })
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message })
  }
})

app.post('/registUser', async (req, res) => {
  const { user } = req.body

  try {
    if (!user) { throw new Error('No se logro captar la informacion del usuario') }
    const response = await UserModel.registUser({ user })
    res.send({ info: response })
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message })
  }
})

app.post('/sendEmail', async (req, res) => {
  const { email } = req.body
  try {
    console.log(process.env.USER_GMAIL,
      process.env.PASS_GMAIL)
    const response = await transporter.sendMail({
      from: 'Code Guru',
      to: email,
      subject: 'Esto es una prueba',
      html: '<h1>HOLA MUNDO</h1>'
    })
    res.send({ status: 'OK', response })
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message })
  }
})

app.put('/verifiEmail', async (req, res) => {
  const { userId } = req.query

  try {
    const response = await UserModel.verifyUser(userId)
    console.table(response)
    if (response.message) { throw new Error(response.message) }
    res.send({ info: response })
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message })
  }
})

app.listen(3000, () => {
  console.log('El servidor esta escuchando en el puerto http://localhost:3000')
})
