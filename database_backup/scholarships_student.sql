CREATE DATABASE  IF NOT EXISTS "scholarships" /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `scholarships`;
-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: seng-300-db-do-user-7196693-0.a.db.ondigitalocean.com    Database: scholarships
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cd512b5c-623c-11ea-aabd-2693361a4e7a:1-148';

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `status` set('graduate','undergraduate','masters','doctoral') DEFAULT NULL,
  `faculty` set('business','engineering','nursing','arts','science') DEFAULT NULL,
  `wd_on_transcript` tinyint DEFAULT NULL,
  `transcript_submitted` tinyint DEFAULT NULL,
  PRIMARY KEY (`student_id`,`username`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `student_id_UNIQUE` (`student_id`),
  KEY `username_idx` (`username`),
  CONSTRAINT `fk_student_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (100922,'egray','eleanor','gray',3.13,'undergraduate','nursing',0,0),(103005,'ahill','aston','hill',3.56,'undergraduate','nursing',1,1),(104310,'nclark','nicholas','clark',3.78,'doctoral','science',0,0),(104842,'wwarren','wilson','warren',3.17,'graduate','arts',0,0),(107479,'abarnes','alissa','barnes',3.66,'masters','science',0,1),(109122,'eharris','edward','harris',3.54,'doctoral','science',0,0),(110091,'ccrawford','carlos','crawford',3.63,'doctoral','arts',0,1),(110876,'fhenderson','florrie','henderson',3.72,'masters','engineering',0,0),(111343,'aturner','alfred','turner',3.97,'graduate','arts',0,0),(115384,'handerson','harold','anderson',3.87,'doctoral','science',0,1),(115449,'vevans','vincent','evans',3.29,'undergraduate','business',1,1),(117762,'aevelyn','evelyn','nelson',3.68,'graduate','business',0,1),(119615,'dhenderson','dexter','henderson',3.36,'doctoral','engineering',0,1),(119704,'adixon','audrey','dixon',3.75,'undergraduate','engineering',0,1),(120919,'akelley','amanda','kelley',3.76,'masters','nursing',0,0),(123456,'alice','alice','munro',3.40,'undergraduate','science',0,0),(123457,'towens','tony','owens',3.67,'undergraduate','science',0,0),(123788,'ahall','abigail','hall',3.60,'masters','nursing',0,0),(125376,'dbaker','derek','baker',3.73,'graduate','science',0,0),(127153,'fcarroll','florrie','carroll',3.46,'doctoral','business',0,0),(130552,'ahoward','adison','howard',3.96,'masters','business',0,0),(131338,'ahenderson','adele','henderson',3.51,'masters','nursing',0,1),(132444,'tmorris','tim','morris',3.67,'doctoral','nursing',0,1),(133272,'jstevens','joyce','stevens',3.48,'masters','nursing',0,1),(133590,'tandrews','thomas','andrews',3.86,'doctoral','nursing',0,0),(134073,'nhunt','nicole','hunt',3.45,'graduate','nursing',0,0),(134350,'kdixon','kellan','dixon',3.99,'doctoral','arts',1,1),(135323,'vhamilton','vivian','hamilton',3.34,'doctoral','arts',0,1),(136572,'scooper','sienna','cooper',3.99,'doctoral','arts',0,1),(139311,'frichardson','frederick','richardson',3.81,'undergraduate','engineering',0,1),(140460,'rmorris','roland','morris',3.23,'doctoral','arts',0,0),(140668,'amontgomery','ada','montgomery',3.30,'graduate','nursing',0,1),(142017,'swalker','sofia','walker',3.35,'undergraduate','arts',0,0),(142418,'mgibson','mike','gibson',3.94,'undergraduate','arts',0,1),(144178,'eedwards','elise','edwards',3.30,'graduate','arts',1,1),(144639,'dpayne','daryl','payne',3.79,'graduate','science',0,1),(144814,'sbaker','sienna','baker',3.09,'graduate','business',0,0),(144983,'aross','audrey','ross',3.29,'undergraduate','business',1,1),(148353,'chenderson','carl','henderson',3.62,'masters','science',1,1),(149094,'mmontgomery','maddie','montgomery',3.89,'graduate','science',0,1),(149096,'drogers','daisy','rogers',3.68,'masters','business',0,1),(150240,'hbennett','haris','bennett',3.94,'doctoral','business',0,0),(150949,'charris','charlie','harris',3.52,'masters','science',0,0),(151149,'awilsion','alan','wilson',3.87,'graduate','arts',0,0),(151166,'cjones','carlos','jones',3.77,'undergraduate','engineering',0,0),(152231,'mstewart','melissa','stewart',3.40,'masters','arts',0,1),(154977,'agray','alina','gray',3.87,'undergraduate','arts',0,1),(155024,'salexander','sarah','alexander',3.92,'masters','science',0,0),(156387,'mmorgan','martin','morgan',3.90,'graduate','engineering',0,0);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-02  9:08:00
