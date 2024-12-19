# Sistema de Citas Médicas

Este repositorio contiene el frontend de un sistema de citas médicas desarrollado con **React.js** y **Bootstrap**. El backend, que es una API desarrollada en **Spring Boot**, se encuentra en otro repositorio: [API MedMeet](https://github.com/patinodeveloper/MedMeet---Medical-Appointments-API.git).

## Módulos del Sistema

El sistema cuenta con los siguientes módulos:

- **Pacientes**: Para gestionar los datos de los pacientes.
- **Doctores**: Para gestionar la información sobre los médicos disponibles.
- **Especialidades**: Cada doctor puede tener asignadas una o más especialidades.
- **Horarios**: Aunque aún no está completamente funcional, permite agregar, modificar y eliminar horarios de los doctores.
- **Citas**: Permite la gestión de las citas médicas.

## Características Técnicas

- **React.js**: Utilizado para construir la interfaz de usuario.
- **Bootstrap**: Para la maquetación y el diseño de la aplicación.
- **SweetAlert2**: Para mostrar alertas y mensajes personalizados de forma elegante.
- **React Router**: Para la navegación entre las distintas páginas de la aplicación.
- **Hooks personalizados**: Para manejar el estado y la lógica de manera eficiente.
- **Reducers, Context y Provider**: Implementados para la gestión global del estado de la aplicación, asegurando un flujo de datos claro y organizado.
- **Buenas prácticas**: El código está estructurado siguiendo buenas prácticas para asegurar la mantenibilidad y escalabilidad de la aplicación.

## Capturas de Pantalla

Aquí hay algunas capturas de pantalla de la aplicación en funcionamiento:

### Pantalla de Inicio
![Pantalla de Inicio](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642091/Captura_desde_2024-12-19_14-14-39_fll6xs.png)

### Gestión de Doctores

En esta sección puedes gestionar la información de los doctores. Todas las acciones principales están disponibles: buscar, mostrar, insertar, editar y eliminar registros. Estas funcionalidades están implementadas de manera consistente en todas las páginas del sistema, brindando una experiencia uniforme para la gestión de datos.

- **Vista General de Gestión de Doctores**  
  ![Gestión de Doctores](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642092/Captura_desde_2024-12-19_14-15-21_sudpix.png)

- **Buscar un Doctor**  
  ![Buscar Doctor](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642097/Captura_desde_2024-12-19_14-20-14_h58sod.png)

- **Insertar un Doctor**  
  ![Insertar Doctor](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642092/Captura_desde_2024-12-19_14-17-15_y86iwz.png)

  - **Mensaje de Éxito con SweetAlert2**  
    ![Mensaje de Inserción Exitosa](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642093/Captura_desde_2024-12-19_14-17-22_bidkqp.png)

  - **Validación de Campos**  
    ![Validación de Campos](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642097/Captura_desde_2024-12-19_14-19-58_wkorbi.png)

- **Eliminar un Doctor**  
  ![Eliminar Doctor](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642096/Captura_desde_2024-12-19_14-17-57_gvrz4w.png)

- **Actualizar un Doctor**  
  ![Actualizar Doctor](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642094/Captura_desde_2024-12-19_14-17-44_eb9gxb.png)

---

### Gestión de Especialidades

En esta sección puedes administrar las especialidades de los doctores. Puedes realizar operaciones como buscar, mostrar, insertar, editar y eliminar especialidades de manera sencilla y efectiva.

- **Vista General de Gestión de Especialidades**  
  ![Gestión de Especialidades](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642099/Captura_desde_2024-12-19_14-21-05_n4i6sq.png)

---

### Gestión de Pacientes

Esta sección permite la gestión de la información de los pacientes. Puedes buscar, mostrar, insertar, editar y eliminar datos de pacientes con las mismas acciones disponibles en las demás páginas.

- **Vista General de Gestión de Pacientes**  
  ![Gestión de Pacientes](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642099/Captura_desde_2024-12-19_14-20-59_zyaco5.png)

---

### Gestión de Citas

Aquí puedes gestionar las citas médicas programadas, lo que incluye buscar, mostrar, insertar, editar y eliminar citas. Esta funcionalidad centraliza la administración de los eventos entre pacientes y doctores.

- **Vista General de Gestión de Citas**  
  ![Gestión de Citas](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642101/Captura_desde_2024-12-19_14-21-20_f6ul6j.png)

---

### Gestión de Horarios (NO IMPLEMENTADA)

En esta sección puedes gestionar los horarios de los doctores. Aunque las operaciones como buscar, mostrar, insertar, editar y eliminar están disponibles, esta funcionalidad aún no está implementada completamente. Es decir, no afecta ni beneficia otras funcionalidades del sistema actualmente.

- **Vista General de Gestión de Horarios**  
  ![Gestión de Horarios](https://res.cloudinary.com/dtncgfvxw/image/upload/v1734642100/Captura_desde_2024-12-19_14-21-15_igzs8m.png)

## Instalación

Para instalar y correr el proyecto en tu máquina local, sigue estos pasos:

1. Clona el repositorio:
```
git clone https://github.com/patinodeveloper/MedMeet-FrontEnd.git
```

2. Instala las dependencias:
```
npm install
```

4. Inicia el servidor de desarrollo:
```
npm run dev
```

5. Abre el navegador en `http://localhost:5173` para ver la aplicación en funcionamiento.

