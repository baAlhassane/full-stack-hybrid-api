package com.alhas.hybrid_api.notification;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Service
public class NotificationProducer {
    @Id
    @GeneratedValue
    private long id;
    private final KafkaTemplate<String, UserEvent> kafkaTemplate;

    public NotificationProducer(KafkaTemplate<String, UserEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendRegistrationEvent(UserEvent event) {
        kafkaTemplate.send("user-registrations", event);
    }

}



