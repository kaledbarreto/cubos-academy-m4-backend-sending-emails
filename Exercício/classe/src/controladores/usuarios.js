const knex = require('../conexao')
const nodemailer = require('../nodemailer');

const cadastrarUsuario = async (req, res) => {
    const { nome, email } = req.body;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório");
    }

    if (!email) {
        return res.status(404).json("O campo email é obrigatório");
    }

    try {
        const emailExiste = await knex('usuarios').where({ email }).first();

        if (emailExiste) {
            return res.status(400).json("O email já existe");
        }

        const emailCadastrado = await knex('usuarios').insert({ email, nome });

        if (!emailCadastrado) {
            return res.status(400).json("O email não foi cadastrado.");
        }

        return res.status(200).json("O usuario foi cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const enviarEmail = async (req, res) => {
    const { texto } = req.body;

    if (!texto) {
        return res.status(404).json("O campo email é obrigatório.");
    }

    try {
        const emails = await knex('usuarios');

        for (const email of emails) {
            const dadosEnvio = {
                from: 'Kaled Barreto <kaledbarreto@gmail.com>',
                to: email.email,
                subject: 'Newsletter',
                template: 'newsletter',
                context: {
                    nome: email.nome,
                    texto
                }
            }

            nodemailer.sendMail(dadosEnvio);
        }

        return res.status(200).json('Newsletter Enviada! :)')
    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports = {
    cadastrarUsuario,
    enviarEmail
}