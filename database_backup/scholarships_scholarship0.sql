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

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'cd512b5c-623c-11ea-aabd-2693361a4e7a:1-269';

--
-- Table structure for table `scholarship`
--

DROP TABLE IF EXISTS `scholarship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scholarship` (
  `scholarship_id` int NOT NULL,
  `scholarship_name` varchar(45) DEFAULT NULL,
  `awarded` tinyint DEFAULT NULL,
  `offering_faculty` set('science','arts','business','engineering','nursing') DEFAULT NULL,
  `offering_status` set('graduate','undergraduate','masters','doctoral') DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `min_gpa` decimal(3,2) DEFAULT NULL,
  `scholarship_description` text,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`scholarship_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scholarship`
--

LOCK TABLES `scholarship` WRITE;
/*!40000 ALTER TABLE `scholarship` DISABLE KEYS */;
INSERT INTO `scholarship` VALUES (111111,'Science Award',1,'science','undergraduate','2020-04-20',3.30,'Scholarship awarded to undergraduate students in the faculty of science',1000),(123123,'Engineers Award',1,'engineering','masters','2020-03-14',3.70,'Scholarship awarded to undergraduate students in the faculty of engineering',2000),(123456,'Presidents Grant',1,'science','undergraduate','2020-05-04',3.14,'Scholarship awarded to undergraduate students in the faculty of nursing ',1500),(123788,'Doctoral Grant',1,'science','doctoral','2020-09-30',3.60,'Scholarship awarded to doctoral candidates in any faculty',700),(123987,'Arts Award',1,'arts','undergraduate','2020-09-30',3.10,'Scholarship awarded to undergraduate students in the faculty of arts',3000),(237861,'Doctoral Grant',1,'business','doctoral','2020-09-30',3.60,'Scholarship awarded to doctoral candidates in any faculty',1200),(321456,'Nursing Award',0,'nursing','undergraduate','2020-09-30',3.20,'Scholarship awarded to undergraduate students in the faculty of nursing ',1700),(345687,'Business Award',0,'business','undergraduate','2020-09-30',3.30,'Scholarship awarded to undergraduate students in the faculty of business ',300),(657120,'Doctoral Grant',0,'arts','doctoral','2020-09-30',3.60,'Scholarship awarded to doctoral candidates in any faculty',5000),(678934,'Doctoral Grant',1,'engineering','doctoral','2020-09-30',3.60,'Scholarship awarded to doctoral candidates in any faculty',4000),(873321,'Masters in Nursing ',0,'nursing','masters','2020-09-30',3.50,'Scholarship awarded to graduate students in the faculty of nursing',2000),(897711,'Masters in Engineering',1,'engineering','masters','2020-09-30',3.60,'Enter description here',2500),(897712,'Masters in Business',0,'business','masters','2020-09-30',3.50,'Enter description here ',700);
/*!40000 ALTER TABLE `scholarship` ENABLE KEYS */;
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

-- Dump completed on 2020-04-14 20:21:09
