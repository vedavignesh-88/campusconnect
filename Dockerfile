# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY CampusConnect/backend/pom.xml ./
RUN mvn dependency:go-offline -B
COPY CampusConnect/backend/src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/campusconnect-backend-0.0.1-SNAPSHOT.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT:-8080} -jar app.jar"]
