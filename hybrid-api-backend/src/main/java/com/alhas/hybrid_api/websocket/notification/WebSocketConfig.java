package com.alhas.hybrid_api.websocket.notification;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker  // Active le support WebSocket + STOMP
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Le broker "interne" qui va gérer les topics pour les clients
        config.enableSimpleBroker("/topic"); // tous les messages envoyés à /topic/... seront broadcastés
        config.setApplicationDestinationPrefixes("/app"); // préfixe pour envoyer des messages au serveur
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Ici tu définis ton endpoint WebSocket
        registry.addEndpoint("/ws")   // ws://localhost:8080/ws
                .setAllowedOriginPatterns("*") // autorise Angular
                .withSockJS(); // fallback SockJS pour navigateurs qui ne supportent pas WebSocket
    }
}
