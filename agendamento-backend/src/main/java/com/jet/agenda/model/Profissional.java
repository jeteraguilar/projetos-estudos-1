package com.jet.agenda.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "profissionais")
public class Profissional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
}
