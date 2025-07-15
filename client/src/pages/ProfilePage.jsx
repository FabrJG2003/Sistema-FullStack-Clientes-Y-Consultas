import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ChevronDoubleRightIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import Modal from '../components/Modal';

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [ showEditName, setShowEditName ] = useState(false);
  const [ showEditPassword, setShowEditPassword ] = useState(false);

  const [ newName, setNewName ] = useState(user?.username || "");
  const [ newPassword, setNewPassword ] = useState("");

  const navigate = useNavigate();

  const handleSaveName = async () => {
    if (!newName || newName.trim() === "") return alert("El nombre no puede estar vacío.")
    const result = await updateUser(user.id || user._id, { username: newName });
    if (result.success) { 
      setShowEditName(false);
      console.log("Hola6")
      navigate('/profile', {state: {reload: true}})
    } else {
      console.log("Hola7")
      alert(result.message || "Error al actualizar el nombre de usuario.")
    }
  }
  const handleSavePassword = async () => {
    if (!newPassword || newPassword.length < 4) return alert("La contraseña debe tener al menos 6 caracteres.")
    const result = await updateUser(user.id || user._id, {password: newPassword});
    if (result.success) {
      setShowEditPassword(false);
      setNewPassword("");
    } else {
      alert(result.message || "Error al actualizar la contraseña.")
    }
  }

  return (
    <>
      {user?.type_User === 'Gerente' ? 
        <>
          {console.log(user)}
          <div className='py-4 flex items-center justify-between'>
            <h1 className='text-4xl font-bold font-Roboto'>Perfil de Usuario</h1>
            <div className="flex items-center px-4">
              <p className="px-2 justify-end text-cyan-700 font-semibold">
              <Link to='/home'>R&N Estudio Contable</Link>
              </p>
              <img
                src="../images/logo_empresa_192.png"
                alt="logo"
                className="w-10 h-10"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
            <div> {/*1ra Columna*/}
              <div>
                <label className="text-lg font-bold font-Inter">Nombre: </label>
                <div className='flex'>
                  <div className="flex items-center px-4">
                    <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
                    <p className="text-lg font-Roboto">{user.username}</p>
                  </div>
                  <div className='flex px-4'>
                    <button onClick={() => setShowEditName(true)} className='border-2 border-cyan-700 py-1 px-4 rounded-lg bg-white
                      hover:bg-gray-200 transition-colors duration-200 text-cyan-700
                      font-medium'>Editar</button>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <label className="text-lg font-bold font-Inter">Correo Electrónico:</label>
                <div className="flex items-center px-4">
                  <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
                  <p className="text-lg font-Roboto">{user.email}</p>
                </div>
              </div>
              <div className="pt-6">
                <label className="text-lg font-bold font-Inter">Rol de Usuario:</label>
                <div className="flex items-center px-4">
                  <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
                  <p className="text-lg font-Roboto">{user.type_User}</p>
                </div>
              </div>
            </div>
            <div> {/*2da Columna*/}
              <div>
                <label className="text-lg font-bold font-Inter">Contraseña: </label>
                <div className='flex'>
                  <div className="flex items-center px-4">
                    <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
                    <p className="text-lg font-Roboto font-medium">*********</p>
                  </div>
                  <div className='flex px-4'>
                    <button onClick={() => setShowEditPassword(true)} className='border-2 border-cyan-700 py-1 px-4 rounded-lg bg-white
                      hover:bg-gray-200 transition-colors duration-200 text-cyan-700
                      font-medium'>
                        Cambiar Contraseña
                    </button>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <label className="text-lg font-bold font-Inter">Fecha de Registro: </label>
                <div className="flex items-center px-4">
                  <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
                  <p className="text-lg font-Roboto">{new Date(user.date).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title="Editar Nombre"
            isOpen={showEditName}
            onClose={() => setShowEditName(false)}
            className = ''
          >
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-2 p-2 w-full mb-4 border-cyan-700 rounded-lg focus:outline-none"
            />
            <div className='w-full flex justify-center pt-2'>
              <button
                onClick={handleSaveName}
                className="w-2/3 flex bg-cyan-700 text-white font-medium px-4 py-2
                  rounded hover:bg-cyan-800 transition-colors duration-300 justify-center"
              >
                Guardar
              </button>
            </div>
          </Modal>
          <Modal
            title="Cambiar Contraseña"
            isOpen={showEditPassword}
            onClose={() => setShowEditPassword(false)}
            className = ''
          >
            <input
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-2 p-2 w-full mb-4 border-cyan-700 rounded-lg focus:outline-none"
            />
            <div className='w-full flex justify-center pt-2'>
              <button
                onClick={handleSavePassword}
                className="w-2/3 flex bg-cyan-700 text-white font-medium px-4 py-2
                  rounded hover:bg-cyan-800 transition-colors duration-300 justify-center"
              >
                Guardar Nueva Contraseña
              </button>
            </div>
          </Modal>
        </> : 
        <>
        </>
      }
    </>
  );
}

export default ProfilePage;