
package com.roshan.portfolio.blog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfiguration corsConfiguration(
            @Value("${app.cors.allowed-origins}") String allowedOrigins) {

        CorsConfiguration config = new CorsConfiguration();

        List<String> origins = Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isEmpty())
                .toList();

        config.setAllowedOrigins(origins);

        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"
        ));

        config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type"
        ));

        config.setAllowCredentials(false);
        config.setMaxAge(3600L);

        return config;
    }

    // Shared configuration for Spring Security
    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            CorsConfiguration corsConfiguration) {

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    // Same configuration for Spring MVC
    @Bean
    public WebMvcConfigurer corsConfigurer(
            CorsConfiguration corsConfiguration) {

        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedOrigins(
                                corsConfiguration.getAllowedOrigins()
                                        .toArray(new String[0])
                        )
                        .allowedMethods(
                                corsConfiguration.getAllowedMethods()
                                        .toArray(new String[0])
                        )
                        .allowedHeaders(
                                corsConfiguration.getAllowedHeaders()
                                        .toArray(new String[0])
                        )
                        .allowCredentials(
                                Boolean.TRUE.equals(
                                        corsConfiguration.getAllowCredentials()
                                )
                        )
                        .maxAge(
                                corsConfiguration.getMaxAge()
                        );
            }
        };
    }
}
