package com.jet.agenda.controller;

import com.jet.agenda.model.Profissional;
import com.jet.agenda.service.ProfissionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profissionais")
public class ProfissionalController {
    @Autowired
    private ProfissionalService profissionalService;

    @GetMapping
    public List<Profissional> listarProfissionais() {
        return profissionalService.listarProfissionais();
    }

    @PostMapping
    public Profissional cadastrarProfissional(@RequestBody Profissional profissional) {
        return profissionalService.cadastrarProfissional(profissional);
    }
}