package com.alhas.hybrid_api.websocket.message;


import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;

    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{roomId}")
    public void sendMessage(@DestinationVariable String roomId, ChatMessage message) {
        // Envoie le message à tous les abonnés du topic correspondant
        messagingTemplate.convertAndSend("/topic/messages/" + roomId, message);
    }
}
