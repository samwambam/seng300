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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(20) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_type` set('student','faculty','admin') NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('abarnes','temp','student'),('abarnes2','temp','student'),('adixon','temp','student'),('aevelyn','temp','student'),('agray','temp','student'),('ahall','temp','student'),('ahenderson','temp','student'),('ahill','temp','student'),('ahoward','temp','student'),('ajones','temp','faculty'),('akelley','temp','student'),('alice','temp','student'),('amontgomery','temp','student'),('aross','temp','student'),('aturner','temp','student'),('awilsion','temp','student'),('bholmes','temp','faculty'),('ccrawford','temp','student'),('cfeynman','temp','faculty'),('charris','temp','student'),('chenderson','temp','student'),('cjones','temp','student'),('crussell','temp','faculty'),('dbaker','temp','student'),('dbrody','temp','faculty'),('dhenderson','temp','student'),('doug','temp','admin'),('dpayne','temp','student'),('drogers','temp','student'),('dthompson','temp','faculty'),('eedwards','temp','student'),('egray','temp','student'),('eharris','temp','student'),('fcarroll','temp','student'),('fhenderson','temp','student'),('frichardson','temp','student'),('handerson','temp','student'),('hbennett','temp','student'),('jstevens','temp','student'),('kdixon','temp','student'),('klang','temp','faculty'),('mgibson','temp','student'),('mmontgomery','temp','student'),('mmorgan','temp','student'),('mstewart','temp','student'),('nclark','temp','student'),('nhunt','temp','student'),('rhamilton','temp','faculty'),('rmorris','temp','student'),('salexander','temp','student'),('sbaker','temp','student'),('scooper','temp','student'),('sheart','temp','faculty'),('swalker','temp','student'),('tandrews','temp','student'),('tmorris','temp','student'),('towens','temp','student'),('vevans','temp','student'),('vhamilton','temp','student'),('wwarren','temp','student');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- Dump completed on 2020-04-02  9:07:59
