FROM openjdk:8

WORKDIR /opt/app

ADD target/hello-api-0.0.1-SNAPSHOT.jar /opt/app/hello-api.jar

ENTRYPOINT ["java", "-jar", "hello-api.jar"]

