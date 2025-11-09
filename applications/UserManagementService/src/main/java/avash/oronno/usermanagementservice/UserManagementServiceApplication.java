package avash.oronno.usermanagementservice;

import avash.oronno.database.config.PostgresConfig;
import avash.oronno.redis.config.RedisConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.cassandra.CassandraAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication(exclude = {CassandraAutoConfiguration.class})
@ComponentScan(basePackages = {"avash.oronno.usermanagementservice", "avash.oronno.config", "avash.oronno.persistent"})
@EntityScan(basePackages = {"avash.oronno.persistent.entity", "avash.oronno.config.entity"})
@Import({PostgresConfig.class, RedisConfig.class})
public class UserManagementServiceApplication {
    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(UserManagementServiceApplication.class);
        Map<String, Object> properties = new HashMap<>();
        properties.put("elasticsearch.enabled", "false");
        properties.put("management.health.elasticsearch.enabled", "false");
        app.setDefaultProperties(properties);
        
        app.run(args);
    }
}

