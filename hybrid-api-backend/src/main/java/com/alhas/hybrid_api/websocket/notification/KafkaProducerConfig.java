package com.alhas.hybrid_api.websocket.notification;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.support.ProducerListener;
@Configuration
@Slf4j
public class KafkaProducerConfig {

    @Bean
    public ProducerListener<Object, Object> producerListener() {
        return new ProducerListener<>() {
            @Override
            public void onSuccess(ProducerRecord<Object, Object> record, RecordMetadata metadata) {
                log.info("Here ProducerListener Message envoyé : {} à la partition {}", record.value(), metadata.partition());
            }

            @Override
            public void onError(ProducerRecord<Object, Object> record, RecordMetadata metadata, Exception exception) {
                log.error("Erreur lors de l’envoi : {} -> {}", record.value(), exception.getMessage(), exception);
            }
        };
    }
}
