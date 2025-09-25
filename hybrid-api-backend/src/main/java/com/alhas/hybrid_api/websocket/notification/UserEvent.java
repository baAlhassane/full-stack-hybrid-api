package com.alhas.hybrid_api.websocket.notification;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserEvent {
    private String email;
    private String name;

    // getters, setters, constructeur
}
