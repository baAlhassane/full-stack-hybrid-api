package com.alhas.hybrid_api.notification;

import org.springframework.context.annotation.Bean;


import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaOrderTopicConfig {

    @Bean
    public NewTopic ordersTopic() {
        return TopicBuilder
                .name("user-registrations")
                .build();
    }
}