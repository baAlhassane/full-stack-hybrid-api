package com.alhas.hybrid_api.notification;




import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;



@Service
public class NotificationProducer {

    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    public NotificationProducer(KafkaTemplate<String, UserEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistrationEvent(UserEvent event) {
        kafkaTemplate.send("user-registrations", event);
    }

}



