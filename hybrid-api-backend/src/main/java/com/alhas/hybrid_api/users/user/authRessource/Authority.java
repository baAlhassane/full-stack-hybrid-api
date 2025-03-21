package com.alhas.hybrid_api.users.user.authRessource;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "authority")
public class Authority  implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @NotNull
  @Size(max=50)
    @Column(length = 50)
    private String name;
}
