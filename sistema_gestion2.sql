-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: sistema_gestion2
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actividadesEnsenanza`
--

DROP TABLE IF EXISTS `actividadesEnsenanza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividadesEnsenanza` (
  `idActEnsenanza` int NOT NULL AUTO_INCREMENT,
  `nombreAct` varchar(45) NOT NULL,
  `descripcionAct` varchar(255) NOT NULL,
  `tipoAct` int NOT NULL,
  `materia` int NOT NULL,
  `cicloEscolar` varchar(45) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idActEnsenanza`),
  KEY `fk_tipoAct_idx` (`tipoAct`),
  KEY `fk_materia_idx` (`materia`),
  CONSTRAINT `fk_materia` FOREIGN KEY (`materia`) REFERENCES `materia` (`idMateria`),
  CONSTRAINT `fk_tipoAct` FOREIGN KEY (`tipoAct`) REFERENCES `tipoActividad` (`idtipoActividad`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividadesEnsenanza`
--

LOCK TABLES `actividadesEnsenanza` WRITE;
/*!40000 ALTER TABLE `actividadesEnsenanza` DISABLE KEYS */;
INSERT INTO `actividadesEnsenanza` VALUES (17,'Taller de ciencias','fasfasdfasd',1,4,'2020-2021','3221-12-23'),(18,'Taller de ciencias','fasdfasd',1,4,'2020-2021','2023-11-25'),(19,'10 y 8','22222222222222',2,4,'2020-2021','2023-11-08'),(20,'efsdf','fsdafasdfdas',3,4,'2020-2021','2023-11-16'),(21,'fsdafasdfsda','fsadfasdfa',2,4,'2020-2021','2023-11-06'),(24,'fasfasfasd','fasdfasfda',2,4,'2020-2021','2023-10-31'),(28,'ffff','fffff',1,5,'2020-2021','2023-10-31'),(29,'fsadfsdafasdfasd','fasdfasdfasd',3,4,'2020-2021','2023-11-24'),(31,'efsdftrrrrrrrr','gsfdgsd',1,5,'2020-2021','2023-11-16'),(32,'fasdfasdfsd','fasdfasd',1,6,'2020-2021','2023-11-14'),(34,'Taller de ciencias22222','fasdfasdfasd2222222222',2,6,'Ago - Dic 2023','2024-06-17'),(35,'fasdfasdfsd','fsadfdas',2,9,'Ago - Dic 2023','2023-11-14');
/*!40000 ALTER TABLE `actividadesEnsenanza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actividadesTutorias`
--

DROP TABLE IF EXISTS `actividadesTutorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actividadesTutorias` (
  `idActTutorias` int NOT NULL AUTO_INCREMENT,
  `nombreActTutorias` varchar(45) NOT NULL,
  `descripcionActTutorias` varchar(255) NOT NULL,
  `fechaActTutorias` date NOT NULL,
  `prog_academico` int NOT NULL,
  PRIMARY KEY (`idActTutorias`),
  KEY `prog_academico_idx` (`prog_academico`),
  CONSTRAINT `prog_academico` FOREIGN KEY (`prog_academico`) REFERENCES `prog_academicos` (`idprog_academicos`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actividadesTutorias`
--

LOCK TABLES `actividadesTutorias` WRITE;
/*!40000 ALTER TABLE `actividadesTutorias` DISABLE KEYS */;
INSERT INTO `actividadesTutorias` VALUES (6,'Simposio22222222','xdfcsd2222222222222','2023-11-24',3);
/*!40000 ALTER TABLE `actividadesTutorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colaboradores`
--

DROP TABLE IF EXISTS `colaboradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colaboradores` (
  `id_colaborador` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `tipo` text NOT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id_colaborador`),
  UNIQUE KEY `id_colaborador` (`id_colaborador`),
  KEY `fk_id_proyecto_idx` (`id_proyecto`),
  CONSTRAINT `fk_id_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos_investigacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colaboradores`
--

LOCK TABLES `colaboradores` WRITE;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
INSERT INTO `colaboradores` VALUES (3,'fasdfasdfas','Docente',6),(4,'fsdafsadasd','Docente',6);
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_docente`
--

DROP TABLE IF EXISTS `detalle_docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_docente` (
  `id_Det_d` int NOT NULL AUTO_INCREMENT,
  `docente` varchar(45) NOT NULL,
  `materia` int NOT NULL,
  PRIMARY KEY (`id_Det_d`),
  KEY `fk_docente_idx` (`docente`),
  KEY `fk_materia_idx` (`materia`),
  CONSTRAINT `fk_docente` FOREIGN KEY (`docente`) REFERENCES `usuarios` (`rfc`),
  CONSTRAINT `fk_materiaDoc` FOREIGN KEY (`materia`) REFERENCES `materia` (`idMateria`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_docente`
--

LOCK TABLES `detalle_docente` WRITE;
/*!40000 ALTER TABLE `detalle_docente` DISABLE KEYS */;
INSERT INTO `detalle_docente` VALUES (38,'BEGA030412A4C',4),(43,'BEGA030412A4C',5),(45,'ABCE121212ABC',6),(46,'BEGA030412A4A',9);
/*!40000 ALTER TABLE `detalle_docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos_docentes`
--

DROP TABLE IF EXISTS `documentos_docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos_docentes` (
  `idDocumento` int NOT NULL AUTO_INCREMENT,
  `idSecretaria` int NOT NULL,
  `idTipoDocumento` int NOT NULL,
  `urlDocumento` char(255) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `nombreDoc` varchar(45) NOT NULL,
  PRIMARY KEY (`idDocumento`),
  KEY `idSecretaria` (`idSecretaria`),
  KEY `idTipoDocumento` (`idTipoDocumento`),
  CONSTRAINT `documentos_docentes_ibfk_1` FOREIGN KEY (`idSecretaria`) REFERENCES `secretariaAc` (`idSecretaria`),
  CONSTRAINT `documentos_docentes_ibfk_2` FOREIGN KEY (`idTipoDocumento`) REFERENCES `tipo_documento` (`idTipoDocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos_docentes`
--

LOCK TABLES `documentos_docentes` WRITE;
/*!40000 ALTER TABLE `documentos_docentes` DISABLE KEYS */;
INSERT INTO `documentos_docentes` VALUES (1,2,3,'fgda','1212-12-12','fasdjfask'),(2,2,4,'fasfd','1212-12-12','fasdfsda');
/*!40000 ALTER TABLE `documentos_docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidenciasEnsenanza`
--

DROP TABLE IF EXISTS `evidenciasEnsenanza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidenciasEnsenanza` (
  `idevidenciasE` int NOT NULL AUTO_INCREMENT,
  `nombreEvi` varchar(45) NOT NULL,
  `descripcionEvi` varchar(255) NOT NULL,
  `urlEvi` varchar(255) NOT NULL,
  `idActividad` int NOT NULL,
  PRIMARY KEY (`idevidenciasE`),
  KEY `fk_idActividad_idx` (`idActividad`),
  CONSTRAINT `fk_idActividad` FOREIGN KEY (`idActividad`) REFERENCES `actividadesEnsenanza` (`idActEnsenanza`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidenciasEnsenanza`
--

LOCK TABLES `evidenciasEnsenanza` WRITE;
/*!40000 ALTER TABLE `evidenciasEnsenanza` DISABLE KEYS */;
INSERT INTO `evidenciasEnsenanza` VALUES (27,'Primera evidencia222222222222222222','gdsgfs','/public/evidenciasEnsenanza/Evi-Ens-31-2023-11-08-f4ee1669-1fe6-4962-80b7-2d2344aa2aa8.png',31),(30,'fsadfasd','fasdfdas','/public/evidenciasEnsenanza/Evi-Ens-35-2023-11-15-56945ee5-1e5f-4ac3-a8f3-aeeab750756c.png',35),(31,'Primera evidencia222222222222222222','fsafasd','/public/evidenciasEnsenanza/Evi-Ens-34-2023-11-15-a561a221-428e-4cc7-a1dd-c8d36b45ebad.png',34);
/*!40000 ALTER TABLE `evidenciasEnsenanza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidenciasTutorias`
--

DROP TABLE IF EXISTS `evidenciasTutorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidenciasTutorias` (
  `idevidenciasT` int NOT NULL AUTO_INCREMENT,
  `nombreEvi` varchar(45) NOT NULL,
  `descripcionEvi` varchar(255) NOT NULL,
  `urlEvi` varchar(255) NOT NULL,
  `idActividad` int NOT NULL,
  PRIMARY KEY (`idevidenciasT`),
  KEY `idActividad_idx` (`idActividad`),
  CONSTRAINT `idActividad` FOREIGN KEY (`idActividad`) REFERENCES `actividadesTutorias` (`idActTutorias`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidenciasTutorias`
--

LOCK TABLES `evidenciasTutorias` WRITE;
/*!40000 ALTER TABLE `evidenciasTutorias` DISABLE KEYS */;
INSERT INTO `evidenciasTutorias` VALUES (28,'1211','fsdafasd','/public/evidenciasTutoria/Evi-Ens-6-2023-11-15-cd97dfda-4f2d-4051-8705-48f021ed2ef5.png',6);
/*!40000 ALTER TABLE `evidenciasTutorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evidencias_investigacion`
--

DROP TABLE IF EXISTS `evidencias_investigacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidencias_investigacion` (
  `id_evidencia` int NOT NULL AUTO_INCREMENT,
  `nombreEvi` text NOT NULL,
  `urlEvi` text NOT NULL,
  `id_proyecto` int DEFAULT NULL,
  PRIMARY KEY (`id_evidencia`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `evidencias_investigacion_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos_investigacion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidencias_investigacion`
--

LOCK TABLES `evidencias_investigacion` WRITE;
/*!40000 ALTER TABLE `evidencias_investigacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `evidencias_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materia`
--

DROP TABLE IF EXISTS `materia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materia` (
  `idMateria` int NOT NULL AUTO_INCREMENT,
  `nombreMateria` varchar(70) NOT NULL,
  `prog_academico` int NOT NULL,
  `semestre` int DEFAULT NULL,
  PRIMARY KEY (`idMateria`),
  KEY `fk_prog_academico_idx` (`prog_academico`),
  KEY `fk_semestre_idx` (`semestre`),
  CONSTRAINT `fk_prog_academico` FOREIGN KEY (`prog_academico`) REFERENCES `prog_academicos` (`idprog_academicos`),
  CONSTRAINT `fk_semestre` FOREIGN KEY (`semestre`) REFERENCES `semestre_grupo` (`is_SG`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materia`
--

LOCK TABLES `materia` WRITE;
/*!40000 ALTER TABLE `materia` DISABLE KEYS */;
INSERT INTO `materia` VALUES (4,'Sistemas Operativos',2,1),(5,'Programacion Avanzada',2,1),(6,'Contabilidad',3,1),(9,'Programacion',2,10);
/*!40000 ALTER TABLE `materia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `idPermisos` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPermisos`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'Super-Admin'),(2,'Enseñanza-Admin'),(3,'Enseñanza'),(4,'Tutorias'),(5,'Tutorias-Admin'),(6,'Investigacion'),(7,'Investigacion-Admin'),(8,'Secretaria'),(9,'Secretaria-Admin');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prog_academicos`
--

DROP TABLE IF EXISTS `prog_academicos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prog_academicos` (
  `idprog_academicos` int NOT NULL AUTO_INCREMENT,
  `nombreProg` varchar(70) NOT NULL,
  `nivel_estudios` varchar(35) NOT NULL,
  PRIMARY KEY (`idprog_academicos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prog_academicos`
--

LOCK TABLES `prog_academicos` WRITE;
/*!40000 ALTER TABLE `prog_academicos` DISABLE KEYS */;
INSERT INTO `prog_academicos` VALUES (2,'Licenciatura en Ingenieria en Desarrollo de Tecnologias y Software',''),(3,'Licenciatura en Contaduria','');
/*!40000 ALTER TABLE `prog_academicos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos_investigacion`
--

DROP TABLE IF EXISTS `proyectos_investigacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos_investigacion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `ciclo_escolar` text,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `linea_investigacion` text,
  `lider_de_proyecto` text,
  `estatus` int DEFAULT NULL,
  `recursos_utilizados` text,
  `tipo_de_recurso` text,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos_investigacion`
--

LOCK TABLES `proyectos_investigacion` WRITE;
/*!40000 ALTER TABLE `proyectos_investigacion` DISABLE KEYS */;
INSERT INTO `proyectos_investigacion` VALUES (4,'prueba1','Agosto - Diciembre','2023-11-23','2023-11-11','opcion b','Rafael',2,'fsdafasdfdsaf','Propio','2024-01-09 16:43:51'),(5,'prueba1','Agosto - Diciembre','2023-11-16','2023-12-02','opcion a','fasdfas',2,'fasfasdfdsa','Propio','2024-01-09 16:43:51'),(6,'HUgerwqwe','Enero - Junio','2023-11-17','2023-11-25','opcion a','fdasfasd',3,'fsdafasdfsafasfsda','Financiado','2024-01-09 16:43:51');
/*!40000 ALTER TABLE `proyectos_investigacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `secretariaAc`
--

DROP TABLE IF EXISTS `secretariaAc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `secretariaAc` (
  `idSecretaria` int NOT NULL AUTO_INCREMENT,
  `rfc` varchar(13) NOT NULL,
  `nivelEstudio` char(30) NOT NULL,
  `nombreInstitucion` char(255) NOT NULL,
  `areaEspecializacion` varchar(45) NOT NULL,
  PRIMARY KEY (`idSecretaria`),
  KEY `rfc` (`rfc`),
  CONSTRAINT `secretariaAc_ibfk_1` FOREIGN KEY (`rfc`) REFERENCES `usuarios` (`rfc`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `secretariaAc`
--

LOCK TABLES `secretariaAc` WRITE;
/*!40000 ALTER TABLE `secretariaAc` DISABLE KEYS */;
INSERT INTO `secretariaAc` VALUES (2,'BEGA030412A4C','Preparatoria','fsda55555','Ingenieria en sistemas'),(3,'BEGA030412A4C','Certificación Profesional','fsadfs','fasd'),(13,'BEGA030412A4C','Secundaria','fsda','Ingenieria en sistemas'),(23,'BEGA030412A4G','Secundaria','f','f');
/*!40000 ALTER TABLE `secretariaAc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semestre_grupo`
--

DROP TABLE IF EXISTS `semestre_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semestre_grupo` (
  `is_SG` int NOT NULL AUTO_INCREMENT,
  `semestre` varchar(35) NOT NULL,
  `grupo` varchar(35) NOT NULL,
  PRIMARY KEY (`is_SG`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semestre_grupo`
--

LOCK TABLES `semestre_grupo` WRITE;
/*!40000 ALTER TABLE `semestre_grupo` DISABLE KEYS */;
INSERT INTO `semestre_grupo` VALUES (1,'Primero','A'),(2,'Primero','B'),(3,'Primero','C'),(4,'Primero','D'),(5,'Primero','E'),(6,'Primero','F'),(7,'Primero','G'),(8,'Segundo','A'),(9,'Segundo','B'),(10,'Segundo','C'),(11,'Segundo','D'),(12,'Segundo','E'),(13,'Segundo','F'),(14,'Segundo','G'),(15,'Tercero','A'),(16,'Tercero','B'),(17,'Tercero','C'),(18,'Tercero','D'),(19,'Tercero','E'),(20,'Tercero','F'),(21,'Tercero','G'),(22,'Cuarto','A'),(23,'Cuarto','B'),(24,'Cuarto','C'),(25,'Cuarto','D'),(26,'Cuarto','E'),(27,'Cuarto','F'),(28,'Cuarto','G'),(29,'Quinto','A'),(30,'Quinto','B'),(31,'Quinto','C'),(32,'Quinto','D'),(33,'Quinto','E'),(34,'Quinto','F'),(35,'Quinto','G'),(36,'Sexto','A'),(37,'Sexto','B'),(38,'Sexto','C'),(39,'Sexto','D'),(40,'Sexto','E'),(41,'Sexto','F'),(42,'Sexto','G'),(43,'Septimo','A'),(44,'Septimo','B'),(45,'Septimo','C'),(46,'Septimo','D'),(47,'Septimo','E'),(48,'Septimo','F'),(49,'Septimo','G'),(50,'Octavo','A'),(51,'Octavo','B'),(52,'Octavo','C'),(53,'Octavo','D'),(54,'Octavo','E'),(55,'Octavo','F'),(56,'Octavo','G'),(57,'Noveno','A'),(58,'Noveno','B'),(59,'Noveno','C'),(60,'Noveno','D'),(61,'Noveno','E'),(62,'Noveno','F'),(63,'Noveno','G');
/*!40000 ALTER TABLE `semestre_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoActividad`
--

DROP TABLE IF EXISTS `tipoActividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoActividad` (
  `idtipoActividad` int NOT NULL AUTO_INCREMENT,
  `nombretipoAct` varchar(45) NOT NULL,
  PRIMARY KEY (`idtipoActividad`,`nombretipoAct`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoActividad`
--

LOCK TABLES `tipoActividad` WRITE;
/*!40000 ALTER TABLE `tipoActividad` DISABLE KEYS */;
INSERT INTO `tipoActividad` VALUES (1,'Ejercicios'),(2,'Examenes'),(3,'Apuntes de Clases'),(4,'Otro');
/*!40000 ALTER TABLE `tipoActividad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_documento`
--

DROP TABLE IF EXISTS `tipo_documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_documento` (
  `idTipoDocumento` int NOT NULL AUTO_INCREMENT,
  `descripcion` char(255) NOT NULL,
  PRIMARY KEY (`idTipoDocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_documento`
--

LOCK TABLES `tipo_documento` WRITE;
/*!40000 ALTER TABLE `tipo_documento` DISABLE KEYS */;
INSERT INTO `tipo_documento` VALUES (1,'Maestría'),(2,'Doctorado'),(3,'Especialidad'),(4,'Certificaciones'),(5,'Cursos pedagógicos tomados'),(6,'Cursos disciplinares tomados'),(7,'Participaciones en congresos'),(8,'Cursos impartidos'),(9,'Artículos presentados'),(10,'Libros publicados'),(11,'Capítulos de los libros publicados');
/*!40000 ALTER TABLE `tipo_documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `rfc` varchar(13) NOT NULL,
  `nombre_Doce` varchar(45) DEFAULT NULL,
  `apellido_paterno` varchar(20) DEFAULT NULL,
  `apellido_materno` varchar(25) DEFAULT NULL,
  `password` text,
  `n_plaza` varchar(35) DEFAULT NULL,
  `sexo` varchar(6) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`rfc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('ABCE121212ABC','Super','Admin','istrador','$2b$10$nUI.Cyjo3vmh0.8u/Sd1TOHrPN7YopLQgn9qL8VzECanIkrEveowK','E1234567891234	',NULL,NULL),('ABCE121212CBF','Hugo Rafael','F','Rosales Meléndez','$2b$10$OxwlewQ2w.8jj.dzAS5cQupxdSseqVY2XCQT3Qsvqsd7pYH0aGc0S','2321312',NULL,1),('BEGA030412A4A','Rosa Isela','dddd','111','$2b$10$Sr5Pz6PpepJdw0X/4xM3cuy6R8w7NWhiYWpC98zS8/f8MdrnUaLlG','234325423',NULL,NULL),('BEGA030412A4C','Vanessa','Benavidez','Garcia','$2b$10$Sr5Pz6PpepJdw0X/4xM3cuy6R8w7NWhiYWpC98zS8/f8MdrnUaLlG','E0363040000120','Mujer',1),('BEGA030412A4G','Rene','Perello','Altuzar','$2b$10$Sr5Pz6PpepJdw0X/4xM3cuy6R8w7NWhiYWpC98zS8/f8MdrnUaLlG','E0363040000120',NULL,NULL),('MEDA680109aw4','Juan Jose','Herrera','Hernandez','$2b$10$YgTO2QrFBuFOtaS9bs4ry.Zq5plZxeq/hb7M3UQaWpIVK1bMwfoO.','E0363040000120	',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_permisos`
--

DROP TABLE IF EXISTS `usuarios_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_permisos` (
  `idPermiso` int NOT NULL,
  `idUsuario` varchar(13) NOT NULL,
  PRIMARY KEY (`idPermiso`,`idUsuario`),
  KEY `fk_idPermisos_idx` (`idPermiso`),
  KEY `fk_idUsuario_idx` (`idUsuario`),
  CONSTRAINT `fk_idPermisos` FOREIGN KEY (`idPermiso`) REFERENCES `permisos` (`idPermisos`),
  CONSTRAINT `fk_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`rfc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_permisos`
--

LOCK TABLES `usuarios_permisos` WRITE;
/*!40000 ALTER TABLE `usuarios_permisos` DISABLE KEYS */;
INSERT INTO `usuarios_permisos` VALUES (1,'ABCE121212ABC'),(2,'BEGA030412A4A'),(3,'ABCE121212ABC'),(3,'BEGA030412A4A'),(3,'BEGA030412A4C');
/*!40000 ALTER TABLE `usuarios_permisos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-24 22:53:58
