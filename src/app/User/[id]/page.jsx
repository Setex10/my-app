function Usuarios() {
    import "/.usuarios.css";
  return (
    <div>
      <h1>Usuarios</h1>

      <div>
        <div>
          <p><strong>Name:</strong> Juan Perez</p>
          <p><strong>Role:</strong> Admin</p>
          <p><strong>Email:</strong> juan@email.com</p>

          <button>Editar</button>
          <button>Eliminar</button>
        </div>

        <hr />

        <div>
          <p><strong>Name:</strong> Maria Lopez</p>
          <p><strong>Role:</strong> Usuario</p>
          <p><strong>Email:</strong> maria@email.com</p>

          <button>Editar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;