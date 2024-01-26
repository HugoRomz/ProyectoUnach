
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://es.catalat.org/wp-content/uploads/2019/09/universidad-autonoma-de-chiapas.png" alt="Logo" width="200" height="200">
  </a>

  <h2 align="center">SISTEMA DE GESTIÓN DE ACTIVIDADES ACADÉMICO-ADMINISTRATIVAS</h2>
  <br>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenido</summary>
  <ol>
    <li>
      <a href="#about-the-project">Acerca del Proyecto</a>
      <ul>
        <li><a href="#built-with">Construido con</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Pre requisitos</a></li>
        <li><a href="#installation">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#usage">¿Como usar?</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

El objetivo es desarrollar el sistema de gestión de actividades académico-administrativas de las áreas de Tutorías, coordinación de carrera de LIDTS, coordinación de Investigación y secretaría académica.
<br><br>
*  En lo que respecta a Tutorías, se debe de llevar el control de las actividades que son programadas dentro del Programa de Orientación Profesional(POP), que incluye conferencias, platicas, talleres, ferias de empleo, actividades de emprendimiento, entre otras, en el cual participan los estudiantes de los dos programas de estudio que se ofertan. Los datos que se pretenden almacenar son: grupo que se atiende, carrera, semestre, ciclo escolar, fecha, personas organizadoras, lista de asistencia, constancias.
<br><br>
*  En cuanto a la coordinación de investigación, se almacenarán los datos referentes a los proyectos que son registrados por la plantilla docente de la facultad, datos como: título del proyecto, líder, colaboradores, fecha de registro, fecha de inicio del proyecto, fecha de fin, recurso humano en formación, productos obtenidos, ciclo escolar en que se registró, línea de generación del conocimiento, estatus, recurso utilizado.
<br><br>
*  En el área de secretaría académica se apoyará con el desarrollo de una plataforma que permita almacenar los datos de los diferentes cursos y actividades que desarrolla cada docente. Por ejemplo: licenciatura que tiene, maestría, doctorado, especialidad, certificaciones, cursos pedagógicos y disciplinares tomados, participación en congresos, cursos impartidos, artículos presentados, libros, capítulos de libro, etc.
<br><br>
*  En el área de coordinación de carrera, es necesario que se controlen las actividades de enseñanza-aprendizaje de cada docente en cada unidad académica, por lo que se requiere controlar el nombre del docente, la materia, el semestre, el período escolar, grupo, una muestra del examen con la calificación más baja, uno con calificación regular y uno con calificación alta, los apuntes de un estudiante de cada materia que imparte, porcentaje de avance de los contenidos de cada unidad de competencia, muestra de ejercicios y tareas de cada materia, entre otros. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

El desarrollo de este sistema se realizara utilizando la metodología scrum, y las tecnologías web utilizadas serán:
* [![Vue][Vue.js]][Vue-url]
* [![Node][nodejs.com]][nodejs-url]
* [![Tailwind][Tailwind.css]][Tailwind-url]
* [![Express][Express.com]][Express-url]
* [![MySQL][mysql.com]][mnysql-url]
* [![JQuery][JQuery.com]][JQuery-url]
* [![Sequelize][sequelize.com]][sequelize-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Aquí se muestra los pre requisitos y la manera de instalar el sistema de gestión.

### Prerequisites

* Instalar Node y Npm con NVM (Gestor de Versiones de Node) en LINUX
  <br>
 [https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

* Instalar Node y Npm con WINDOWS
  <br>
 [https://www.cursosgis.com/como-instalar-node-js-y-npm-en-4-pasos/](https://www.cursosgis.com/como-instalar-node-js-y-npm-en-4-pasos/)

* Instalar MYSQL
  <br>
 [https://dev.mysql.com/doc/refman/8.0/en/installing.html](https://dev.mysql.com/doc/refman/8.0/en/installing.html)



### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/HugoRomz/ProyectoUnach.git
   ```

2.- Importa la base de datos en tu gestor de Base datos y ponle como nombre sistema_gestion2

Para el Frontend:
* Instalar los paquetes de NPM
   ```sh
   npm install
   ```
* Correr el sistema.
   ```sh
   npm run dev
   ```

Para el Backend:
* Instalar los paquetes de NPM
   ```sh
   npm install
   ```
* Crear las carpeta public con sus respectivas subcarpetas.
   ```sh
   //Para windows
   npm run setup
   //Para linux
   npm run setuplinux
   ```
* Cambiar las variables del archivo db.config.js ubicada en la carpeta config/
   ```js
    const conexion = mysql.createConnection({
    host: 'tuhost',
    user: 'tuusuario',
    password: 'tucontraseña',
    //si tienes una version de Mac puedes que necesites
   //port: 'puerto-que-utiliza-tu-mysql'
    database: 'sistema_gestion2'
    });
   ```
* Correr el backend
   ```sh
   node app.js
   ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Para loguearte, puedes hacerlo con el administrador:
User: ABCE121212ABC
password: root


Usalo a tu modo jajaj, [AQUI se anexara el manual de usuario en un futuro]


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

HugoRomz - [@HugoRomz](www.linkedin.com/in/hugo-rafael-rosales-meléndez-581303193) - rafael.rosales1405@gmail.com
<br>
Joancy Perello - [@JoancyPerello](https://www.linkedin.com/in/joancy-perello-b5b420268)
<br>
Saul Altuzar - [@SaulAltuzar](https://www.facebook.com/profile.php?id=100003588176765)
<br>
Carlos Martinez - carlos.martinez96@unach.mx

Project Link: [https://github.com/your_username/repo_name](https://github.com/HugoRomz/ProyectoUnach.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: system.png
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[mysql.com]: https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white
[mnysql-url]: https://www.mysql.com/
[sequelize.com]: https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue
[sequelize-url]: https://sequelize.org/
[nodejs.com]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[nodejs-url]: https://nodejs.org/
[Express.com]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/

	


