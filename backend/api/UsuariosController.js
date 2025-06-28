import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Usuario from '../models/Usuarios.js';

dotenv.config();

class UsuariosController {

async postIdiomaUsuario(req, res) {
  try {
    const { providerId, language } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!providerId || !language) {
      return res.status(400).json({ message: 'providerId y language son requeridos' });
    }

    // Validar que el idioma esté en los valores permitidos
    const validLanguages = ['es', 'en', 'fr', 'pt'];
    if (!validLanguages.includes(language)) {
      return res.status(400).json({ message: 'Idioma no válido' });
    }

    // Buscar y actualizar el usuario
    const updatedUser = await Usuario.findOneAndUpdate(
      { providerId }, // Condición para encontrar al usuario
      { language },   // Actualizar solo el campo language
      { new: true, runValidators: true } // Retornar el documento actualizado y validar
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Idioma actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar el idioma:', error);
    return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
}

  async postNuevoUsuario(req, res) {
    try {
      const {
        name,
        email,
        password,
        gender,
        country,
        provider,
        providerId,
        avatar = '',
        categories = [],
        language = 'es'
      } = req.body;

      // Si el proveedor es 'email', usamos el email como providerId
      const finalProviderId = provider === 'email' ? email : providerId;

      // Validación básica
      if (!name || !email || !password || !gender || !country) {
        return res.status(400).json({ message: 'Faltan campos requeridos.' });
      }

      // Verificar si ya existe por email o providerId
      const usuarioExistente = await Usuario.findOne({
        $or: [
          { email },
          ...(finalProviderId ? [{ providerId: finalProviderId }] : [])
        ]
      });

      if (usuarioExistente) {
        return res.status(409).json({ message: 'Ya existe un usuario con ese email o providerId.' });
      }

      // Encriptar contraseña si es registro clásico
      let hashedPassword = '';
      if (provider === 'email') {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      const nuevoUsuario = new Usuario({
        name,
        email,
        password: hashedPassword,
        gender,
        country,
        provider,
        providerId: finalProviderId,
        avatar,
        categories,
        language,
        createdAt: new Date()
      });

      await nuevoUsuario.save();

      return res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        usuario: {
          _id: nuevoUsuario._id,
          name: nuevoUsuario.name,
          email: nuevoUsuario.email
        }
      });

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ message: 'Error del servidor.' });
    }
  }
}

const usuariosController = new UsuariosController();
export default usuariosController;
