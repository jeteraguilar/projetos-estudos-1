package com.jet.agenda.service;

import com.jet.agenda.model.Agendamento;
import com.jet.agenda.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {
    @Autowired
    private AgendamentoRepository agendamentoRepository;

    public List<Agendamento> listarAgendamentos() {
        return agendamentoRepository.findAll();
    }

    public Agendamento agendar(Agendamento agendamento) {
        return agendamentoRepository.save(agendamento);
    }
}

