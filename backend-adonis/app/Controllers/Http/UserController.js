'use strict'
const User = use("App/Models/User");

class UserController {
    async register({ request, auth, response }) {
        try {
          const { email, password } = request.body;
    
          if (!email || !password) {
            return response.status(400).send({
              status: "error",
              message: "É preciso informar email e senha.",
            });
          }
    
          // If theres no users on the table the first one will be the admin
          let user = await User.first();
    
          let is_admin = user ? false : true;
    
          // Check if current user is admin before creating
          if (user && !auth.user?.is_admin) {
            return response.status(403).send({
              message: "Não autorizado.",
            });
          }
    
          const userExists = await User.findBy("email", email);
          if (userExists) {
            return response.status(400).send({
              status: "error",
              message: "E-mail em uso.",
            });
          }
    
          user = new User();
          user.email = email;
          user.password = password;
          user.is_admin = is_admin;
          if (auth.user?.is_admin) {
            user.is_admin = request.body.is_admin;
          }
    
          await user.save();
          return response.status(200).json({
            message: "Conta criada com sucesso.",
          });
        } catch (error) {
          console.log(error.message);
          return response.status(403).json({
            status: "error",
            debug_error: error.message,
            message: 'Erro interno no servidor.'
          });
        }
      }
    
      async login({ request, auth, response }) {
        const { email, password } = request.all();
        try {
          let token = await auth.attempt(email, password);
          let user = await User.findBy({ email });
          user = user.toJSON();
    
          let { is_admin } = user;
    
          return response.status(200).json({
            token: token.token,
            user: { email, is_admin },
          });
        } catch (error) {
          console.log(error.message);
          response.status(403).json({
            message: 'E-mail ou senha inválidos.',
          });
        }
      }
}

module.exports = UserController
