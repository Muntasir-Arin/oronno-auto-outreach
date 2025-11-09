package avash.oronno.database.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EntityScan(basePackages = {"avash.oronno.persistent.entity"})
@EnableJpaRepositories(basePackages = {"avash.oronno.persistent.repository"})
public class PostgresConfig {
}

