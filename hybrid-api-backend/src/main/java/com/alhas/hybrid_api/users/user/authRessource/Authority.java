package com.alhas.hybrid_api.users.user.authRessource;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import lombok.ToString; // Ajout de ToString de Lombok

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.Objects; // Pour equals/hashCode

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "authority")
@ToString // Pensez à ajouter @ToString pour le débogage, mais soyez prudent avec les relations bidirectionnelles
public class Authority implements Serializable, GrantedAuthority {
    private static final long serialVersionUID = 1L;

    @Id
    @NotNull // Utilisez le @NotNull correct pour la validation
    @Size(max = 50)
    @Column(length = 50)
    private String name; // Ce champ contiendra le nom du rôle, par exemple "ROLE_USER"

    // Pas besoin de champ 'authority'. Le champ 'name' est suffisant.

    public Authority(String name) {
        this.name = name; // Initialisez directement le champ 'name'
    }

    @Override
    public String getAuthority() {
        return this.name; // Retournez le 'name' comme chaîne d'autorité
    }

    // IMPORTANT pour les entités JPA : Implémentez equals() et hashCode() basés sur l'ID.
    // Ou, si vous utilisez Lombok, utilisez @EqualsAndHashCode(of = "name")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Authority authority1 = (Authority) o;
        return Objects.equals(name, authority1.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}