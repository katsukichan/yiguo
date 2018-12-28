/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : db_yiguo

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-12-28 15:19:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car_data
-- ----------------------------
DROP TABLE IF EXISTS `car_data`;
CREATE TABLE `car_data` (
  `cid` int(10) NOT NULL AUTO_INCREMENT,
  `cmsg` varchar(255) NOT NULL,
  `cimg` varchar(255) NOT NULL,
  `cprice` float(10,2) NOT NULL,
  `cnum` int(10) NOT NULL,
  `guid` int(10) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_data
-- ----------------------------
INSERT INTO `car_data` VALUES ('27', '美威欧式原味三文鱼排(2片装)250g*2', 'img/goods_item1                    ', '125.00', '6', '1');
INSERT INTO `car_data` VALUES ('28', '美威三文鱼冷冻刺身100g', 'img/goods_item3                    ', '34.50', '5', '21');
INSERT INTO `car_data` VALUES ('29', '美威三文鱼冷冻刺身100g', 'img/goods_item3                    ', '34.50', '2', '3');
INSERT INTO `car_data` VALUES ('30', '獐子岛黑椒三文鱼250g', 'img/goods_item5                    ', '22.90', '4', '5');

-- ----------------------------
-- Table structure for goods_data
-- ----------------------------
DROP TABLE IF EXISTS `goods_data`;
CREATE TABLE `goods_data` (
  `guid` int(10) NOT NULL AUTO_INCREMENT,
  `gmsg` varchar(255) NOT NULL,
  `gimg` varchar(255) NOT NULL,
  `gprice` float(10,2) NOT NULL,
  PRIMARY KEY (`guid`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_data
-- ----------------------------
INSERT INTO `goods_data` VALUES ('1', '美威欧式原味三文鱼排(2片装)250g*2', 'img/goods_item1', '125.00');
INSERT INTO `goods_data` VALUES ('2', '美威原味三文鱼排240g(4片分享装)', 'img/goods_item2', '69.00');
INSERT INTO `goods_data` VALUES ('3', '美威三文鱼冷冻刺身100g', 'img/goods_item3', '34.50');
INSERT INTO `goods_data` VALUES ('4', '美威原味三文鱼排150g(2片独立装)', 'img/goods_item4', '29.90');
INSERT INTO `goods_data` VALUES ('5', '獐子岛黑椒三文鱼250g', 'img/goods_item5', '22.90');
INSERT INTO `goods_data` VALUES ('6', '原膳香草三文鱼(切片)200g', 'img/goods_item6', '49.00');
INSERT INTO `goods_data` VALUES ('7', '美威欧式原味三文鱼排(2片装)250g*2', 'img/goods_item1', '125.00');
INSERT INTO `goods_data` VALUES ('8', '美威原味三文鱼排240g(4片分享装)', 'img/goods_item2', '69.00');
INSERT INTO `goods_data` VALUES ('9', '美威三文鱼冷冻刺身100g', 'img/goods_item3', '34.50');
INSERT INTO `goods_data` VALUES ('10', '美威原味三文鱼排150g(2片独立装)', 'img/goods_item4', '29.90');
INSERT INTO `goods_data` VALUES ('11', '獐子岛黑椒三文鱼250g', 'img/goods_item5', '22.90');
INSERT INTO `goods_data` VALUES ('12', '原膳香草三文鱼(切片)200g', 'img/goods_item6', '49.00');
INSERT INTO `goods_data` VALUES ('13', '美威欧式原味三文鱼排(2片装)250g*2', 'img/goods_item1', '125.00');
INSERT INTO `goods_data` VALUES ('14', '美威原味三文鱼排240g(4片分享装)', 'img/goods_item2', '69.00');
INSERT INTO `goods_data` VALUES ('15', '美威三文鱼冷冻刺身100g', 'img/goods_item3', '34.50');
INSERT INTO `goods_data` VALUES ('16', '美威原味三文鱼排150g(2片独立装)', 'img/goods_item4', '29.90');
INSERT INTO `goods_data` VALUES ('17', '獐子岛黑椒三文鱼250g', 'img/goods_item5', '22.90');
INSERT INTO `goods_data` VALUES ('18', '原膳香草三文鱼(切片)200g', 'img/goods_item6', '49.00');
INSERT INTO `goods_data` VALUES ('19', '美威欧式原味三文鱼排(2片装)250g*2', 'img/goods_item1', '125.00');
INSERT INTO `goods_data` VALUES ('20', '美威原味三文鱼排240g(4片分享装)', 'img/goods_item2', '69.00');
INSERT INTO `goods_data` VALUES ('21', '美威三文鱼冷冻刺身100g', 'img/goods_item3', '34.50');
INSERT INTO `goods_data` VALUES ('22', '美威原味三文鱼排150g(2片独立装)', 'img/goods_item4', '29.90');
INSERT INTO `goods_data` VALUES ('23', '獐子岛黑椒三文鱼250g', 'img/goods_item5', '22.90');
INSERT INTO `goods_data` VALUES ('24', '原膳香草三文鱼(切片)200g', 'img/goods_item6', '49.00');

-- ----------------------------
-- Table structure for index_data
-- ----------------------------
DROP TABLE IF EXISTS `index_data`;
CREATE TABLE `index_data` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `index_img` varchar(255) NOT NULL,
  `type` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of index_data
-- ----------------------------
INSERT INTO `index_data` VALUES ('1', 'img/floor1_side.jpg', '1');
INSERT INTO `index_data` VALUES ('2', 'img/floor1_main1.jpg', '1');
INSERT INTO `index_data` VALUES ('3', 'img/floor1_main2.jpg', '1');
INSERT INTO `index_data` VALUES ('4', 'img/floor1_main3.jpg', '1');
INSERT INTO `index_data` VALUES ('5', 'img/floor1_main4.jpg', '1');
INSERT INTO `index_data` VALUES ('6', 'img/floor1_main5.jpg', '1');
INSERT INTO `index_data` VALUES ('7', 'img/floor1_main6.jpg', '1');
INSERT INTO `index_data` VALUES ('8', 'img/floor2_side.jpg', '2');
INSERT INTO `index_data` VALUES ('9', 'img/floor2_main1.jpg', '2');
INSERT INTO `index_data` VALUES ('10', 'img/floor2_main2.jpg', '2');
INSERT INTO `index_data` VALUES ('11', 'img/floor2_main3.jpg', '2');
INSERT INTO `index_data` VALUES ('12', 'img/floor2_main4.jpg', '2');
INSERT INTO `index_data` VALUES ('13', 'img/floor2_main5.jpg', '2');
INSERT INTO `index_data` VALUES ('14', 'img/floor2_main6.jpg', '2');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `phone` varchar(11) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '13688888888', '111111');
SET FOREIGN_KEY_CHECKS=1;
