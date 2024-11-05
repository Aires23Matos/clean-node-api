module.exports = () => {
  router.post('/singup', new SignUpRouter().route)
}

// camada Presentation
// signup-router
const express = require('express')
const router = express.Router()

class SignUpRouter {
  async route (req, res) {
    const { email, password, repeatPassword } = req.body
    new SignUpUseCase().signUp(email, password, repeatPassword)
    res.status(400).json({ error: 'password wait must be equal to repeatPassword' })
  }
}

// Domain


// signup-usecase

class SignUpUseCase {
  async signUp (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAcountRepository().add(email, password)
    }
  }
}

// Infra
// add account-repo
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAcountRepository {
  async add (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
