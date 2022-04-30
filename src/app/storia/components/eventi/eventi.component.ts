import {Component, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GestoreAnimaliService} from "../../../ospedale/services/gestore-animali/gestore-animali.service";
import {GestoreEventiService} from "../../services/gestore-eventi/gestore-eventi.service";
import {map, Observable, of, Subscription, tap} from "rxjs";
import {Evento} from "../../../generale/models/evento";
import {Visita} from "../../../ospedale/models/visita";
import {Animale} from "../../../ospedale/models/animale";
import {HotToastService} from "@ngneat/hot-toast";
import {EventoPersonalizzato} from "../../models/evento-personalizzato";
import {GestoreVisiteService} from "../../../ospedale/services/gestore-visite/gestore-visite.service";
import {
  GestoreEventiPersonalizzatiService
} from "../../services/gestore-eventi-personalizzati/gestore-eventi-personalizzati.service";
import {AnimaleOrdine, Ordine} from "../../../negozio/model/ordine";
import {OrdiniService} from "../../../negozio/service/ordini.service";
import {environment} from "../../../../environments/environment";
import {UtenteService} from "../../../utente/service/utente.service";
import {OrdinePerEventi} from "../../models/ordine-per-eventi";

type VisitaDTO = { tipoVisita: string, data: string, durataInMinuti: number, note: string, id: number, idAnimale: number };

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent implements OnInit, OnDestroy, OnChanges {
  filterForm = this.formBuilder.group({
    "idAnimale":0,
    "tipoEvento":"",
    "tipoVisita":"",
  });
  animali!: Animale[];
  eventi!: Observable<Evento[]>;
  animaleOrdineList: Array<AnimaleOrdine>;

  constructor(
    private formBuilder: FormBuilder,
    private gestoreEventiService: GestoreEventiService,
    private gestoreVisiteService: GestoreVisiteService,
    private gestoreAnimaliService: GestoreAnimaliService,
    private gestoreEventiPersonalizzati: GestoreEventiPersonalizzatiService,
    private toast: HotToastService,
    private utenteService: UtenteService,
    private ordiniService: OrdiniService
) {
  }

  ngOnInit(): void {
    this.animali = this.gestoreAnimaliService.getAnimaliUtente();
    this.eventi = this.gestoreEventiService.getEventi(this.filterForm);
  }

  //preme il pulsante di filtro della lista di eventi
  onSubmitFilterForm() {
    this.eventi = this.gestoreEventiService.getEventi(this.filterForm);
  }

  //mockup
  private addEventoPersonalizzato(visiteTrasformate: Observable<Visita[]>) {
    return visiteTrasformate.pipe(
      tap(visite => console.log("Visite trasformate: " + visite.length)),
      map(visite => {
        let eventi: Evento[] = [];
        eventi.push(...visite);
        return eventi;
      }),
      tap(eventi => {
        console.log("Visite: ");
        eventi.forEach(evento => console.log(evento));
      }),
      tap((eventi: Evento[]) => console.log("Tipo Visita: ",(eventi[0]) instanceof  Visita)),
      map((eventi: Evento[]) => {
        let eventoPers = new EventoPersonalizzato();
        eventoPers.id = 10;
        eventoPers.testo = "Leo ha fatto una corsa";
        eventoPers.data = new Date(Date.now());
        eventi.push(eventoPers);
        return eventi;
      }),
      tap(eventi => {
        console.log("Eventi: ");
        eventi.forEach(evento => console.log(evento));
      }),
      tap(eventi => console.log("Tipo EventoPersonalizzato", ((eventi[eventi.length-1]) instanceof EventoPersonalizzato))),
      map((eventi: Evento[]) => eventi.sort((a:Evento, b:Evento) => ((b.getData() ? b.getData()!.getTime() : 0) - (a.getData() ? a.getData()!.getTime() : 0)))),
      tap(eventi => {
        console.log("Eventi sorted: ");
        eventi.forEach(evento => console.log(evento));
      }),
    );
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm.get("tipoEvento")!.value != "visita") {
      this.filterForm.patchValue({"tipoVisita": ""});
    }
  }

  handleVisitaEliminata(visita: Visita) {
    // console.log("Sto eliminando la visita");
    //elimino persistente
    let res = this.gestoreVisiteService.deleteVisita(visita);
    res.pipe(
      this.toast.observe({
         loading: 'Sto eliminando la visita...',
         success: 'Visita eliminata con successo!',
         error: 'Qualcosa è andato storto!'
      })
    ).subscribe({
      next: (_: any) => {
        // console.log("Visita eliminata con successo");
        this.eventi = this.eventi.pipe(
          map((eventi) => eventi.filter((evento_) => evento_.id !== visita.id))
        );
      },
      error: (error: any) => {
        console.log("Errore nell'eliminazione della visita");
        console.log(error);
      }
    });
  }

  handleEventoPersonalizzatoEliminato(evento: EventoPersonalizzato) {
    console.log("Sto eliminando l'evento personalizzato");
    //elimino persistente
    let res = this.gestoreEventiPersonalizzati.deleteEventoPersonalizzato(evento);
    res.pipe(
      this.toast.observe({
         loading: 'Sto eliminando l\'evento ...',
         success: 'Evento eliminato con successo!',
         error: 'Qualcosa è andato storto!'
      })
    ).subscribe({
      next: (_: any) => {
        // console.log("Evento eliminato con successo");
        this.eventi = this.eventi.pipe(
          map((eventi) => eventi.filter((evento_) => evento_.id !== evento.id))
        );
      },
      error: (error: any) => {
        console.log("Errore nell'eliminazione dell\'evento");
        console.log(error);
      }
    });
  }

  handleEventoPersonalizzatoAggiunto(evento: EventoPersonalizzato) {
    console.log("Evento personalizzato aggiunto");
    //insert evento in eventi, order by date
    this.eventi = this.eventi.pipe(
      map((eventi) => {
        for (let i = 0; i < eventi.length; i++) {
          if (eventi[i].getData() && eventi[i].getData()!.getTime() < evento.getData()!.getTime()) {
            eventi.splice(i, 0, evento);
            return eventi;
          } else {
            eventi.push(evento)
          }
        }
        return eventi;
      }),
      tap(eventi => {
        console.log("Eventi: ");
        console.table(eventi);
      })
    );
  }


  isEventoPersonalizzato(val: Evento): boolean {return val instanceof EventoPersonalizzato}
  isVisita(val: Evento):boolean {return val instanceof Visita}

  castToEventoPersonalizzato(evento: Evento): EventoPersonalizzato {
    return evento as EventoPersonalizzato;
  }

  castToVisita(evento: Evento): Visita {
    return evento as Visita;
  }

  isOrdine(evento: Evento): boolean {
    return evento instanceof OrdinePerEventi;
  }

  castToOrdine(evento: Evento) {
    return evento as OrdinePerEventi;
  }
}
