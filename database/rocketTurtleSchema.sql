CREATE TABLE "User" (
	"id" serial NOT NULL,
	"name" varchar(25) NOT NULL,
	"weight" integer NOT NULL,
	"height" integer NOT NULL,
	"age" integer NOT NULL,
	CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Height" (
	"id" serial NOT NULL,
	"english" varchar NOT NULL,
	"inches" integer NOT NULL,
	CONSTRAINT Height_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Weight" (
	"id" serial NOT NULL,
	"english" VARCHAR(255) NOT NULL,
	"lbs" integer NOT NULL,
	CONSTRAINT Weight_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Age" (
	"id" serial NOT NULL,
	"age" integer NOT NULL,
	CONSTRAINT Age_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Calories" (
	"id" serial NOT NULL,
	"user" integer NOT NULL,
	"calCount" integer NOT NULL,
	"timestamp" TIME NOT NULL,
	"day" DATE NOT NULL,
	CONSTRAINT Calories_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Sleep" (
	"id" serial NOT NULL,
	"user" integer NOT NULL,
	"hourCount" integer NOT NULL,
	"startHour" TIME NOT NULL,
	"endHour" TIME NOT NULL,
	"day" DATE NOT NULL,
	CONSTRAINT Sleep_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("weight") REFERENCES "Weight"("id");
ALTER TABLE "User" ADD CONSTRAINT "User_fk1" FOREIGN KEY ("height") REFERENCES "Height"("id");
ALTER TABLE "User" ADD CONSTRAINT "User_fk2" FOREIGN KEY ("age") REFERENCES "Age"("id");




ALTER TABLE "Calories" ADD CONSTRAINT "Calories_fk0" FOREIGN KEY ("user") REFERENCES "User"("id");

ALTER TABLE "Sleep" ADD CONSTRAINT "Sleep_fk0" FOREIGN KEY ("user") REFERENCES "User"("id");

