package avash.oronno.cassandramigrationservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration;

@SpringBootApplication(exclude = {CassandraAutoConfiguration.class})
public class CassandraMigrationServiceApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(CassandraMigrationServiceApplication.class);
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }
}

