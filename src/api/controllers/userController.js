const User = require('../../models/User');

exports.createUser = async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;

    const userExists = await User.findOne({
      $or: [{ email }, { cpf }],
    });

    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já cadastrado com este email ou CPF',
      });
    }

    const user = await User.create({
      nome,
      cpf,
      email,
      senha,
    });

    user.senha = undefined;

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message || 'Erro ao criar usuário',
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-senha');

    return res.status(200).json({
      quantidade: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro ao buscar usuários',
      detalhes: error.message,
    });
  }
};
