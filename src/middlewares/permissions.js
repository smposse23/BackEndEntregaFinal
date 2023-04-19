export const checkLogin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.json({
      message: "Debes estar logueado para poder acceder a esta ruta",
    });
  }
};

export const checkAdminRole = (req, res, next) => {
  if (req.user.permission == "Admin") {
    next();
  } else {
    res.json({
      message:
        "Debe estar logueado y tener permiso de Administrador para acceder a esta ruta",
    });
  }
};
