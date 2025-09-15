package com.alhas.hybrid_api.notification;


import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationProducer {

    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    public NotificationProducer(KafkaTemplate<String, UserEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistrationEvent(UserEvent event) {
        kafkaTemplate.send("user-registrations", event);
        log.info("Sent user event: " + event.getEmail() + " - " + event.getName());
    }

}


