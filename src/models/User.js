const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Nome é obrigatório'],
    },
    cpf: {
      type: String,
      required: [true, 'CPF é obrigatório'],
      unique: true,
      validate: {
        validator: function (cpf) {
          return /^\d{11}$/.test(cpf);
        },
        message: 'CPF inválido',
      },
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /\S+@\S+\.\S+/.test(email);
        },
        message: 'Email inválido',
      },
    },
    senha: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: 6,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Criptografa a senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
