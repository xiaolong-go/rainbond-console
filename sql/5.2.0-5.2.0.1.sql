alter table user_info add enterprise_center_user_id varchar(32) DEFAULT NULL;
alter table user_info add real_name varchar(64) DEFAULT NULL;

alter table console_sys_config add enterprise_id varchar(32) DEFAULT NULL;
alter table tenant_enterprise add logo varchar(128) DEFAULT NULL;