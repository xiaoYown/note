/*
Navicat MySQL Data Transfer

Source Server         : tencent
Source Server Version : 50731
Source Host           : localhost:3306
Source Database       : waimao

Target Server Type    : MYSQL
Target Server Version : 50731
File Encoding         : 65001

Date: 2020-12-13 21:12:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '公司名称',
  `address` varchar(255) DEFAULT NULL COMMENT '公司地址',
  `company_type` int(11) DEFAULT NULL COMMENT '公司类型，1、电商卖家；2、云仓',
  `detail` varchar(32) DEFAULT NULL COMMENT '公司注册信息',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('2020-11-08 21:52:04', '2020-11-08 21:52:04', '0', 'Allen cheng', '1', null, null, '1', '深圳铭擎技术有限公司', '深圳南山区', '1', null);
INSERT INTO `company` VALUES ('2020-11-09 22:17:01', '2020-11-18 22:34:00', '0', 'Allen Cheng', '1', 'Allen Cheng', '1', '2', '跨越新科技1231322', '深圳保安区', '2', null);
INSERT INTO `company` VALUES ('2020-11-10 22:58:16', '2020-11-11 22:50:35', '0', 'Allen Cheng', '1', null, null, '3', '牛逼公司', '凯里花园', '2', null);
INSERT INTO `company` VALUES ('2020-11-10 23:14:52', '2020-11-11 22:50:41', '0', 'Allen Cheng', '1', null, null, '4', '222222222', '凯里花园1', '2', null);
INSERT INTO `company` VALUES ('2020-11-10 23:58:52', '2020-11-11 22:50:13', '0', 'Allen Cheng', '1', null, null, '5', '111', 'sdf', '2', null);
INSERT INTO `company` VALUES ('2020-11-18 00:04:33', '2020-11-18 00:04:33', '0', 'Allen Cheng', '1', null, null, '6', '公司-1', '地址-1', '1', null);

-- ----------------------------
-- Table structure for ec_company
-- ----------------------------
DROP TABLE IF EXISTS `ec_company`;
CREATE TABLE `ec_company` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL COMMENT '公司名称',
  `address` varchar(255) DEFAULT NULL COMMENT '公司地址',
  `partner_info` varchar(255) DEFAULT NULL COMMENT '合作伙伴信息，例如shopee的partner_id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ec_company
-- ----------------------------
INSERT INTO `ec_company` VALUES ('2020-11-18 21:59:29', '2020-11-22 16:06:33', '0', 'Allen Cheng', '1', 'Allen Cheng', '1', '1', 'Shopee', '1212', 'b84bb2fdc45790c20e6531ecbd8241ac9c6c318f115881399d451a51947ffb44');

-- ----------------------------
-- Table structure for ec_warehouse
-- ----------------------------
DROP TABLE IF EXISTS `ec_warehouse`;
CREATE TABLE `ec_warehouse` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ec_company_id` int(11) DEFAULT NULL COMMENT '电商公司的仓库，例如shopee 深圳仓',
  `name` varchar(16) DEFAULT NULL COMMENT '仓库名称',
  `address` varchar(16) DEFAULT NULL COMMENT '仓库地址',
  `charge` varchar(32) DEFAULT NULL COMMENT '仓库负责人',
  `phone` varchar(32) DEFAULT NULL COMMENT '仓库负责人联系电话',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ec_warehouse
-- ----------------------------
INSERT INTO `ec_warehouse` VALUES ('2020-11-18 22:32:43', '2020-11-22 20:03:09', '0', 'Allen Cheng', '1', 'Allen Cheng', '1', '1', '1', '电商仓库-1', '快快快2222', '快快快222', '13143459012');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `belong_ec_id` int(11) NOT NULL COMMENT '所属电商平台',
  `name` varchar(32) DEFAULT NULL COMMENT '店铺名称',
  `shop_id` int(11) NOT NULL COMMENT '店铺id',
  `ec_bind_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '绑定时间',
  `ec_latest_sync` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后同步时间',
  `belong_warehouse_id` int(11) DEFAULT NULL COMMENT '所属云仓',
  `belong_warehouse_status` smallint(6) DEFAULT NULL COMMENT '云仓绑定情况， 0,未绑定， 1、申请中，2，绑定成功，3，绑定申请已拒绝',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('2020-11-22 16:13:53', '2020-11-22 16:13:53', '0', null, null, null, null, '1', '1', null, '220059025', '2020-11-22 16:13:53', '2020-11-22 16:13:53', null, null);
INSERT INTO `shop` VALUES ('2020-11-22 19:16:07', '2020-11-22 19:16:07', '0', null, null, null, null, '2', '1', null, '220057770', '2020-11-22 19:16:07', '2020-11-22 19:16:07', null, null);

-- ----------------------------
-- Table structure for sku
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL COMMENT '商品名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sku
-- ----------------------------

-- ----------------------------
-- Table structure for spu
-- ----------------------------
DROP TABLE IF EXISTS `spu`;
CREATE TABLE `spu` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku_id` int(11) NOT NULL COMMENT '对应sku id',
  `name` varchar(256) DEFAULT NULL COMMENT '商品名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of spu
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `username` varchar(32) DEFAULT NULL COMMENT '用户姓名',
  `header` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `phone` varchar(16) DEFAULT NULL COMMENT '手机号',
  `email` varchar(64) CHARACTER SET latin1 DEFAULT NULL COMMENT '邮箱号',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `role` int(11) DEFAULT NULL COMMENT '权限， 1:平台运营人员管理员；2平台运营人员；3、卖家管理员;4、卖家运营人员；5、仓库管理员；6、仓库运营人员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2020-11-08 22:34:39', '2020-11-10 22:36:19', '0', 'Allen cheng', '1', null, null, '1', '1', 'Allen Cheng', '', '18672985292', 'chengchuanming@hotmail.com', 'c4ca4238a0b923820dcc509a6f75849b', '1');
INSERT INTO `user` VALUES ('2020-11-08 23:07:12', '2020-11-09 22:33:08', '1', 'Allen Cheng', '1', null, null, '2', '1', 'Allen Cheng', '', '15926922558', 'chinaxnccm@gmail.com', '967a5774ffb32153a3b6b9db08e86997', '1');
INSERT INTO `user` VALUES ('2020-11-09 22:27:26', '2020-11-22 21:17:12', '0', 'Allen Cheng', '1', 'Allen Cheng', '1', '3', '1', 'test_1', '', '110', '110232323232@gmail.com', 'c20ad4d76fe97759aa27a0c99bff6710', '4');
INSERT INTO `user` VALUES ('2020-11-10 22:22:52', '2020-11-10 22:22:52', '0', 'Allen Cheng', '1', null, null, '4', '1', 'Allen 1', '', '112', '112@gmail.com', 'c4ca4238a0b923820dcc509a6f75849b', '3');
INSERT INTO `user` VALUES ('2020-11-10 22:32:12', '2020-11-10 22:32:12', '0', 'Allen Cheng', '1', null, null, '5', '1', 'Allen 2', '', '114', '113@gmail.com', 'c4ca4238a0b923820dcc509a6f75849b', '3');
INSERT INTO `user` VALUES ('2020-11-10 22:32:52', '2020-11-11 22:28:40', '0', 'Allen Cheng', '1', null, null, '6', '1', 'Allen Cheng', '', '18672985292', 'chengchuanming@hotmail.com', '30e535568de1f9231e7d9df0f4a5a44d', '3');

-- ----------------------------
-- Table structure for warehouse
-- ----------------------------
DROP TABLE IF EXISTS `warehouse`;
CREATE TABLE `warehouse` (
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleted` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  `created_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `created_uid` varchar(64) DEFAULT NULL COMMENT '创建人id',
  `updated_by` varchar(64) DEFAULT NULL COMMENT '修改人',
  `updated_uid` varchar(64) DEFAULT NULL COMMENT '修改人id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL,
  `company_name` varchar(32) DEFAULT NULL,
  `ec_company_id` int(11) DEFAULT NULL COMMENT '服务电商公司id',
  `ec_company_name` varchar(32) DEFAULT NULL COMMENT '服务电商公司名称',
  `ec_warehouse_id` varchar(32) DEFAULT NULL COMMENT '服务电商公司仓库的id',
  `ec_warehouse_name` varchar(32) DEFAULT NULL COMMENT '服务电商公司仓库名称',
  `name` varchar(16) DEFAULT NULL COMMENT '仓库名称',
  `address` varchar(16) DEFAULT NULL COMMENT '仓库地址',
  `charge` varchar(32) DEFAULT NULL COMMENT '仓库负责人',
  `phone` varchar(32) DEFAULT NULL COMMENT '仓库负责人联系电话',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of warehouse
-- ----------------------------
INSERT INTO `warehouse` VALUES ('2020-11-19 22:18:09', '2020-11-19 22:18:09', '0', 'Allen Cheng', '1', null, null, '1', '2', '跨越新科技1231322', '1', '电商公司-1', '1', '电商仓库-1', '呃呃', '333', '方法', '13143459012');
INSERT INTO `warehouse` VALUES ('2020-11-22 20:00:22', '2020-11-22 20:02:59', '0', 'Allen Cheng', '1', 'Allen Cheng', '1', '2', '4', '222222222', '1', 'Shopee', '1', '电商仓库-1', 'jkjkj', 'kaili', 'hjkh', '13143459012');