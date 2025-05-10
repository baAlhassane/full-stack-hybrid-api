package com.alhas.hybrid_api.users.user.authRessource;



import com.alhas.hybrid_api.infrastructure.config.SecurityUtils;
import com.alhas.hybrid_api.users.user.ReadUserDTO;
import com.alhas.hybrid_api.users.user.UserException;
import com.auth0.client.auth.AuthAPI;
import com.auth0.client.mgmt.ManagementAPI;
import com.auth0.client.mgmt.filter.FieldsFilter;
import com.auth0.exception.Auth0Exception;
import com.auth0.json.auth.TokenHolder;
import com.auth0.net.Response;
import com.auth0.net.TokenRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class Auth0Service {

    private static final Logger logger = LoggerFactory.getLogger(Auth0Service.class);
    private final String clientId;
    private final String clientSecret;
    private final String domain;
    private final String roleLandlordId;

    private TokenHolder cachedToken;
    private long tokenExpirationTime = 0;

    public Auth0Service(
            @Value("${auth0.oauth2.client-id}") String clientId,
            @Value("${auth0.oauth2.client-secret}") String clientSecret,
            @Value("${auth0.oauth2.issuer}")  String domain,
            @Value("${application.auth0.role-landlord-id}") String roleLandlordId)
    {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.domain = domain;
        this.roleLandlordId = roleLandlordId;
    }

    /**
     * Ajoute le rôle de "Landlord" à l'utilisateur s'il ne l'a pas déjà
     */
    public void addLandlordRoleToUser(ReadUserDTO readUserDTO) {
        if (readUserDTO.authorities()
                .stream()
                .noneMatch(role -> role.equals(SecurityUtils.ROLE_LANDLORD))) {
            try {
                String accessToken = getAccessToken();
                assignRoleById(accessToken, readUserDTO.email(), roleLandlordId);
                logger.info("Role {} ajoute avec succes à utilisation {} ", roleLandlordId, readUserDTO.email());
            } catch (Auth0Exception e) {
                logger.error("Impossible d'assigner le rôle {} à {}", roleLandlordId ,readUserDTO.email());
                throw new UserException(String.format("Impossible d'assigner le rôle %s à %s", roleLandlordId, readUserDTO.email()));
            }
        }
    }

    /**
     * Attribue un rôle à un utilisateur basé sur son email
     */
    private void assignRoleById(String accessToken, String email, String roleIdToAdd) throws Auth0Exception {
        ManagementAPI managementAPI = ManagementAPI.newBuilder(domain, accessToken).build();

        Response<List<com.auth0.json.mgmt.users.User>> auth0UserByEmail = managementAPI.users().listByEmail(email, new FieldsFilter()).execute();
        com.auth0.json.mgmt.users.User user = auth0UserByEmail.getBody()
                .stream()
                .findFirst()
                .orElseThrow(() -> new UserException(String.format("Utilisateur introuvable avec email %s", email)));

        managementAPI.roles().assignUsers(roleIdToAdd, List.of(user.getId())).execute();
        logger.info("Rôle {} assigné à l'utilisateur Auth0 ID: {}", roleIdToAdd, user.getId());
    }

    /**
     * Récupère un token d'accès Auth0 (avec mise en cache)
     */
    private String getAccessToken() throws Auth0Exception {
        if (cachedToken != null && System.currentTimeMillis() < tokenExpirationTime) {
            return cachedToken.getAccessToken();
        }

        AuthAPI authAPI = AuthAPI.newBuilder(domain, clientId, clientSecret).build();
        TokenRequest tokenRequest = authAPI.requestToken(domain + "api/v2/");
        cachedToken = tokenRequest.execute().getBody();

        // Stocker l'expiration (Auth0 donne une durée en secondes)
        tokenExpirationTime = System.currentTimeMillis() + TimeUnit.SECONDS.toMillis(cachedToken.getExpiresIn());

        logger.info("Nouveau token Auth0 récupéré, expiration dans {} secondes", cachedToken.getExpiresIn());

        return cachedToken.getAccessToken();
    }
}
