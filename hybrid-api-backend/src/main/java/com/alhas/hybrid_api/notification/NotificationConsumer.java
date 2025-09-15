package com.alhas.hybrid_api.notification;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationConsumer {
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationConsumer(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @KafkaListener(topics = "user-registrations", groupId = "my-group")
    public void listen(UserEvent event) {
        messagingTemplate.convertAndSend("/topic/notifications", event);
        log.info(" Received user event: " + event.getEmail() + " - " + event.getName());
    }
}
