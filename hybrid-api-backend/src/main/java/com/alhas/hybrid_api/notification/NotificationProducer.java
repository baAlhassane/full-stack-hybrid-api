package com.alhas.hybrid_api.notification;


<<<<<<< Updated upstream


import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;



=======
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


>>>>>>> Stashed changes
@Service
@Slf4j
public class NotificationProducer {
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    public NotificationProducer(KafkaTemplate<String, UserEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistrationEvent(UserEvent event) {
        kafkaTemplate.send("user-registrations", event);
        log.info("Sent user event: " + event.getEmail() + " - " + event.getName());
    }

}



