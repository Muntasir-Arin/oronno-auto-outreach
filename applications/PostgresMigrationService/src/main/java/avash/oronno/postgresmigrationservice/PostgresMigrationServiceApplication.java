package avash.oronno.postgresmigrationservice;

import avash.oronno.database.config.PostgresConfig;
import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import javax.sql.DataSource;

@SpringBootApplication
@ComponentScan(basePackages = {"avash.oronno.postgresmigrationservice", "avash.oronno.config"})
@Import({PostgresConfig.class})
public class PostgresMigrationServiceApplication {

    private static final Logger logger = LoggerFactory.getLogger(PostgresMigrationServiceApplication.class);

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(PostgresMigrationServiceApplication.class);
        app.setWebApplicationType(WebApplicationType.NONE);
        app.run(args);
    }

    @Bean
    public Flyway flyway(DataSource dataSource) {
        return Flyway.configure()
                .dataSource(dataSource)
                .locations("classpath:db/migration")
                .baselineOnMigrate(true)
                .baselineVersion("0")
                .load();
    }

    @Bean
    public CommandLineRunner migrationRunner(Flyway flyway) {
        return args -> {
            try {
                logger.info("Starting PostgreSQL migrations...");
                flyway.migrate();
                logger.info("PostgreSQL migrations completed successfully!");
                System.exit(0);
            } catch (org.flywaydb.core.api.exception.FlywayValidateException e) {
                logger.warn("Migration checksum mismatch detected. Attempting to repair...");
                try {
                    flyway.repair();
                    logger.info("Schema history repaired successfully. Retrying migrations...");
                    flyway.migrate();
                    logger.info("PostgreSQL migrations completed successfully after repair!");
                    System.exit(0);
                } catch (Exception repairException) {
                    logger.error("Repair failed: {}", repairException.getMessage(), repairException);
                    System.exit(1);
                }
            } catch (Exception e) {
                logger.error("Migration failed: {}", e.getMessage(), e);
                System.exit(1);
            }
        };
    }
}

