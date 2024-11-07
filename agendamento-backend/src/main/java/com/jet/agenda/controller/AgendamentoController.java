package com.jet.agenda.controller;

import com.jet.agenda.model.Agendamento;
import com.jet.agenda.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {
    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping
    public List<Agendamento> listarAgendamentos() {
        return agendamentoService.listarAgendamentos();
    }

    @PostMapping
    public Agendamento agendar(@RequestBody Agendamento agendamento) {
        return agendamentoService.agendar(agendamento);
    }
}

