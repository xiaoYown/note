CREATE TABLE IF NOT EXISTS article (
	type_NO01 CHAR(20), 
	type_NO02 CHAR(20), 
	type_NO03 CHAR(20), 
	type_name_NO01 CHAR(20), 
	type_name_NO02 CHAR(20), 
	type_name_NO03 CHAR(20), 
	create_time DATETIME, 
	update_time DATETIME, 
	id VARCHAR(60),
	introduction VARCHAR(200),
	content TEXT(65535)
)