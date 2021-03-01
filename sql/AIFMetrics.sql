-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 01, 2021 at 07:44 PM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `AIFMetrics`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `user_id` varchar(36) NOT NULL,
  `comment` text NOT NULL,
  `comment_id` varchar(36) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`user_id`, `comment`, `comment_id`, `created_at`) VALUES
('731d3ee1-65bb-4a82-8ede-193760da817c', 'Hi I am Admin', '7d3e51ef-ccdd-4096-8711-ce798b151561', '2021-03-01 14:07:36');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(36) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `mobile_country_code` varchar(4) NOT NULL,
  `mobile_number` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `first_name`, `last_name`, `mobile_country_code`, `mobile_number`, `password`, `created_at`) VALUES
('731d3ee1-65bb-4a82-8ede-193760da817c', 'admin@gmail.com', 'Admin', 'User', '91', '8877665544', 'Admin123.@', '2021-03-01 14:05:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`),
  ADD UNIQUE KEY `mobile_number` (`mobile_number`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
