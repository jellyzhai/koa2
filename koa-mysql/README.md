## 项目启动准备
- 系统安装 mysql：https://www.yuque.com/jelly-zhai/vrtz6r/dlf92x3dmdisgtzq
- 启动 mysql 服务端
- 创建 jelly_project 数据库
- 创建 jelly 用户，并授权 对jelly_project 数据库的访问和操作
- 需要创建的表
    - students
        - ```
            CREATE TABLE `students` (
            `id` int NOT NULL AUTO_INCREMENT,
            `username` varchar(100) NOT NULL,
            `password` varchar(100) NOT NULL,
            `avatar` varchar(100) NOT NULL,
            `age` int NOT NULL,
            `scores_id` varchar(100) DEFAULT NULL,
            `classes` int NOT NULL,
            PRIMARY KEY (`id`),
            KEY `fk_scores_id` (`scores_id`),
            CONSTRAINT `fk_scores_id` FOREIGN KEY (`scores_id`) REFERENCES `scores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
            )
        ```
    - scores
        - ```
            CREATE TABLE `scores` (
            `id` varchar(100) NOT NULL,
            `chinese` int DEFAULT '60',
            `math` int DEFAULT '60',
            `english` int DEFAULT '60',
            PRIMARY KEY (`id`)
            )
        ```

## 其他
- 可能会遇到的问题及处理：https://www.yuque.com/jelly-zhai/vrtz6r/nga7d89uoamfr8x9