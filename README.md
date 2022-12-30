# back
AWS RDS(mySql) 프리티어 생성하기 A to Z <br>
https://velog.io/@shawnhansh/AWS-RDSmySql-%ED%94%84%EB%A6%AC%ED%8B%B0%EC%96%B4-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0


https://velog.io/@shawnhansh/AWS-RDS-DBeaver%EC%97%90-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0
<br>

https://mimah.tistory.com/entry/MySQL-MySQL-8%EC%97%90%EC%84%9C-DATE-default-%ED%98%84%EC%9E%AC-%EB%82%A0%EC%A7%9C
<br>
date는 예약어인 것 같아서 created_date 로 컬럼명 변경
<br>
CREATE TABLE borard
(
	board_id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	created_date date DEFAULT (current_date),
	title varchar(500) NOT NULL,
	content varchar(500) NOT NULL,
	icon int NOT NULL,
	genre varchar(500) NOT NULL,
	heart varchar(500),
	PRIMARY KEY (board_id)
);
