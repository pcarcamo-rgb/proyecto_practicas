import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
  host: process.env.HOST_DATABASE,
  user: process.env.USER_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.MAIN_DATABASE

})

export class UserModel {
  static async registUser ({ user }) {
    try {
      const [results, fields] = await connection.promise().query('INSERT INTO Usuario SET ?', [user])
      if (results[0] instanceof Error) {
        throw new Error(results[0].message)
      }
      return ({ status: 'OK', result: results, field: fields })
    } catch (e) {
      return ({ status: 'ERROR', message: e.message })
    }
  }

  static async verifyUser (idUser) {
    try {
      const [results] = await connection.promise().query('UPDATE Usuario SET usuarioBaja = 0 WHERE idUsuario = ?', [idUser])
      return { result: results }
    } catch (e) {
      return { status: 'ERROR', message: e.message }
    }
  }

  static async getUser ({ user }) {
    const { usernameUsuario, passwordUsuario } = user
    // eslint-disable-next-line no-useless-catch
    try {
      const [rows, fields] = await connection.promise().query('SELECT * from Usuario where usernameUsuario = ? AND passwordUsuario = ?', [usernameUsuario, passwordUsuario])
      if (rows.length === 0) { throw new Error('NO SE ENCONTRARON USUARIOS') }
      if (rows[0].usuarioBaja === 1) { throw new Error('USUARIO SIN VALIDAR EMAIL') }
      return ({ status: 'OK', row: rows, field: fields })
    } catch (e) {
      return ({ status: 'ERROR', message: e.message })
    }
  }
}
