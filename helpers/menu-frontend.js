
const getMenuFrontEnd = ( role = 'USER_ROLE') => {

    const menu = [
        {
          titulo: 'Principal',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Main', url: '/'},
            { titulo: 'ProgressBar', url: 'progress'},
            { titulo: 'Gráficas', url: 'grafica1'},
            { titulo: 'Promesas', url: 'promesas'},
            { titulo: 'Rxjs', url: 'rxjs'},
    
          ]
        },{
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo: 'Usuario', url: 'usuarios'},
            { titulo: 'Hospitales', url: 'hospitales'},
            { titulo: 'Medicos', url: 'medicos'}
    
          ]
        },
      ];
      //Si es administrador añadimos el mantenimiento de usuario
      if ( role === 'ADMIN_ROLE' ) {
          menu[1].submenu.unshift({ titulo: 'Usuario', url: 'usuarios'})
      }

      return menu;
}

module.exports = {
    getMenuFrontEnd
}
