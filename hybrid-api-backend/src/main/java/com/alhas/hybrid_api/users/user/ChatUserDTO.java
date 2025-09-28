package com.alhas.hybrid_api.users.user;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ChatUserDTO {
    private String firstname;
    private String lastname;
    private String uerfullname; // ⚠️ je garde ton orthographe pour matcher ton TS
    @EqualsAndHashCode.Include
    private String email;
    private String imageUrl;
    private boolean isAuthenticated;
    private String userRole;
    private String type;
    private Set<String> authorities;
    private NotificationRgisgister notification;
}
